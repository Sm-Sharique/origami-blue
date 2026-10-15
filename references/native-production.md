# Native camera colour in full production

October 16 Episode 10 production extends the approved native still-card path to every video frame.

## Picture source

`scripts/native_camera.py original.mp4 camera.mkv` compiles `camera_video.swift`, then extracts each frame
through AVAssetImageGenerator with `.forceSDR` and draws into an sRGB CGContext. RGBA bytes are encoded as
lossless FFV1/BGR0. Output is unmirrored 1080×1920, 30fps. Frame timestamps and counts are checked. The original
stays unchanged; use its audio. This helper requires macOS 15+ and matching source dimensions/rate.

Camera pixels must match `camera_stills.swift` at identical source frames. Episode 10's frames 245, 1499 and 2729
matched the approved early, middle and late stills exactly (mean and maximum RGB difference zero). Verify early, middle and late
frames for a new camera/format. SDR cannot reproduce the entire HDR luminance range; native display
conversion and creative grading are different operations.

## Masks and composition

- A legacy copy may supply mask geometry only when duration, frame order, mirroring and framing match the
  original. Never use its graded picture pixels.
- Apply the same camera transform to native pixels and alpha. Use `natural_focus(F, A)` from the template:
  3.5px normalized background blur, 40px smooth transition, maximum 14% background vignette.
- Restore original foreground pixels around graphics behind the speaker. No separate subject grade, top
  shade or grain. Fully protected subject pixels must remain unchanged by the focus effect.
- Inspect moving hair and shoulders; a good still does not establish temporal mask quality.
- Render graphics separately. Composite native camera pixels, focus, behind graphics, original foreground
  restoration, front graphics and captions. Encode the finished picture once where practical.

With `render.sh`, set `COLOUR_FOOTAGE` to the verified native `.mkv`. The legacy `<key>-sdr.mp4` then supplies
only mask/geometry pixels. Set `AUDIO_SOURCE` to the original. When `COLOUR_FOOTAGE` is omitted, the working
copy supplies picture pixels and must already be verified for colour.

## Final encode and checks

Explicitly convert full-range RGB to limited-range BT.709 YUV:

```text
scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p
```

Tag range `tv`, primaries/matrix/transfer `bt709`. This prevents an encoder matrix mismatch from changing
appearance. Preserve duration and frame count; verify full decode and synchronized audio. Compare final
frames against approved cards, including title/crop, captions and first/last frames. Check spoken entrances
and hold the final call to action through the last frame.

Reconcile overlapping transcription passes so no phrase appears twice at a join. Make authoring scripts
idempotent by starting from the approved card source rather than adding captions to generated production HTML.

Changing picture source, blur/vignette settings, captions or renderer version invalidates the corresponding
derived passes and final encodes. Preserve prior versions in a revision folder; do not trust old completion
markers after an input change. Reuse only passes whose inputs are unchanged.
