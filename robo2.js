var TelegramBot = require('node-telegram-bot-api');

var user = require('./helpers/user');
var messagingModule = require('./helpers/messages');

var token = '222233302:AAEW3Kok7M5nqLS_i1e1nUIgxsczAm4e7sw';
var bot = new TelegramBot(token, {polling: true});

var request = require('request');

bot.onText(/\/start/, function(mes, match){
    var input = match[0];
    var id = mes.chat.id;

    user.setUser(mes.chat, function(userExists){
        if (!userExists) {
            user.setMission(id, 'prolog');
        }
        user.setQuestion(id, 0);
        messagingModule.dialogBuilder(bot, id, input);
    });

});

bot.onText(/.*/, function(mes, match){
    var input = match[0];
    var id = mes.chat.id;

    if (!/\/start/.test(input)) {
        if (user.getCurrentUser(id) && user.getQuestion(id) !== 0) {
            if (user.getTyping(id)) {
                messagingModule.dialogBuilder(bot, id, input);
            }
        } else {
            bot.sendMessage(id, 'Используй /start');
        }
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


    // https://core.telegram.org/bots/api#inlinekeyboardbutton
    //bot.sendMessage(id, '<b>Some text here</b>', {
    //    parse_mode: 'HTML',
    //    reply_markup: {
    //        inline_keyboard: [
    //            [
    //                {
    //                    text: 'Click me and watch at the TOP',
    //                    callback_data: '/start'
    //                    // callback_data OR url parameters are required
    //                    // at least one of them
    //                }
    //            ],
    //            [
    //                {
    //                    text: 'Some text on the button sndkjas',
    //                    callback_data: '/start'
    //                }
    //            ],
    //            [
    //                {
    //                    text: 'This is URL example',
    //                    url: 'http://vk.com/'
    //                }
    //            ]
    //        ]
    //    }
    //});

});

bot.on('callback_query', function(callbackQuery){
    console.log(callbackQuery);
    console.log(callbackQuery.message.entities[0]);

    bot.sendChatAction(callbackQuery.message.chat.id, 'typing');

    bot.answerCallbackQuery(callbackQuery.id, 'Button was clicked, yeah!', true);
    // Last parameter - showing device alert (true)
    // or keep Telegram's one (false)
});

// TODO: check if needed
// https://www.npmjs.com/package/monkey-patches-node-telegram-bot-api