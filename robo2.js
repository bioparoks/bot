var TelegramBot = require('node-telegram-bot-api');
var emoji = require('node-emoji').emoji;
var async = require('async');

var user = require('./helpers/user.js');

var token = '222233302:AAEW3Kok7M5nqLS_i1e1nUIgxsczAm4e7sw';
var bot = new TelegramBot(token, {polling: true});



//console.log(getMission(id)[0]['answer']);

bot.onText(/.*/, function(mes, match){
    var input = match[0];
    var id = mes.chat.id;
    if (/\/start/.test(input)) {
        user.setUser(mes.chat, function(userExists){
            if (!userExists) {
                user.setMission(id, 'prolog');
                user.setQuestion(id, 0);
            }
            //console.log(user.getMission(id)[0]['answer']);
        });
    }


    //TEMP part
    function messageConstructor(messageBlock) {
        var speaker, text, image, caption, delay, pattern;

        type = messageBlock.type;
        text = messageBlock.text;
        speaker = messageBlock.speaker;
        pattern = messageBlock.pattern;
        image = messageBlock.image;
        caption = messageBlock.caption;
        delay = messageBlock.delay;

        if (type === 'text'){
            if (speaker !== null) {
                text = 'TODO: speaker' + text;
            }

            text = parseCurlyBrackets(id, text);
            bot.sendMessage(id, text, { parse_mode: 'HTML' });
        } else if (type === 'photo') {
            bot.sendPhoto(id, image, {caption: caption});
        }

        return delay;
    }
    //messageConstructor(user.getMission(id)[0]['lines'][0]);

    var a = 0, b = user.getMission(id)[0]['lines'].length;
    async.whilst(
        function(){return a < b},
        function(callback){
            var delay = messageConstructor(user.getMission(id)[0]['lines'][a++]);
            setTimeout(function(){ callback(null, a) }, delay);
        },
        function(err, n){
            console.log(err, n, 'Finished')
        }
    );


    //console.log(tempMessage);
});

// TODO: Take it to the helpers file, as module
function parseCurlyBrackets(id, str){
    if (/{{.*}}/.test(str)) {
        var arr = str.match(/{{[^{]+}}/g);
        arr.forEach(function(el){
            var rx = /{{(.*):(.*)}}/.exec(el);
            var ind, output;
            ind = str.indexOf(rx[0]);
            if (rx[1].toLowerCase() === 'emoji') {
                output = [str.slice(0, ind), emoji[rx[2]], str.slice(ind)].join('');
            } else if (rx[1].toLowerCase() === 'user') {
                console.log(rx[0], rx[1], rx[2]);
                output = [str.slice(0, ind), user.getUserAttribute(id, rx[2]), str.slice(ind)].join('');
                console.log(str.slice(0, ind), user.getUserAttribute(id, rx[2]), str.slice(ind));
            }
            str = output.replace(rx[0], '');
        });
    }
    return str;
}
