"""Native HDR display conversion for a 1080x1920, 30fps original.
Usage: python3 native_camera.py original.mp4 output-camera.mkv [--start FRAME] [--frames N]
Requires macOS 15+, Swift, ffmpeg and ffprobe. Writes lossless, unmirrored sRGB camera frames.
Retain the original for audio and preserve it unchanged.
"""
from pathlib import Path
import argparse, json, subprocess

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('source',type=Path);parser.add_argument('output',type=Path)
parser.add_argument('--start',type=int,default=0);parser.add_argument('--frames',type=int)
args=parser.parse_args()
args.source=args.source.resolve();args.output=args.output.resolve()
assert args.source!=args.output,'Never overwrite the camera original'
meta=json.loads(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_streams','-of','json',str(args.source)]))['streams'][0]
assert (meta['width'],meta['height'],meta['avg_frame_rate'])==(1080,1920,'30/1'),'This tested decoder expects 1080x1920 at 30fps'
total=int(meta.get('nb_frames') or round(float(meta['duration'])*30))
count=args.frames if args.frames is not None else total-args.start
assert args.start>=0 and count>0 and args.start+count<=total
assert not args.output.exists(),'Choose a new output path or verify the existing output before reusing it'
args.output.parent.mkdir(parents=True,exist_ok=True)
cache=args.output.parent/'.native-camera';cache.mkdir(exist_ok=True)
binary=cache/'camera_video';swift=Path(__file__).with_name('camera_video.swift')
if not binary.exists() or binary.stat().st_mtime<swift.stat().st_mtime:
    subprocess.run(['swiftc','-O','-module-cache-path',str(cache/'modules'),str(swift),'-o',str(binary)],check=True)
temporary=args.output.with_suffix('.pending.mkv')
with args.output.with_suffix('.decode.log').open('w') as log:
    decoder=subprocess.Popen([str(binary),str(args.source),str(args.start),str(count)],stdout=subprocess.PIPE,stderr=log)
    encoder=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pixel_format','rgba','-video_size','1080x1920','-framerate','30','-i','-','-an','-c:v','ffv1','-level','3','-pix_fmt','bgr0','-threads','4','-color_range','pc','-color_primaries','bt709','-color_trc','iec61966-2-1',str(temporary)],stdin=decoder.stdout,stderr=log)
    decoder.stdout.close()
    a,b=decoder.wait(),encoder.wait();assert a==b==0,(a,b)
encoded=json.loads(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-count_packets','-show_entries','stream=nb_read_packets','-of','json',str(temporary)]))
assert int(encoded['streams'][0]['nb_read_packets'])==count
temporary.replace(args.output)
args.output.with_suffix('.colour.json').write_text(json.dumps({'source':str(args.source),'conversion':'AVAssetImageGenerator forceSDR + ColorSync sRGB','creative_grade':False,'start_frame':args.start,'frames':count,'fps':30,'mirrored':False},indent=2))
print('Verified native camera frames:',args.output)
