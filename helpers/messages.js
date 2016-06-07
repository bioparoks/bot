var async = require('async');
var user = require('./user');
var formatting = require('./text-helpers');

function messageConstructor(bot, id, messageBlock, input, answer) {
    if (Array.isArray(messageBlock)) {
        messageBlock = messageBlock.filter(function(mes){
            return (new RegExp(mes.pattern)).test(input);
        })[0];
    }

    var type = messageBlock.type,
        text = messageBlock.text,
        speaker = messageBlock.speaker,
        pattern = messageBlock.pattern,
        image = messageBlock.image,
        caption = messageBlock.caption,
        delay = messageBlock.delay * 1000; // converting to MS from SEC

    if((new RegExp('как тебя зовут?')).test(text)) {
        user.setRoboName(id, input);
    }

    if (text){
        if (speaker !== null) {
            var speakerTxt;
            // TODO: вынести строки в отдельный файл
            switch (speaker){
                case 'tony':
                    speakerTxt = '<b>{{emoji:construction_worker}}Тони</b>: ';
                    break;
                case 'jane':
                    speakerTxt = '<b>{{emoji:woman}}Джейн</b>: ';
                    break;
                case 'charlie':
                    speakerTxt = '<b>{{emoji:cop}}Чарли</b>: ';
                    break;
                default:
                    speakerTxt = '<b>{{emoji:bust_in_silhouette}}Неизвестный</b>: ';
            }

            text = speakerTxt + text;
        }
        text = formatting.parseCurlyBrackets(id, text);
    }

    if (!answer) {
        if (type === 'text') {
            bot.sendMessage(id, text, {parse_mode: 'HTML'});
        } else if (type === 'photo') {
            bot.sendPhoto(id, image, {caption: formatting.parseCurlyBrackets(id, caption)});
        }
    } else {
        if (type === 'text') {
            if (answer.choices !== null) {
                var answers = [];
                answer.choices.forEach(function(choice){
                    answers.push([formatting.parseCurlyBrackets(id, choice)]);
                });
                bot.sendMessage(id, text, {parse_mode: 'HTML',
                    reply_markup: {
                        force_reply: answer.params.force_reply,
                        keyboard: answers,
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                });
            } else {
                bot.sendMessage(id, text, {parse_mode: 'HTML',
                    reply_markup: {
                        force_reply: answer.params.force_reply
                    }
                });
            }
        }
    }

    return delay;
}

function dialogBuilder(bot, id, input) {
    var curMes = 0,
        mesAmount = user.getMission(id)[user.getQuestion(id)]['lines'].length;
    async.whilst(
        function(){return curMes < mesAmount},
        function(callback){
            var isLast = curMes === mesAmount - 1;
            var message = user.getMission(id)[user.getQuestion(id)]['lines'][curMes++];
            var answer = user.getMission(id)[user.getQuestion(id)]['answer'];
            var delay = messageConstructor(bot, id, message, input, (isLast) ? answer : false);
            setTimeout(function(){ callback(null, curMes) }, delay);
        },
        function(err, n){
            user.setQuestion(id, user.getQuestion(id) + 1);
        }
    );
}

module.exports = {
    messageConstructor: messageConstructor,
    dialogBuilder: dialogBuilder
};