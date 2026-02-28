import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const imagesDir = path.join(root, 'public', 'images');
const sourceDirs = ['app', 'components', 'lib'];
const validExt = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs']);

function walk(dir, files = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(full, files);
        } else {
            files.push(full);
        }
    }
    return files;
}

const imageFiles = fs
    .readdirSync(imagesDir)
    .filter((name) => fs.statSync(path.join(imagesDir, name)).isFile())
    .sort();

const imageSrcs = new Set(imageFiles.map((name) => `/images/${name}`));

const found = new Set();
const re = /\/images\/[A-Za-z0-9._-]+/g;

for (const dir of sourceDirs) {
    const absDir = path.join(root, dir);
    if (!fs.existsSync(absDir)) continue;

    for (const file of walk(absDir)) {
        if (!validExt.has(path.extname(file))) continue;
        const content = fs.readFileSync(file, 'utf8');
        const matches = content.match(re) || [];
        for (const match of matches) found.add(match);
    }
}

const missing = [...imageSrcs].filter((src) => !found.has(src));
const unknownRefs = [...found].filter((src) => !imageSrcs.has(src)).sort();

if (missing.length) {
    console.error('Missing image references (not found in app/components/lib):');
    for (const src of missing) console.error(` - ${src}`);
    process.exit(1);
}

console.log(`Image coverage OK: ${imageSrcs.size} / ${imageSrcs.size} files referenced.`);

if (unknownRefs.length) {
    console.warn('Unknown image references found:');
    for (const src of unknownRefs) console.warn(` - ${src}`);
}
