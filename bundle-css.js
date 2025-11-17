import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import cssnano from 'cssnano';

const dir = process.argv[2];

if (!dir) {
    console.error('Usage: node bundle-css.js <css-directory>');
    process.exit(1);
}

if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    process.exit(1);
}

const files = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.css'))
    .map((file) => path.join(dir, file));

if (files.length === 0) {
    console.error(`No CSS files found in: ${dir}`);
    process.exit(1);
}

console.log(`Bundling ${files.length} CSS files from ${dir}...`);

const combined = files.map((f) => fs.readFileSync(f, 'utf8')).join('\n');

postcss([cssnano({ preset: 'default' })])
    .process(combined, { from: undefined })
    .then((result) => {
        fs.writeFileSync('bundle.css', result.css);
        console.log('✓ Created bundle.css');
    })
    .catch((err) => {
        console.error('Error processing CSS:', err);
        process.exit(1);
    });
