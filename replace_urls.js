const fs = require('fs');
const path = require('path');

const OLD_URL = 'https://campusmarketdeploy.onrender.com';
const NEW_URL = 'https://campusmarketdeploy.onrender.com';

const ignoreDirs = ['node_modules', '.git', 'dist', 'build', '.angular', '.expo'];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!ignoreDirs.some(ignore => file.includes(ignore))) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.endsWith('.ts') || file.endsWith('.html') || file.endsWith('.js')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(process.cwd());
let replacedCount = 0;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        if (content.includes(OLD_URL)) {
            // Replace all occurrences
            let newContent = content.split(OLD_URL).join(NEW_URL);
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Replaced in: ${file}`);
            replacedCount++;
        }
    } catch (e) {
        console.error(`Error reading/writing ${file}`, e.message);
    }
});

console.log(`Done. Replaced in ${replacedCount} files.`);
