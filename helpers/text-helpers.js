var emoji = require('node-emoji').emoji;
var user = require('./user');

function parseCharacter(name, reparse){
    var output;
    switch (name){
        case 'jane':
            output = '{{emoji:woman}}Джейн';
            break;
        case 'tony':
            output = '{{emoji:construction_worker}}Тони';
            break;
        case 'charlie':
            output = '{{emoji:cop}}Чарли';
            break;
        default:
            output = '{{emoji:bust_in_silhouette}}Неизвестный';
    }
    return parseCurlyBrackets(null, output);
}

function parseCurlyBrackets(id, str){
    if (/{{.*}}/.test(str)) {
        str.match(/{{[^{]+}}/g).forEach(function(el){
            var match = /{{(.*):(.*)}}/.exec(el);
            var ind, output;
            var category = match[1].toLowerCase();
            ind = str.indexOf(match[0]);
            if (category === 'emoji') {
                output = [str.slice(0, ind), emoji[match[2]], str.slice(ind)].join('');
            } else if (category === 'user') {
                output = [str.slice(0, ind), user.getUserAttribute(id, match[2]), str.slice(ind)].join('');
            } else if (category === 'char') {
                output = [str.slice(0, ind), parseCharacter(match[2], true), str.slice(ind)].join('');
            }
            str = output.replace(match[0], '');
        });
    }
    return str;
}

module.exports = {
    parseCurlyBrackets: parseCurlyBrackets,
    parseCharacter: parseCharacter
};