const fs = require('fs');
const zipdir = require('zip-dir');
const package = require('./addon/addon.json');
const path = `build/yandex-sdk-${package.version}.c3addon`;
const hrstart = process.hrtime();

if (!fs.existsSync('build')) {
    fs.mkdirSync('build');
}

zipdir('addon', { saveTo: path }, () => {
    const [, timeEnd] = process.hrtime(hrstart);
    console.log('Successful build:', path);
    console.info('Execution time: %ds', (timeEnd / 1000000000).toFixed(2));
});
