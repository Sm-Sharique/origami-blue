import Foundation
import AVFoundation
import CoreGraphics

// Native camera display conversion, identical to the approved forceSDR still path.
// Writes unmirrored RGBA frames to stdout; diagnostics go to stderr.
let args = CommandLine.arguments
guard args.count == 4 else { fatalError("Usage: camera_video source.mp4 startFrame frameCount") }
guard #available(macOS 15.0, *) else { fatalError("Requires macOS 15 or newer") }
let start = Int(args[2])!, count = Int(args[3])!
let generator = AVAssetImageGenerator(asset: AVURLAsset(url: URL(fileURLWithPath: args[1])))
generator.appliesPreferredTrackTransform = true
generator.requestedTimeToleranceBefore = .zero
generator.requestedTimeToleranceAfter = .zero
if #available(macOS 15.0, *) { generator.dynamicRangePolicy = .forceSDR }
let space = CGColorSpace(name: CGColorSpace.sRGB)!
let flags = CGBitmapInfo.byteOrder32Big.rawValue | CGImageAlphaInfo.premultipliedLast.rawValue
let context = CGContext(data: nil, width: 1080, height: 1920, bitsPerComponent: 8,
    bytesPerRow: 4320, space: space, bitmapInfo: flags)!
context.setBlendMode(.copy)
context.interpolationQuality = .none
for frame in start..<(start + count) {
    try autoreleasepool {
        var actual = CMTime.zero
        let image = try generator.copyCGImage(at: CMTime(value: Int64(frame), timescale: 30), actualTime: &actual)
        guard image.width == 1080 && image.height == 1920 else { fatalError("Unexpected camera geometry") }
        guard abs(CMTimeGetSeconds(actual) - Double(frame) / 30) < 0.001 else { fatalError("Camera frame timing mismatch") }
        context.draw(image, in: CGRect(x: 0, y: 0, width: 1080, height: 1920))
        try FileHandle.standardOutput.write(contentsOf: Data(bytes: context.data!, count: 1080 * 1920 * 4))
        if (frame-start) % 150 == 0 {
            FileHandle.standardError.write(Data("camera frame \(frame-start)/\(count)\n".utf8))
        }
    }
}
