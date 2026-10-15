# origami-blue

The private editing skill for Coach Meet Business Series: natural camera colour, subtle background focus,
editorial typography and hand-drawn metaphors, built with HyperFrames.

![Approved Episode 10 thumbnail](examples/ep10-free-in-chat/thumbnail.png)

## Current style

- Preserve camera colour, skin tone and detail. No creative grade, colour shifts, top shade or footage grain.
- Start with 3.5px background blur, a smooth 40px transition around the subject and at most 14% neutral
  background-edge vignette at 1080×1920. Keep the face sharp and the room recognisable.
- Use Inter Tight regular/bold and Instrument Serif italic. Blue provides structure; yellow marks the key idea.
- Make the series card a topic-led thumbnail: a problem statement from the spoken hook, a legible recurring
  series header and episode number, one optical left edge, and connected closing context.
- Plan each beat as a meaningful visual mechanism, with word-timed animation and restrained sound effects.

October 15 revisions override older graded-footage and series-name-as-hero examples. Read
[the current treatment and thumbnail rules](references/natural-focus-and-thumbnail.md).

## Workflow

1. Read the footage and transcript; find the episode's central problem and turn.
2. Create design cards on the actual footage, including a clean thumbnail.
3. After approval, animate the layouts, add captions and sound, and render the video.
4. Check source colour, moving mask edges, timing, safe zones, frame count and audio synchronization.
5. Deliver the requested export and phone preview. Revise only the requested card or time range.

## Install

Use an authenticated GitHub account with access to this private repository. For a fresh Codex installation:

```bash
gh repo clone Sm-Sharique/origami-blue ~/.codex/skills/origami-blue
cd ~/.codex/skills/origami-blue/scripts/node
npm ci
```

If already installed, preserve local changes before updating. Requirements: Apple Silicon Mac, Node.js 22+,
Python 3 with numpy/Pillow/scipy, ffmpeg/ffprobe, and Swift for native camera decoding. Native `forceSDR`
requires macOS 15+. Renderer pin: `hyperframes@0.8.162`; check compositions after version changes.

Allow disk space for lossless intermediates and graphics passes: the 92-second 1080p native-camera
intermediate used about 4 GB. Current production was exercised on an M4 Max with 48 GB RAM. Earlier M2/8 GB
timing notes remain historical references.

## Natural camera decoding

```bash
python3 scripts/native_camera.py original.mp4 work/camera.mkv
```

This uses the native Apple display conversion of the approved still cards and retains lossless sRGB pixels.
It performs necessary HDR-to-SDR display handling without a creative tone curve. Use the original for audio;
never use a previously graded intermediate as the picture source. See
[production colour handling](references/native-production.md).

## Contents

| Path | Purpose |
|---|---|
| `SKILL.md` | Entry point, quality rules and workflow |
| `references/` | Design, metaphor planning, natural focus, production and feedback history |
| `scripts/` | Cards, native decoding, masks, compositing, audio and rendering helpers |
| `assets/` | Fonts, graphic effects and episode templates |
| `examples/ep10-free-in-chat/` | Approved topic thumbnail and production animation example |
| Other `examples/` | Earlier graphic language and metaphor references |

Raw recordings, rendered videos, credentials, caches and dependency folders are excluded. This private
repository stores the reusable skill and graphic examples.

## Credits

Built on HyperFrames and GSAP. Inter Tight and Instrument Serif use the SIL Open Font License; see
`assets/template/fonts/OFL.txt`. Earlier installed origami-blue examples and credits are preserved. Sound
effects are supplied separately; retain their license/credit files when adding them to a project.
