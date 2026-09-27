# Asset plan: Streha Premium d.o.o.

**Step:** A2 · 27 Sep 2026 · for `docs/demo-plan.md`

**Rules**
- AI images must be **hyper-realistic** and must look like one photo shoot, so every prompt ends with the house style below.
- AI images are used for service visuals, the signature sequence and backgrounds only. They are never labelled as the client's own projects.
- The team, Stefan, and project photos must be **real client photos**.
- No text or logos inside any generated image; those are added in code.

## House style
Append this to the end of every image prompt:

> Photorealistic editorial architecture photograph, shot on a full-frame camera with a 35mm lens at f/8, natural soft daylight under a bright overcast sky, true-to-life colours with a slightly cool tone. Central European (Slovenian) suburban setting: white and light-grey rendered facades, anthracite (#2B2E33) and natural clay-red roof tiles, galvanised and anthracite sheet metal. Crisp detail in materials (clay grain, metal folds, membrane print texture). Calm, honest, no drama: no lens flare, no HDR glow, no sunset, no heavy vignette. No people's faces visible, no text, no logos, no watermarks.

**Palette reference (for judging results):**
- anthracite `#23262B`
- slate `#3A3F46`
- zinc white `#F2F3F1`
- clay red `#B4523A`
- chalk red accent `#FF3131` (UI only, not in photos)

## Signature moments

### ★ "Streha nastaja" (the roof builds itself), home § 3
- **Where:** directly after the trust bar, pinned for about 4 screen heights of scroll.
- **What the visitor sees:** one locked camera view of a new house's roof. As they scroll, layers appear in order, and each step shows a text beat on the left (desktop) or bottom (mobile):

| Beat | Layer appears | Text beat (SL) |
|---|---|---|
| 1 | Bare timber roof structure (rafters) | **01 Ostrešje** – Trdna osnova, preverjena pred začetkom del. |
| 2 | Breathable membrane plus counter-battens | **02 Paroprepustna folija** – Druga linija obrambe pred vodo. |
| 3 | Battens plus the first rows of tiles | **03 Letve in kritina** – Opečna, cementna ali pločevinasta – svetujemo, katera je prava. |
| 4 | Full roof plus flashings, gutters and snow guards | **04 Kleparski zaključki** – Obrobe, žlebovi in snegobrani, izdelani po meri. |
| 5 | Light rain; water runs off into the gutter; red stamp lands | **10 let garancije na vodotesnost.** Pisno, za vsako streho. |

- **Fallback:** under `prefers-reduced-motion` and on low-power devices, the final frame is shown as a still with all 5 beats listed.

### Supporting: the red chalk line (no assets, built in SVG)
- In the hero, a red line snaps along the ridge of the line-drawn roof on load.
- It returns as a thin measuring line in "Kako delamo".

## What to create

### A. Keyframes (4 images) – 16:9, at least 2400×1350 px, PNG or high-quality JPG
Make **KF1 first**, then create KF2–KF4 as **edits of KF1** (same image, same camera), so everything lines up. Tools: Midjourney v7 / Flux / GPT-image / Nano Banana, using "edit" or "vary region" with KF1 as the reference.

**KF1 – `roof-build-01-rafters.png`**
> A newly built two-storey family house in a Slovenian suburb, white rendered walls finished, windows installed, the pitched gable roof (about 38°) showing only its bare new timber roof structure: pale spruce rafters, ridge beam and wall plate, evenly spaced, clean and precise. Camera at a three-quarter view from slightly above the eaves height, the whole roof and top of the facade in frame, roof occupying the right two-thirds of the image, plain bright overcast sky behind, calm empty lawn in front. No scaffolding in front of the roof, no workers. [house style]

**KF2 – `roof-build-02-membrane.png`**
> Same image, same camera, same lighting, same house and background. Change only: the rafters are now covered with a light grey breathable roofing membrane (unbranded, faint printed grid pattern), neatly overlapped, with vertical pale timber counter-battens fixed on top along each rafter line. [house style]

**KF3 – `roof-build-03-battens-tiles.png`**
> Same image, same camera, same lighting, same house and background. Change only: horizontal timber battens now run across the whole roof over the membrane, and the lower half of the roof is covered with matte anthracite (#2B2E33) interlocking concrete roof tiles laid in perfect rows, the upper half still showing battens and membrane. [house style]

**KF4 – `roof-build-04-finished.png`**
> Same image, same camera, same lighting, same house and background. Change only: the whole roof is finished with matte anthracite interlocking tiles, a neat ridge line with ridge tiles, anthracite sheet-metal flashings at the verge and eaves, a half-round anthracite gutter with downpipe, and a row of snow guards above the eaves. [house style]

**KF5 (optional) – `roof-build-05-rain.png`:** KF4 with light, steady rain, the tiles wet with a slight sheen, and water visibly running into the gutter. Sky slightly darker grey.

### B. Video clips (3–4) – 16:9, 1920×1080 or larger, 5–8 s each
**Tool:** Kling 2.x / Veo 3 / Runway Gen-4 / Luma, using **start and end frames**. Make each clip from one pair: KF1→KF2, KF2→KF3, KF3→KF4, and optionally KF4→KF5.

**Prompt (use for every pair, changing only the bracket):**
> Slow, smooth, continuous motion: [the grey membrane unrolls across the rafters from the eaves upward, then counter-battens appear one by one]. Camera completely locked, no movement. Constant speed, no cuts, no shake, background, house and lighting unchanged. No people. 6 seconds.

The bracket for each clip:
- **Clip 2 – `roof-build-b-battens-tiles.mp4`:** "horizontal battens are laid across the roof from bottom to top, then anthracite tiles are laid row by row over the lower half"
- **Clip 3 – `roof-build-c-finish.mp4`:** "the remaining tiles are laid row by row up to the ridge, ridge tiles close the top, then metal flashings, the gutter and snow guards appear"
- **Clip 4 (optional) – `roof-build-d-rain.mp4`:** "light rain begins to fall, the tiles darken slightly as they get wet, water runs down the tiles into the gutter and out of the downpipe"

Name clip 1 **`roof-build-a-membrane.mp4`**.

Make **2–4 variants of each clip and pick the smoothest**, not the prettiest. There must be no warping of the house and no flicker.

**Optional for mobile:** the same set in 9:16 (1080×1920), with the roof filling the upper 60 %.

## Pictures

| ID | Page › section | Ratio · size | AI / real | Prompt / source |
|---|---|---|---|---|
| P01 | Home › Hero | – | **Code** (SVG linework of the logo roof) | No image. Optional texture: see P11. |
| P02 | Home › Storitve ① Nove strehe in prekrivanje | 4:3 · 1600×1200 | AI | *Close view along a freshly finished roof of natural clay-red interlocking roof tiles on a new Slovenian house, perfect straight rows running diagonally through the frame, crisp ridge line at the top, a white rendered gable wall at the edge of frame, soft overcast daylight.* [house style] |
| P03 | Home › Storitve ② Obnova in popravila | 4:3 · 1600×1200 | AI | *An older Slovenian house mid-renovation: half of the roof stripped to new timber battens over a fresh grey breathable membrane, the other half still showing old weathered brown tiles, a neat stack of new anthracite tiles on the battens, secure scaffolding with guard rail along the eaves, no people.* [house style] |
| P04 | Home › Storitve ③ Kleparska dela | 4:3 · 1600×1200 | AI | *Macro-detail of precise anthracite standing-seam sheet-metal roofing meeting a custom-folded verge flashing and a chimney flashing, sharp clean folds and seams, rivets and clips visible, overcast light revealing the metal's matte texture.* [house style] |
| P05 | Home › Storitve ④ Ravne strehe in hidroizolacije | 4:3 · 1600×1200 | AI | *A modern flat roof of a Slovenian single-family house with a fresh light-grey PVC waterproofing membrane, welded seams visible as neat lines, a clean metal roof edge (attic) flashing and a roof drain, slight puddle-free surface, white parapet, bright overcast sky reflected softly.* [house style] |
| P06 | Home › Storitve ⑤ Žlebovi in odvodnjavanje | 4:3 · 1600×1200 | AI | *Low-angle view up at the eaves of a white rendered house: a new anthracite half-round gutter with neat brackets, a corner outlet and a downpipe running down the facade, anthracite roof tiles and snow guards visible above, clean soffit, soft overcast light.* [house style] |
| P07 | Home › Projekti | various | **REAL** | `assets/client/photos/real-01…05` (already collected) |
| P08 | Home › O nas (crew) | 3:4 | **REAL** | `assets/client/photos/real-03-ekipa-letve-folija.jpg` (have) |
| P09 | Home › O nas (Stefan) | 4:5 · min 1200×1500 | **REAL, MISSING** | Portrait of Stefan Gabor on a roof or next to the van, daylight, looking at camera. A phone photo is fine. |
| P10 | Home › Garancija | 1414×2000 | **REAL** | `assets/client/documents/garancija-10-let-vodotesnost.jpg` (have). The PDF version is **MISSING**. |
| P11 | Home › Hero and dark sections (texture, optional) | 16:9 · 2400×1350 | AI | *Straight-on, perfectly flat top-down photograph of matte anthracite concrete roof tiles filling the entire frame, even overcast light, subtle surface grain, no perspective, no horizon, seamless-looking pattern.* [house style] |
| P12 | Share image (OG) | 1200×630 | **Code-composed** | The logo roof linework, H1 and stamp rendered from the hero. No AI. |
| P13 | Home › Materiali | – | Logos | Tondach, Creaton, Bramac, Sika (have, in `assets/client/partners/`). Redraw as monochrome SVG. **MISSING:** clean logos for Eternit, Esal, Gerard, Metro Bond, Trimo, Isopan, Italpaneli, plus confirmation that they may be shown. |

## Checklist for you
Put everything into **`assets/raw/`** (no spaces in names, lowercase):

- [ ] `roof-build-01-rafters.png` (KF1)
- [ ] `roof-build-02-membrane.png` (KF2, edit of KF1)
- [ ] `roof-build-03-battens-tiles.png` (KF3, edit of KF1)
- [ ] `roof-build-04-finished.png` (KF4, edit of KF1)
- [ ] `roof-build-05-rain.png` (optional)
- [ ] `roof-build-a-membrane.mp4`, `roof-build-b-battens-tiles.mp4`, `roof-build-c-finish.mp4` (+ optional `roof-build-d-rain.mp4`)
- [ ] `service-01-nove-strehe.jpg` (P02)
- [ ] `service-02-obnova.jpg` (P03)
- [ ] `service-03-kleparstvo.jpg` (P04)
- [ ] `service-04-ravne-strehe.jpg` (P05)
- [ ] `service-05-zlebovi.jpg` (P06)
- [ ] `texture-anthracite-tiles.jpg` (P11, optional)
- [ ] **From the client:** `stefan-portrait.jpg`, `garancija-10-let.pdf`, original logo file (Canva/SVG), more real project photos (ideally before/after pairs taken from the same spot), confirmation of the 5 unverified photos

Until the files exist, the demo uses marked placeholders in the same slots. Dropping the files in with these names is all that's needed.
