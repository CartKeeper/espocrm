#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const pkg = require(path.join(rootDir, 'package.json'));

const buildDirName = `EspoCRM-${pkg.version}`;
const sourceDir = path.join(rootDir, 'build', buildDirName);
const distDir = path.join(rootDir, 'dist');

if (!fs.existsSync(sourceDir)) {
    console.error(`Build output directory '${path.relative(rootDir, sourceDir)}' was not found.`);
    process.exit(1);
}

if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, {recursive: true, force: true});
}

fs.cpSync(sourceDir, distDir, {recursive: true});

console.log(`Copied '${path.relative(rootDir, sourceDir)}' to '${path.relative(rootDir, distDir)}'.`);

