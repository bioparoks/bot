var emoji = require('node-emoji').emoji;
var user = require('./user');

function parseCurlyBrackets(id, str){
    if (/{{.*}}/.test(str)) {
        str.match(/{{[^{]+}}/g).forEach(function(el){
            var match = /{{(.*):(.*)}}/.exec(el);
            var ind, output;
            ind = str.indexOf(match[0]);
            if (match[1].toLowerCase() === 'emoji') {
                output = [str.slice(0, ind), emoji[match[2]], str.slice(ind)].join('');
            } else if (match[1].toLowerCase() === 'user') {
                output = [str.slice(0, ind), user.getUserAttribute(id, match[2]), str.slice(ind)].join('');
            }
            str = output.replace(match[0], '');
        });
    }
    return str;
}

module.exports = {
    parseCurlyBrackets: parseCurlyBrackets    
};