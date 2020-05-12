const fs = require('fs');
const data = require('./addon/lang/en-US.json');

const plugin = data.text.plugins.eponesh_yandexsdk;
const docs = [];

docs.push({
    type: 'h1',
    value: plugin.name
});
docs.push({ type:'br' });
docs.push({
    type: 'none',
    value: plugin.description
});
docs.push({ type:'br' });

docs.push({
    type: 'tip',
    value: 'Uses DOM objects, such as window and document! You need to turn off "Use Worker" in project settings.'
});

docs.push({ type:'br' });

Object.values(plugin.properties).forEach((param) => {
    docs.push({
        type: 'b',
        value: `Param: ${param.name}`
    });
    docs.push({
        type: 'i',
        value: `(${param.desc})`
    });
    docs.push({ type:'br' });
});

function generateCategory (name, category) {
    docs.push({
        type: 'h2',
        value: name
    });
    docs.push({ type:'br' });
    Object.values(category).forEach((item) => {
        docs.push({
            type: 'h3',
            value: item['list-name'] || item['translated-name']
        });
        docs.push({ type:'br' });
    
        if (item.params) {
            Object.values(item.params).forEach((param) => {
                docs.push({
                    ignoreBB: true,
                    type: 'b',
                    value: `Param: ${param.name}`
                });
                docs.push({
                    ignoreBB: true,
                    type: 'i',
                    value: `(${param.desc})`
                });
                docs.push({ ignoreBB: true, type:'br' });
            });
        }

        docs.push({
            ignoreBB: name === 'Expressions',
            type:'none',
            value: item.description
        });

        docs.push({
            ignoreBB: name === 'Expressions',
            type:'br'
        });
    });
}

generateCategory('Actions', plugin.actions);
generateCategory('Conditions', plugin.conditions);
generateCategory('Expressions', plugin.expressions);

const bbMap = {
    none: v => v,
    br: _ => '\n',
    h1: v => `[h1]${v}[/h1]`,
    h2: v => `[h2]${v}[/h2]`,
    h3: v => `[h3]${v}[/h3]`,
    b: v => `[b]${v}[/b]`,
    i: v => `[i]${v}[/i]`,
    s: v => `[s]${v}[/s]`,
    tip: v => `[tip]${v}[/tip]`,
};

const mkMap = {
    none: v => v,
    br: _ => '\n\n',
    h1: v => `# ${v}`,
    h2: v => `## ${v}`,
    h3: v => `### ${v}`,
    b: v => ` **${v}** `,
    i: v => ` *${v}* `,
    s: v => ` ~~${v}~~ `,
    tip: v => ` > ${v}`,
};

const bbCode = docs.filter(r => !r.ignoreBB).reduce((text, row) => `${text}${bbMap[row.type](row.value)}`, '');
fs.writeFile('docs.bb', bbCode, function (err) {
    if (err) return console.log(err);
    console.log('docs.bb generated.');
});

const mkCode = docs.reduce((text, row) => `${text}${mkMap[row.type](row.value)}`, '');
fs.writeFile('docs.md', mkCode, function (err) {
    if (err) return console.log(err);
    console.log('docs.md generated.');
});
