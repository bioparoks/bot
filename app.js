var TelegramBot = require('node-telegram-bot-api');
var emoji = require('node-emoji').emoji;
var cheerio = require('cheerio');


var user = require('./helpers/user.js');
var text = require('./helpers/texts.js');
var story = require('./helpers/stories.js');

var token = '222233302:AAEW3Kok7M5nqLS_i1e1nUIgxsczAm4e7sw';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});

/*bot.on('message', function(message){
    var chatId = message.chat.id;
    var text = user.checkUser(message.chat);
    bot.sendMessage(chatId, text);
});*/

bot.on('message', function(mes){
    console.dir(mes.chat.id);
});

bot.onText(/\/echo (.+)/, function(message, match) {
    var id = message.chat.id;
    bot.sendMessage(id, match[1]);
});

bot.onText(text.patterns.hello, function(mes, match){
    var id = mes.chat.id;
    if (user.checkUser(mes.chat)) {
        bot.sendMessage(id, mes.chat['first_name'] + ', ' +
        'мы же уже здоровались, кончай с этим. (' + match[0] + ')\n' +
        'Сказал же, используй: /commands');
    } else {
        bot.sendMessage(id, 'Приветствую тебя человек! (' + match[0] + ')\n Скажи это снова!');
    }
});

bot.onText(/\/commands/i, function(mes, match){
    var id = mes.chat.id;
    bot.sendMessage(id,
        'Список комманд: \n' +
        '/echo "слово" - выведет слово\n' +
        '/getusers - кол-во пользователей бота\n' +
        '/story - подтянуть рендомную задачу'
    );
});

bot.onText(/\/getusers/i, function(mes, match){
    var id = mes.chat.id;
    bot.sendMessage(id, user.getUsersCount() + ' - столько пользователей исользуют бота')
});

bot.onText(/\/story/i, function(mes, match){
    var id = mes.chat.id;
    story.getStory(function(mes, img, q){
        bot.sendMessage(id, mes, {
            parse_mode: 'HTML'
        });
        bot.sendPhoto(id, img.url, {
            caption: img.caption
        });

        setTimeout(function(){
            bot.sendMessage(id, q, {
                reply_markup: {
                    force_reply: true
                }
            })
        }, 3000);
    });
});