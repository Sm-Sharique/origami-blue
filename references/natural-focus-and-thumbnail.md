# Natural footage and topic-led thumbnails

Approved in the October 15, 2026 Episode 10 card review; recorded October 16. These preferences supersede
older graded-footage, strong band-blur and giant-series-name examples. Preserve the established graphic
palette, hand-made diagrams and word-timed motion. A request to revise one card is not a request to rebuild
the video or change approved copy.

## Camera appearance

Keep camera colours, skin tone, brightness and contrast as shot. No creative colour grade, saturation,
temperature or hue shifts, sepia, top shade or film grain. Blur and a neutral vignette are the only requested
footage effects. The original source stays untouched.

Removing filters does not undo a grade baked into a working copy. Episode 10's old SDR copy used a custom
Hable conversion and still looked treated after filters were removed. Rebuild from the original. Inspect
colour primaries and transfer metadata first; never simply retag HLG/PQ or decode it as ordinary SDR.

For macOS 15+ HDR review stills, the tested route is AVAssetImageGenerator with `forceSDR`, followed by
ColorSync into tagged sRGB PNG. This is necessary display conversion, not an assertion that HDR and SDR
have identical luminance. Explain that distinction when relevant. Use:

```bash
swift "$OB/scripts/camera_stills.swift" "$ORIGINAL" "$CARDS_JSON" "$CAMERA_FRAMES"
export ORIGAMI_CAMERA_FRAMES="$CAMERA_FRAMES"
bash "$OB/scripts/cards.sh" "$EPISODE_ENV"
```

The extractor uses 30fps card times rounded up to the next frame, and writes unmirrored `camera_00.png`, etc.
Confirm frame correspondence and geometry with the mask source. `cards.py` mirrors these colour frames;
legacy working footage may supply mask geometry only when frame correspondence is verified. Do not use its
pixels for the revised picture. With no override, cards use the supplied SDR footage, which must be verified.

The full-video extension now uses `scripts/native_camera.py` and the same native conversion on each frame.
It was checked against the approved Episode 10 camera stills. See `native-production.md` for picture-source
separation, encoding and validation. The legacy `prep.sh` copy is not automatically an approved colour match.

## Gentle focus

Approved starting values at 1080×1920:

| Setting | Value | Intent |
|---|---|---|
| Creative colour grade | Off | Preserve camera appearance |
| Background blur | 3.5px | Room still recognisable; cinematic-mode-like softness |
| Subject-to-background transition | 40px outward | Smoothly increase effect from zero at the silhouette |
| Vignette | Neutral, maximum 14% | Background edges only; face protected |
| Top shade / footage grain | Off / off | No extra treatment |

The rejected version used 12px blur and looked manually applied. Use a cleaned subject matte, a smooth
distance-based falloff outside hair/shoulders, and normalized background-only blur so foreground colours
do not bleed into the room. Use the same feather to protect the subject from vignette darkening. Do not blur
the whole image or substitute a horizontal band. Match colour and pixels between base and subject layers.
Scale pixel values for resolution; tune gently for different scenes rather than imposing identical numbers.

Check face detail and unchanged subject pixels, hair edges, shoulder transitions, halos and remaining room
detail. For moving footage inspect temporal consistency too; a good still does not prove a stable moving mask.

## Card 2: thumbnail and continuing series identity

1. Read the actual spoken hook. Write a short problem statement naming the situation and mistaken behaviour
   or consequence. A command such as "Stop giving solutions away" does not express the approved hook type.
2. Make the topic the hero. Keep COACH MEET / BUSINESS SERIES and the episode number clearly readable as a
   recurring header. The series name must not take over the headline.
3. Use only regular/bold Inter Tight and Instrument Serif italic. Assign styles by meaning: regular setup,
   italic action, bold core problem, italic payoff, regular context. Avoid an all-heavy uppercase block.
4. Align visible letter edges, including the payoff and context. Different fonts need different x positions
   to achieve the same optical alignment. Do not indent the final two lines for decoration.
5. Treat the closing context as part of the title: adequate size, deliberate spacing, no detached footnote.
   Keep approved wording when adjusting font, size, spacing or alignment.
6. Inspect full-size, phone-size and central-square crops. Export a clean 1080×1920 thumbnail without review
   annotations. Save a complete sharp title state; motion and timing still follow the spoken intro.

## Approved Episode 10 example (reference, not reusable episode copy)

Hook: when clients message, you give the solution directly in chat for free.

Title: **Clients message. You give away THE SOLUTION. For free.**
Context: **Right in the chat.**

| Element | Font and size at 1080px | Role |
|---|---|---|
| COACH MEET / BUSINESS SERIES | Inter Tight 52px, weights 550 / 750 | Readable ongoing-series header |
| EPISODE / 10 | Inter Tight 34px / 86px | Series continuity |
| Clients message. | Inter Tight regular 76px | Situation |
| You give away | Instrument Serif italic 118px | Action |
| THE SOLUTION. | Inter Tight bold 124px, weight 850 | Core problem |
| For free. | Instrument Serif italic 174px, blue | Consequence |
| Right in the chat. | Inter Tight regular 64px | Connected context |

All five title/context lines have visible ink starting at x104. Their SVG x coordinates are respectively
101, 97, 102, 111, 100 because glyph bearings differ. The final revision reduced the italic payoff 194→174px,
increased context 48→64px, and left a 36px visible-ink gap. Check actual rendered letters: overlapping font
metric boxes alone do not prove a visual collision. Recompute positions when wording changes; do not blindly
copy these coordinates or impose five lines on every title.
