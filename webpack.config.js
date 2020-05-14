const path = require('path');

module.exports = {
    entry: './c2runtime/runtime.js',
    output: {
        path: path.resolve(__dirname, 'addon/c2runtime'),
        filename: 'runtime.js'
    }
};
