---
name: vdl-visual-asset-prompt
description: Use in the Vibe Design Lab repo when turning vague visual intent into a restrained generation-ready prompt spec for images, illustrations, heroes, thumbnails, diagrams, 3D objects, abstract backgrounds, icons, menu illustration series, or "/visual-asset" style requests. Start from the canonical Claude visual-asset-prompt source, lock an Asset Template first, FORMAT as ratio, composition, background, object scale, crop, margins, and asset type, then choose 1 to 2 LOOK keywords, and keep SUBJECT as the only variable for series. Target the Codex built-in image model (gpt-image 2.0 / latest), preserve user constraints, run independent steps in parallel, run the deterministic derive engine for negatives, and route to the appropriate VDL generation or implementation skill. Do not directly generate images mid-spec from this skill.
---

# VDL Visual Asset Prompt

Use this skill to convert loose visual direction into a validated prompt spec. The canonical source is `.claude/skills/visual-asset-prompt`; do not duplicate its taxonomy, compatibility data, or negative prompt logic.

## Core Model

Fill an Asset Template before writing style language:

```text
FORMAT  ratio, composition, background, object scale, crop, margin, asset type
LOOK    medium, line, tone, color rule, usually 1 to 2 taxonomy keywords
SUBJECT the only variable in a series
```

Order matters. Lock FORMAT first because it controls whether the image is usable in the product surface. Dial LOOK second. Change SUBJECT last. For a series, freeze FORMAT and LOOK, create or choose a master only after the first seed image, then iterate SUBJECT with the same template and reference strategy. If the user asks for a fair test or a fresh run, do not use previous generated images as references.

Run independent work in parallel. Whenever steps do not depend on each other's results, batch them in one turn instead of serially: read the required reference files together, and after a series master is accepted, generate the remaining SUBJECT variations in parallel under the frozen template and reference. Keep only genuinely ordered steps serial: master before its derivatives, and a derive rerun after a keyword change.

## Required Reads

- Read `.claude/skills/visual-asset-prompt/SKILL.md` for the full source workflow.
- Read `.claude/skills/visual-asset-prompt/references/model-profiles.md` before writing the final positive prompt. Use Profile B (GPT image) only. Ignore Profile A (Nano Banana); this Codex skill does not target Nano Banana.
- Read `.claude/skills/visual-asset-prompt/references/index.md` before choosing taxonomy keywords.
- Read `.claude/skills/visual-asset-prompt/references/intent-frame.md` when mapping vague intent into the 7-axis frame.
- Read `.claude/skills/visual-asset-prompt/references/validation-rules.md` when keyword count, style count, or conflicts are unclear.
- Inspect `.claude/skills/visual-asset-prompt/ssot/dictionary.json` only for selected keyword details such as prompt fragments, compatibility, incompatibility, and implementation target.

If the Claude source folder is missing, stop and tell the user this Codex skill depends on that local source path.

## Workflow

1. Target the Codex built-in image generator. This skill always targets the Codex built-in image model (gpt-image 2.0, or the latest image model available in this Codex environment). Do not target Nano Banana and do not depend on the `detect-env.mjs` generator scan, `GEMINI_API_KEY`, or the `nano-gen.mjs` runner. There is no generator choice to make here; write every prompt in the GPT image profile (Profile B). If the user explicitly names a different external tool, write an external-tool prompt spec for it and do not generate.

2. Clarify only what is missing. Ask at most two questions, focused on:

- Subject: main object, message, product or brand context, required labels or text.
- FORMAT: viewpoint, focal point, whitespace or full bleed, single object versus scene, use case, ratio, background, crop, and object scale.

If subject and composition are already clear, continue without questions. Do not invent user-specific content.

3. Lock explicit user constraints. If the user gives background, color, medium, ratio, style, dark mode, light mode, no margin, full bleed, or seed purpose, treat those as fixed. Do not optimize them away.

4. Build FORMAT before selecting LOOK:

- Asset type: isolated object, scene, pattern, diagram, hero, thumbnail, icon, spot illustration.
- Background: none, flat color, texture, full scene, dark mode, light mode.
- Ratio: 1:1, 4:5, 4:3, 16:9, or user specified.
- Composition: centered, rule of thirds, tight crop, full bleed, grid based, or other concrete framing.
- Object scale: approximate frame occupancy.
- Crop and margin: whole object, tight crop, generous margin, no internal margin, full bleed.

5. Map the request through the 7-axis frame only as needed. Fill Rendering, Perspective, and Color by default. Fill Texture, Composition, Subject, and Mood only when they improve the result.

6. Choose taxonomy keywords from `references/index.md` with restraint:

- Pick 1 main style, or at most 2 if they are not fighting.
- Treat FORMAT as concrete fields, not as more style keywords.
- Use LOOK keywords only for medium or style, line, tone, and color behavior.
- Avoid piling on corrective keywords after the template is already coherent.

7. Run the derive engine with the selected LOOK keywords, user subject, and complexity:

```bash
node .claude/skills/visual-asset-prompt/scripts/derive.mjs '["Risograph"]' "article and course thumbnail" medium
```

Use the returned `negative` as the source of truth for exclusions. Treat `violations` as required review input: reduce or replace keywords, then rerun the command until the spec is coherent. Do not manually calculate incompatibility sets.

8. Write the positive prompt in the GPT image profile (Profile B):

- Use the 5-slot structure: scene or background, subject, key details, use case, constraints. Always include the constraints slot, since the model fills it arbitrarily when omitted.
- GPT image reads the prompt literally, so detail is fine, but fill it with concrete visual facts, not praise words. Do not output a comma-separated keyword stack. Avoid terms such as stunning, epic, masterpiece, 8k, ultra-detailed, or trending.
- Include the purpose and product surface, such as "for a course card thumbnail" or "for a SaaS dark-mode feature tile".
- For no-margin or thumbnail requests, state full bleed and no internal white border in the positive prompt, then add frame, border, poster margin, white mat, and large empty padding to the constraints slot.

9. For series, freeze FORMAT and LOOK, then vary SUBJECT only. Use references only after the first newly generated master is accepted, unless the user asks for a fair no-reference test.

10. Route the result instead of generating mid-spec:

- Raster image: the Codex built-in image generator (gpt-image 2.0 / latest). Generate here once the spec is approved; do not route raster to Nano Banana.
- Isometric SVG: `vdl-isometric-illustration`
- Bitmap to isometric SVG: `vdl-bitmap-to-iso`
- Presentation illustration: `vdl-presentation-illustration`
- Open Graph image: `vdl-og-optimized` or `vdl-og-brand`

If the user then asks to generate a raster image, call the Codex built-in image generator with the final prompt. For the SVG and Open Graph routes, invoke the listed skill and follow its approval rules. When generating a series, run the independent SUBJECT variations in parallel.

## Output Format

Use the user's language unless they ask otherwise.

```markdown
## Intent Summary
One sentence.

## Subject
The subject in the user's own terms.

## Asset Template
- FORMAT: asset type / background / ratio / composition / object scale / crop / margin behavior. Mark locked fields.
- LOOK: selected medium or style keywords / line and tone / color rule.
- SUBJECT: one subject or the full series list.

## 7-Axis Frame
Only the filled axes.

## Selected Keywords
Mark the main style and each keyword role. Add one restraint note about what was intentionally omitted.

## Final Prompt
The positive prompt written in the GPT image profile (5-slot).

## Negative Prompt
The derive engine's negative list, shortened only when the target profile requires concise inline constraints.

## Output Route
Target medium and the VDL skill to use next.
```

## Guardrails

- Prioritize FORMAT and purpose before style.
- Do not fill every axis just because a keyword exists.
- Do not use previous outputs as references when the task requests a fresh or fair test.
- Do not use this skill to create or edit raster images directly.
- Do not hardcode or expose API keys. Generation skills must read keys from environment variables.
- Do not use the em dash character U+2014 in generated files, prompts, comments, or user-facing copy.
