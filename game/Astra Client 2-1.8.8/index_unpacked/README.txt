index.html (EaglercraftX offline client) split apart:
TO RUN: python serve.py  (serves this folder on localhost:8000 and opens index.html)
index.html + assets.epw = runnable copy of the original page
NOTE: edits to src/, epw/, assets_out/ do NOT change index.html (it uses the original binaries).
src/00_launch_opts.js
src/01_loader_bootstrap.js
src/02_assets_loader_and_boot.js
src/03_other.js
src/04_other.js
src/03_other.pretty.js   (beautified)
epw/loader.pretty.js   (beautified)
epw/component_1.pretty.js   (beautified)
epw/header.bin  raw header table
epw/info.txt  header strings
epw/splash.png  (30775 bytes)
epw/image_1.png  (1104 bytes)
epw/image_2.png  (3916 bytes)
epw/image_3.png  (1258 bytes)
epw/loader.js  (10213 bytes)
epw/loader.wasm  (30167 bytes)
epw/component_0.html  (xz 236780 -> 326619 bytes)
epw/component_1.js  (xz 30120 -> 111653 bytes)
epw/component_2.wasm  (xz 2412372 -> 15336070 bytes)
epw/component_3.teavmdbg  (xz 798468 -> 5707982 bytes)
epw/component_4.wasm  (xz 15608 -> 37418 bytes)
assets_out/  assets.epk unpacked (5061 files)
lang_out/  lang.tmp.epk unpacked (74 files)
NOTE: WASM-GC build. The largest component_N.wasm is the compiled client; component_N.teavmdbg is its TeaVM debug-info (names).
NOTE: compiled TeaVM output cannot be turned back into Java source.
Source: https://gitlab.com/lax1dude/eaglercraftx-1.8/
