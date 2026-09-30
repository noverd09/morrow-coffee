# Style lock: Morrow Coffee

## Direction contract
- Thesis: Coffee sorted by sunrise. Roast level becomes time of morning (dark roast = before light, light roast = high morning). Every coffee has an hour.
- Brand name: Morrow. Line: "Pick your first hour."
- First viewport: giant serif headline, one dawn-indigo sun disc rising behind one coffee bag, horizon strip at the bottom.
- Signature: the Hour Dial (slider 05:00 to 11:00 recolors the sky, moves the sun, surfaces the nearest coffee).
- Risk: serif-led, flat color, no photography on the home page; bags are generated SVG art, not stock photos.
- Mood: warm + editorial. Voice: measured, concrete, no em dashes.

## Color contract (all verified with WCAG math, Node, not the skill's python scripts)
| Token | Hex | Role |
|---|---|---|
| ink | #1B120C | text, dark sections |
| paper | #F3EBDC | page background |
| oat | #E7DAC2 | surface / alt band |
| dawn | #2E3D8C | brand accent (blue hour indigo), CTA fill, links on paper |
| dawn-hi | #AEBBFF | accent text on ink only |
| sun | #F6DE8D | sun disc, accent text on ink, butter yellow bands |
| bean | #3F4A2E | green-bean band |
| mute | #5E4E42 | secondary text |
| crema | #C69A62 | decorative only |

Text-safe (>= 4.5): ink/paper 15.6, ink/oat 13.4, mute/paper 6.7, mute/oat 5.8, dawn/paper 8.2, paper/dawn 8.2, paper/ink 15.6, sun/ink 13.8, dawn-hi/ink 10.0, paper/bean 7.9, sun/bean 7.1.
Not for text: dawn on ink (1.9), crema on paper. Use dawn-hi on ink.

## Type
- Display: Instrument Serif (regular + italic). Body: Instrument Sans. Labels/data: Geist Mono, uppercase, tracked.
- Scale: display clamp(3.5rem, 11vw, 10.5rem) line-height 0.9; h2 clamp(2.5rem, 6vw, 5.5rem); body 1.0625rem/1.6; label 0.75rem mono +0.08em.

## Shape and spacing
- Radius: 0 everywhere except the sun disc and pills (999px) for the dial thumb. Hairline rules 1px ink at 20% opacity.
- Section rhythm: hero/dial/manifesto 160px, connective 112px (clamp on mobile).
- Container: max 1360px, padding-inline clamp(20px, 4vw, 56px).

## Motion (framer-motion, already in repo; not adding GSAP)
- Hero: sun rises 1.4s ease-out-expo, headline lines mask-reveal 0.9s stagger 0.08s, bag settles.
- Scroll: manifesto words fade in scrubbed to scroll, hero sun parallax.
- UI: 150-250ms transitions on transform/opacity/color only. Hover motion gated by (hover: hover). Global reduced-motion handling via MotionConfig + CSS.

## Structure (public pages)
- Macrostructure: Long-Scroll Narrative + Editorial Index catalogue.
- Arc: hook (hero) > problem/tension (dial: which morning are you?) > solution (lineup index) > how (manifesto + 3-step strip) > proof (journal) > close (sunrise CTA).
- Rotation note: no prior builds recorded in .tastemaker/log.json or ~/.tastemaker, so nothing to rotate against.

## Assets
- Photography: none on home. Journal + story pages keep existing Unsplash thumbnails. Product imagery is generated SVG bag art (components/brand/bag.tsx), colored by roast hour.
- Logo: constructed mark (half sun on horizon line) + lowercase serif wordmark. No prior identity existed beyond the text "Morrow".
- Icons: lucide-react (already in repo), one package.
