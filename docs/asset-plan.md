# Asset plan: Streha Premium d.o.o.

- **Step:** A2 · **v2**, 28 Sep 2026 · for `docs/demo-plan.md` v2
- **Status:** ⏸ Waiting for your approval.

**Rules**
- AI pictures are hyper-realistic and look like **one photo shoot**: the same overcast light and the same Slovenian suburb as your 4 hero frames.
- They are never labelled as the client's own projects.
- The team, Stefan, reviews and project photos must be **real**.
- No text or logos inside generated images; those are added in code.

---

## How the "animated house" works (your question, researched)

There are **three different techniques**. They are easy to mix up.

| Technique | What it is | When to use it |
|---|---|---|
| **1. AI video from keyframes** (Grok Imagine, Higgsfield, Kling, Veo) | You give the tool still images. It **invents the motion in between** and outputs an MP4. Both Grok Imagine 1.5 and Higgsfield anchor **a start frame and an end frame** per generation, i.e. 2 images, not 4. | Always the first step when you want real-looking motion (a roof being built, an iPhone exploding). |
| **2. Scroll-scrubbed frames** (the exploding-iPhone site from the workshop) | The MP4 from step 1 is cut by **ffmpeg** into about 100–150 separate still images (frames). The website draws *one frame at a time* on a canvas, based on how far you have scrolled, so scrolling "plays" the video forwards and backwards. Images are used instead of the video because browsers can't jump around inside an MP4 smoothly while scrolling. | Only when the animation is **driven by scroll**. |
| **3. Remotion** | Makes videos **from code** (React): slides, crossfades, wipes, text and logo animations. It does **not** invent realistic motion between pictures. With your 4 frames it could only fade or wipe from one to the next. | Promo clips or social videos with text and graphics; a fallback if the AI video fails. |

**What we use now:** the hero plays **on page load, not on scroll**, so we need **only technique 1**:
1. You make **one MP4** from your frames.
2. I use ffmpeg only to **compress** it (MP4 + WebM, a smaller phone version, and the first and last frames as still images).
3. The site plays it as a normal video.

There is **no frame cutting and no Remotion** for the hero.

Sources:
- [Grok Imagine Video 1.5 guide](https://help.scenario.com/articles/5410526625-grok-imagine-video-a-guide-to-ai-motion-creation) (first- and last-frame workflow)
- [xAI API tutorial](https://news.creeta.com/en/grok-imagine-video-1-5-guide-2026/)
- [Higgsfield keyframe animation (start and end frame)](https://www.michydev.com/higgsfield-cinema-studio-3-keyframe-animation-tutorial/)
- [Higgsfield Start & End Frames](https://lab.pure-neo.io/ai-news/higgsfield-launches-start-end-frames-to-bring-narrative-control-to-ai-video)

---

## House style
Append this to every image prompt. It is matched to your 4 frames.

> Photorealistic architectural photograph, full-frame camera, 35 mm lens, f/8, soft even daylight under a bright overcast grey sky, no harsh shadows. Slovenian suburb: white rendered walls with a light-grey plinth, anthracite window frames, neat green lawn and hedges, neighbouring houses with red and anthracite tile roofs, forested hills in the background. True-to-life colours, crisp material detail (tile texture, fresh spruce timber, sheet-metal folds). Calm and honest: no sunset, no lens flare, no HDR glow. No people, no text, no logos, no watermarks.

---

## Hero video – the 4 frames (✅ you made them, saved in `assets/raw/`)

| Order | File name (use it when uploading to Grok / Higgsfield) | What it shows |
|---|---|---|
| 1 – start | `hero-01-ostresje.webp` | Bare spruce roof structure (rafters) |
| 2 | `hero-02-folija-letve.webp` | Grey breathable membrane with vertical counter-battens |
| 3 | `hero-03-kritina-polovica.webp` | Horizontal battens; lower half tiled in anthracite |
| 4 – end | `hero-04-koncana-streha.webp` | Finished anthracite roof, ridge, gutter, snow guards |

All four are 1448 × 1086 (4:3), with the same camera, house and garden. That's exactly what the video needs.

⚠️ One small mismatch: in frame 3 the vertical counter-battens from frame 2 are no longer visible under the horizontal battens. The AI will usually hide this, but if a variant makes the battens "melt", pick another variant.

### The video: `hero-streha-nastaja.mp4`
- **Length:** 6 s
- **Format:** 4:3 if the tool allows (otherwise 16:9 is fine; I'll handle the crop)
- **Resolution:** highest available (1080p)
- **Audio:** none

**Way A – one generation (try this first)**
- **Start frame:** `hero-01-ostresje.webp`
- **End frame:** `hero-04-koncana-streha.webp`
- If the tool accepts extra reference images, also add `hero-02-folija-letve.webp` and `hero-03-kritina-polovica.webp`.

**Prompt:**
> Time-lapse of a roof being built on this house, one smooth continuous shot. Camera completely locked, no camera movement. The house walls, windows, garden, neighbouring houses, hills, sky and soft overcast light stay exactly the same the whole time. Only the roof changes, in this order: first the bare spruce rafters; then a light-grey breathable roofing membrane rolls out over the rafters from the eaves up to the ridge, and vertical timber counter-battens are fixed along every rafter; then horizontal timber battens appear from the eaves to the ridge; then matte anthracite roof tiles are laid row by row from the eaves upward, until the whole roof is covered; finally ridge tiles close the top and a row of snow guards appears above the gutter. Steady, even pace, each stage takes about the same time. No people, no tools, no cranes, no birds, no rain, no text. No cuts, no flicker, no warping of the house. 6 seconds.

Make **3–4 variants and pick the smoothest one**: the house must not bend, flicker or change colour.

**Way B – only if Way A skips or mangles the middle stages**
Make **3 short clips**, each with its own start and end frame, using the same prompt shortened to the one stage in brackets:

| Clip | File name | Start → end | Stage (put in the prompt) |
|---|---|---|---|
| 1 | `hero-clip-1.mp4` | `hero-01-ostresje` → `hero-02-folija-letve` | "a light-grey breathable membrane rolls out over the rafters from the eaves to the ridge, then vertical counter-battens are fixed along every rafter" |
| 2 | `hero-clip-2.mp4` | `hero-02-folija-letve` → `hero-03-kritina-polovica` | "horizontal battens appear from the eaves to the ridge, then anthracite tiles are laid row by row over the lower half" |
| 3 | `hero-clip-3.mp4` | `hero-03-kritina-polovica` → `hero-04-koncana-streha` | "the remaining tiles are laid row by row up to the ridge, ridge tiles close the top, snow guards appear above the gutter" |

I join them and time each to 2 s with ffmpeg, so the result is still one 6-second video.

---

## Service pictures (5) – 4:3, at least 1600 × 1200
Generate them in Grok Imagine or Higgsfield (image mode). Paste the prompt, then the **house style** from above. Make 2–3 variants each and pick the most natural one.

**① `service-01-nove-strehe.jpg`: Nove strehe in prekrivanje**
> A newly finished roof of natural clay-red interlocking roof tiles on a white rendered Slovenian family house, seen from slightly above at a three-quarter angle. The tile rows run in perfect straight lines diagonally through the frame, with a crisp ridge line at the top, anthracite sheet-metal verge flashing and a new anthracite gutter along the eaves. The roof fills most of the frame. [house style]

**② `service-02-obnova-popravila.jpg`: Obnova in popravila**
> An older white rendered Slovenian house during roof renovation. The left half of the roof still has old, weathered brown clay tiles; the right half is stripped to fresh spruce battens over a new light-grey breathable membrane, with a neat stack of new anthracite tiles resting on the battens. A clean steel scaffold with a guard rail runs along the eaves. Seen from slightly above at a three-quarter angle. [house style]

**③ `service-03-kleparska-dela.jpg`: Kleparska dela**
> Close-up detail of precise sheet-metal work on a roof: an anthracite standing-seam metal roof meeting a custom-folded chimney flashing and a verge flashing, with sharp clean folds, straight seams and neat fixing clips. A white rendered chimney rises out of the roof. Overcast light shows the matte metal texture. [house style]

**④ `service-04-ravne-strehe.jpg`: Ravne strehe in hidroizolacije**
> A modern flat roof on a white cubic Slovenian family house, seen from a slightly higher neighbouring viewpoint. Fresh light-grey PVC waterproofing membrane covers the roof, with welded seams visible as thin straight lines, a clean anthracite metal parapet edge flashing and a round roof drain. The surface is dry and even. Neighbouring pitched roofs and forested hills in the background. [house style]

**⑤ `service-05-zlebovi.jpg`: Žlebovi in odvodnjavanje**
> Low-angle view looking up at the eaves corner of a white rendered house: a new anthracite half-round gutter on neat brackets, a corner outlet and an anthracite downpipe running down the facade. Above it the edge of an anthracite tile roof with a row of snow guards. Clean white soffit, soft overcast light. [house style]

---

## All pictures

| ID | Page › section | Ratio · size | AI / real | Source |
|---|---|---|---|---|
| V01 | Home › Hero video | 4:3 · 1080p · 6 s | AI video | `hero-streha-nastaja.mp4` (from the 4 frames) |
| P01 | Home › Hero poster and still | 4:3 | AI (have) | `hero-01…` (poster) and `hero-04…` (still for reduced motion) |
| P02–P06 | Home › Storitve (5 cards) | 4:3 · 1600×1200 | AI | prompts ①–⑤ above |
| P07 | Home › Projekti | various | **REAL** (have) | `assets/client/photos/real-01…05` |
| P08 | Home › O nas (crew) | 2:3 | **REAL** (have) | `assets/client/photos/real-03-ekipa-letve-folija.jpg` |
| P09 | Home › O nas (Stefan) | 4:5 · min 1200×1500 | **REAL, MISSING** | Portrait of Stefan Gabor on a roof or next to the van, daylight, looking at the camera. A phone photo is fine. |
| P10 | Home › Garancija | 1414×2000 | **REAL** (have) | `assets/client/documents/garancija-10-let-vodotesnost.jpg`. The PDF is **MISSING**. |
| P11 | Home › Mnenja strank | – | **REAL, MISSING** | 3 real customer quotes (first name, town, type of work), with permission. No photos needed. |
| P12 | Home › Materiali | – | Text | Brand names typeset in code (no logo files needed) |
| P13 | Share image (OG) | 1200×630 | Composed in code | `hero-04` + H1 + stamp |
| – | Pogosta vprašanja page | – | – | No pictures |

## Checklist for you
Everything goes into **`assets/raw/`** (lowercase, no spaces):
- [x] `hero-01-ostresje.webp`
- [x] `hero-02-folija-letve.webp`
- [x] `hero-03-kritina-polovica.webp`
- [x] `hero-04-koncana-streha.webp`
- [ ] `hero-streha-nastaja.mp4` (Way A), **or** `hero-clip-1.mp4`, `hero-clip-2.mp4`, `hero-clip-3.mp4` (Way B)
- [ ] `service-01-nove-strehe.jpg`
- [ ] `service-02-obnova-popravila.jpg`
- [ ] `service-03-kleparska-dela.jpg`
- [ ] `service-04-ravne-strehe.jpg`
- [ ] `service-05-zlebovi.jpg`
- [ ] **From the client:**
  - `stefan-portrait.jpg`
  - `garancija-10-let.pdf`
  - 3 real reviews (text)
  - the original logo file
  - opening hours
  - answers to the ❓ FAQ questions
