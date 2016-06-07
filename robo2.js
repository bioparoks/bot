var TelegramBot = require('node-telegram-bot-api');

var user = require('./helpers/user');
var messagingModule = require('./helpers/messages');

var token = '222233302:AAEW3Kok7M5nqLS_i1e1nUIgxsczAm4e7sw';
var bot = new TelegramBot(token, {polling: true});

var request = require('request');

bot.onText(/.*/, function(mes, match){
    var input = match[0];
    var id = mes.chat.id;
    if (/\/start/.test(input)) {
        user.setUser(mes.chat, function(userExists){
            if (!userExists) {
                user.setMission(id, 'prolog');
                user.setQuestion(id, 0);
            }
        });
    }

    if (/\/emoji/.test(input)){
        request('https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json', function(err, response, body){
            if (err) throw err;
            if (!err && response.statusCode == 200) {
                var ems = JSON.parse(body);
                for (var em in ems) {
                    bot.sendMessage(id, em + ': ' + ems[em]);
                }
            }
        });
    }

    if (!user.getCurrentUser(id)) bot.sendMessage(id, 'Please, use /start');
    else messagingModule.dialogBuilder(bot, id, input);
    
});