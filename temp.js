function cleanXml(xml) {
    return xml.replace('\ufeff', '');
}

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/*
 function getStory(callback) {
 request('http://rss.nytimes.com/services/xml/rss/nyt/InternationalHome.xml', function (error, response, body) {
 if (!error && response.statusCode == 200) {
 parser.parseString(cleanXml(response.body), function (err, result) {
 var news = result['rss']['channel'][0]['item'];
 var oneNews = news[getRandomArbitrary(0, news.length)];

 var message = '<a href="' + encodeURI(oneNews.link[0]) + '">';
 message += oneNews.title[0];
 message += '</a> \n';
 message += oneNews.description[0];

 console.log(message)

 if (callback) callback(message);
 });
 }
 });
 }
 */


function getStory(callback) {

    request('http://appsandstartups.com/bot/varnike.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var stories = JSON.parse(response.body);
            var oneStory = stories[getRandomArbitrary(0, stories.length)];

            var message = '<b>' + oneStory.title + '</b> \n \n';
            message += oneStory.content;

            if (callback) callback(message, oneStory.image, oneStory.question);
        }
    });
}

// Matches /echo [whatever]
//bot.onText(/\/echo (.+)/, function (msg, match) {
//    var fromId = msg.from.id;
//    var resp = match[1];
//    bot.sendMessage(fromId, resp);
//});

// Any kind of message
/*bot.on('message', function (msg) {
 var chatId = msg.chat.id;
 // photo can be: a file path, a stream or a Telegram file_id
 var photo = 'cats.png';
 bot.sendPhoto(chatId, photo, {caption: 'Lovely kittens'});
 });*/

bot.on('message', function (message) {
    var chatId = message.chat.id;

    /*bot.sendMessage(chatId, '<a href="http://google.com/search?q=' + encodeURI(message.text) + '">' + message.text +'</a>', {
     parse_mode: 'HTML',
     disable_web_page_preview: true,
     reply_markup: {
     keyboard: [
     [emoji['thumbsup'] + ' YES', emoji['thumbsdown'] + ' NO'],
     [new Date(message.date * 1000)]
     ],
     one_time_keyboard: true,
     resize_keyboard: true
     }
     });

     bot.sendMessage(chatId, 'Want to answer this question?', {
     reply_markup: {
     force_reply: true
     }
     });*/

    if (/привет/ig.test(message.text) || /хай/ig.test(message.text)) {
        bot.sendMessage(chatId, 'Здарова, братан!');
    } else {
        getStory(function(mes, img, q){
            bot.sendMessage(chatId, mes, {
                parse_mode: 'HTML',
                disable_web_page_preview: true
            });

            img = preFolder + img.substring(img.lastIndexOf('/') + 1, img.length);

            bot.sendPhoto(chatId, img);

            setTimeout(function(){
                bot.sendMessage(chatId, q, {
                    reply_markup: {
                        keyboard: [
                            ['Ответить']
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                });
            }, 2000);

            /*downloadImages(img, function(localImg){
             console.log(localImg);
             });*/
        });

        if (/ответить/ig.test(message.text)) {
            bot.sendMessage(chatId, 'Почему?', {
                reply_markup: {
                    force_reply: true
                }
            })
        }

    }

    console.log(message);
});