# origami-blue — the creator's feedback history

Chronological. Each item: what was said (paraphrased), why it matters, the rule it produced. The style exists
because of these corrections — read them before designing so the same mistakes aren't made again.

## Origin (oct-5 batch, ep.01–02)

Inspiration lives in `<video-set>/inspo/`: `8c259f7a…mp4` (talking-head techniques, originally red/yellow →
translated to blue/yellow/white/black), `ef889d79…mp4` (title styling and chroma-key structure overlays behind
the subject — the main typographic reference), `acdeeceb…mp4` (faceless metaphor b-roll, "show don't tell"),
plus an Instagram UI overlay PNG for safe zones.

1. **First pass rejected as "the worst"**: generic fonts, navy gradients, blue tint, neon glow, caption boxes.
   → Use the inspo's actual grammar: tight grotesk (Inter Tight), small white justified line + big yellow
   headline, elegant italic serif accents, no caption backgrounds, moody grade, negative space. Study the inspo
   frame by frame and match positions and motion — "a $20,000 video", not a template.
2. **"Unprofessional, too unstructured"** (a frame with scattered elements). → Structured grids: label column +
   rule + outline rows + pills. Balance and visual flow over decoration.
3. **"Background big, face small; blurriness on the side; overlays don't match; keyframes should be on top of
   the main clip."** → Never shrink footage below 100% or fill with blurred copies; graphics belong in the
   empty space with the subject in front (chroma key); one grade for subject and room.
4. **"Render in draft. No 4K/final until I say."** → Draft SDR renders only; phone-viewable previews.
5. **"Make sure the time I've spent doesn't go to waste — be clear before any major action."** → Confirm
   before long, destructive or irreversible steps; never redo finished work without asking.
6. **"Are graphics inside Instagram's safe space? Zoom in or out depending on emphasis."** → Safe-zone guides
   on every card; camera zoom tied to meaning.
7. **ep.01 approved ("good as it is, don't change it"). ep.02 problems: a piece of paper (paper card), a
   circular "WRONG ORDER" stamp, a "₹1 crore starts here" stamp — "very childish".** → No skeuomorphic props,
   stamps, stickers, tilted cards, mock UI. Keep the structured editorial grammar.

## oct-6 batch (ep.03–04)

8. **Cards before building**: "transcribe, plan, create the cards properly with exact design sense before
   building". Cards = each beat frozen on the real footage with notes; no subtitles on cards. → Phase 3 exists.
9. **New diagram types and metaphors every episode; B-roll ideas; animations noted on the cards.**
10. **Series continuity**: tile with the episode number ("ep. 3…"), ₹1 crore line, CTA format.
11. **"Too much yellow; use a little blue where it fits."** → Yellow = hero only; blue = structure; white
    serif notes.
12. **Approval note**: keep subtitles in the final; make it feel premium and well animated; chroma key even
    if hard; "different textures or effects to make it feel handmade, when necessary"; the wheel's centre text
    must sit inside the white hub (two lines). → Hand-made layer (boil, brush, halftone, paper); text must stay
    inside its shape.
13. **Drafts accepted ("perfect")** — the oct-6 drafts are the quality bar for the series.

## oct-9 batch (ep.05–06)

14. Cards approved as designed. Asked why renders used PNG sequences ("previously it was easier") and to try
    a direct export; then: "do whatever is most efficient — PNG or direct — but don't make it cheap or bad
    quality." → The direct route hangs on this Mac at full length; the graphics-pass + light-composite route
    is the default (see render-pipeline.md). Explain technical choices in plain words.
15. Wants the style captured as a reusable skill named **origami-blue**, including the *thinking* (how to
    invent metaphors from start to end, series vs non-series openings), "not a cheap copy".

## October 15, 2026 — Episode 10 cards (captured October 16)

These corrections supersede the earlier moody grade, heavy blur and series-title tile; earlier entries remain
historical context.

16. **"Keep the color as it is… as if shot by the camera."** Removing visible filters was insufficient:
    a custom Hable conversion was baked into the working copy. Rebuilt review stills from the original with
    native Apple HDR display handling into tagged sRGB. No creative brightness, contrast, saturation, hue,
    temperature, sepia, top shade or grain. Required HDR display conversion must be described honestly.
17. **"Just blur the background and add a vignette."** Only mild background defocus and neutral edge shading;
    the face/foreground stays sharp and unchanged. Approved vignette maximum: 14%, background only.
18. **"Blur strength is too much… cinematic mode… seamless transition."** Reduced 12px to 3.5px at 1080px;
    eased the effect over 40px outward from the silhouette. Keep room detail; no cutout seam, halo or abrupt
    hair/shoulder transition. These are starting values, not a universal look for all footage.
19. **"I'll be using that picture as the thumbnail… hero… should be about the topic."** Card 2 now leads
    with the episode problem; series identity is a legible recurring header.
20. **"It's a command… analyze the hook."** Hook: clients message and receive the solution for free in chat.
    Approved title: "Clients message. You give away THE SOLUTION. For free." Context: "Right in the chat."
    Preserve this episode's approved copy while styling; derive fresh problem statements for future episodes.
21. **"Coach Meet Business Series, Episode 10… increase the font size."** Series header 52px; episode label
    34px and number 86px. Make the continuing series recognisable while the topic remains primary.
22. **"Cursive… bold… not bold… feels like a block."** Mix regular and bold Inter Tight with Instrument
    Serif italic in meaningful roles; give the lines space and avoid one heavy uppercase slab.
23. **"Last two are not aligned… last line feels different."** Align the visible ink of all five lines at
    x104, compensating for different glyph bearings. Context increased 48→64px, italic payoff reduced
    194→174px, and closing gap tightened to 36px visible ink. Inspect rendered letters, not only CSS boxes.
24. **"Okay this is great… update the skill accordingly."** Carry the approved treatment into defaults and
    instructions; verify full-size and central-square thumbnail readability. Keep revisions scoped to the
    requested card/effect. Full video production remains separate from this approved card plan.

## October 16, 2026 — production and private skill repository

25. User authorized rendering Episode 10 into `15th oct final`, then updating/pushing the skill to a new
    private GitHub repository, then creating cards for the two additional recordings. Preserve that order.
26. Full native camera decoding uses the approved forceSDR + sRGB path on every frame. Keep mask geometry
    sources separate from picture pixels and use an explicit RGB-to-BT.709 encoder matrix.
27. Production QA caught caption shading dimming the letters. Disable the caption burn; retain readable
    white/yellow type and its restrained text shadow. Fix overlapping transcript joins before export.
28. Repository visibility is private. Store reusable skill files and graphic examples; exclude raw footage,
    finished videos, credentials and caches.

## Standing preferences

- Phone review: always send a < 30 MB 720p preview alongside the full-res path.
- Status updates in plain language during long renders; honest cause when something fails.
- Feedback by card number / timestamp → change exactly that.
- The creator's own words on screen whenever possible; fix transcript mishearings (₹1 crore, "comment your offer").
