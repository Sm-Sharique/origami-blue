import Foundation
import AVFoundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

// Native Apple display conversion, with no creative grading or custom tone curve.
let args = CommandLine.arguments
guard args.count == 4 else { fatalError("Usage: swift camera_stills.swift ORIGINAL.mp4 cards.json output-directory") }
guard #available(macOS 15.0, *) else { fatalError("Native forceSDR still extraction requires macOS 15 or newer") }
let asset = AVURLAsset(url: URL(fileURLWithPath: args[1]))
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.requestedTimeToleranceBefore = .zero
generator.requestedTimeToleranceAfter = .zero
if #available(macOS 15.0, *) { generator.dynamicRangePolicy = .forceSDR }
let cards = try JSONSerialization.jsonObject(with: Data(contentsOf: URL(fileURLWithPath: args[2]))) as! [[String: Any]]
let destination = URL(fileURLWithPath: args[3], isDirectory: true)
try FileManager.default.createDirectory(at: destination, withIntermediateDirectories: true)
let colorSpace = CGColorSpace(name: CGColorSpace.sRGB)!
for (i, card) in cards.enumerated() {
    let seconds = card["t"] as! Double
    let time = CMTime(value: Int64(ceil(seconds * 30)), timescale: 30)
    var actual = CMTime.zero
    let source = try generator.copyCGImage(at: time, actualTime: &actual)
    let context = CGContext(data: nil, width: source.width, height: source.height,
        bitsPerComponent: 8, bytesPerRow: source.width * 4, space: colorSpace,
        bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
    context.setBlendMode(.copy)
    context.interpolationQuality = .none
    context.draw(source, in: CGRect(x: 0, y: 0, width: source.width, height: source.height))
    let image = context.makeImage()!
    let url = destination.appendingPathComponent(String(format: "camera_%02d.png", i))
    let writer = CGImageDestinationCreateWithURL(url as CFURL, UTType.png.identifier as CFString, 1, nil)!
    CGImageDestinationAddImage(writer, image, nil)
    guard CGImageDestinationFinalize(writer) else { fatalError("Failed to save image") }
    print(String(format: "%02d requested=%.5f actual=%.5f", i, CMTimeGetSeconds(time), CMTimeGetSeconds(actual)), source.colorSpace?.name ?? "unknown" as CFString)
}
