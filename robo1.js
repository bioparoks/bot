var TelegramBot = require('node-telegram-bot-api');
var emoji = require('node-emoji').emoji;
var user = require('./helpers/user.js');

var token = '222233302:AAEW3Kok7M5nqLS_i1e1nUIgxsczAm4e7sw';
var bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, function(mes, m){
    var id = mes.chat.id;
    user.checkUser(mes.chat);
    setTimeout(function(){
        user.setCurrentQuestion(id);
        startGame(id);
    }, 50);
});

function startGame(uid){
    bot.sendMessage(uid, '<b>Вы слышите странные звуки вокруг...</b>', {
        parse_mode: 'HTML'
    });

    setTimeout(function(){
        bot.sendMessage(uid, '<b>Какой-то мужик:</b> Наконец-то удалось подключиться, ' +
        'это заняло чуть больше времени, чем я ожидал.', {
            parse_mode: 'HTML'
        });

        setTimeout(function(){
            bot.sendPhoto(uid, './images/glazok.jpg');
            setTimeout(function(){
                bot.sendMessage(uid, '<b>Какой-то мужик:</b> Ты нас видишь? Кивни головой.', {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            [emoji['thumbsup'] + ' Кивнуть головой'],
                            [emoji['thumbsdown'] + ' Покачать головой']
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                });

                user.setCurrentQuestion(uid, 1);
            }, 2000);
        }, 5000);
    }, 6000);
}

bot.onText(/(Кивнуть)|(Покачать)/, function(mes, match){
    var id = mes.chat.id;
    if (user.getCurrentQuestion(id) === 1) {
        if (match[0] == 'Кивнуть') {
            bot.sendMessage(id, '<b>Какой-то мужик:</b> Отлично, тогда можно перейти к настройкам речи', {
                parse_mode: 'HTML'
            });
        } else {
            bot.sendMessage(id, '<b>Какой-то мужик:</b> Ничего не всегда работает странно, нужно время и все нормализуется', {
                parse_mode: 'HTML'
            });
        }
        setTimeout(function(){
            bot.sendMessage(id, '<b>Какой-то мужик:</b> Ладно, подключим это здесь и сделаем пару тестовых команд, вроде так...', {
                parse_mode: 'HTML'
            });
            setTimeout(function(){
                bot.sendMessage(id, '<b>Какой-то мужик:</b> Как тебя зовут?', {
                    parse_mode: 'HTML',
                    reply_markup: {
                        force_reply: true
                    }
                });
                user.setCurrentQuestion(id, 2);
            }, 4000);
        }, 3000);
    }
});

bot.onText(/.*/, function(mes, match){
    var id = mes.chat.id;
    if (user.getCurrentQuestion(id) === 2) {
        bot.sendMessage(id, '<b>Какая-то баба:</b> Тупица, Тони, что это с ним?', {
            parse_mode: 'HTML'
        });
        setTimeout(function(){
            bot.sendMessage(id, '<b>Тони:</b> Странно, ты вроде что-то понятное сказал, но... наверное, перепутал языковой модуль, дай мне минуту', {
                parse_mode: 'HTML'
            });
            setTimeout(function(){
                bot.sendMessage(id, '<b>Тони:</b> Отлично, теперь точно должно работать, попробуем снова, как тебя зовут?', {
                    parse_mode: 'HTML',
                    reply_markup: {
                        force_reply: true
                    }
                });
                user.setCurrentQuestion(id, 3);
            }, 9000);
        }, 3000);
    }
});

bot.onText(/(.*)/, function(mes, match){
    var id = mes.chat.id;

    if (user.getCurrentQuestion(id) === 3) {
        bot.sendMessage(id, '<b>Какая-то баба:</b> Необычное имя для такого как ты… ну да ладно', {
            parse_mode: 'HTML'
        });
        if (match[0]) user.setRoboName(id, match[0]);
        else user.setRoboName(id);
        setTimeout(function(){
            bot.sendMessage(id, '<b>Тони:</b> ' + user.getRoboName(id) + ', тебе наверное не терпится узнать что здесь происходит?', {
                parse_mode: 'HTML',
                reply_markup: {
                    force_reply: true,
                    keyboard: [
                        [emoji['thumbsup'] + ' Да, было бы неплохо узнать'],
                        [emoji['thumbsdown'] + ' Нет, давай ближе к сути']
                    ],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            });
            user.setCurrentQuestion(id, 4);
        }, 3000);
    }
});

bot.onText(/(Да)|(Нет)/, function(mes, match){
    var id = mes.chat.id;
    if (user.getCurrentQuestion(id) === 4) {
        if (match[0] === 'Да') {
            bot.sendMessage(id, '<b>Тони:</b> Отлично, тогда слушай', {
                parse_mode: 'HTML'
            });
        } else {
            bot.sendMessage(id, '<b>Тони:</b> Хорошо, вот, что произошло', {
                parse_mode: 'HTML'
            });
        }

        setTimeout(function(){
            bot.sendMessage(id, '<b>Тони:</b> чуть более 7 лет назад нашу планету посетили чужестранцы, а вернее, чужепланетцы, пришельцы, короче. Один небольшой корабль приземлился на наших берегах.', {
                parse_mode: 'HTML'
            });
            setTimeout(function(){
                bot.sendMessage(id, '<b>Тони:</b> Мы пытались завязать с ними контакт, но тщетно, любые попытки связаться были обречены на провал.', {
                    parse_mode: 'HTML'
                });
                setTimeout(function(){
                    bot.sendMessage(id, '<b>Тони:</b> Провели они у нас около месяца, но потом, так же как и появились, так же внезапно и удалились. Нам не удалось выяснить однозначно ни причин их посещения, ни причины столь скорого отлета с нашей планеты.', {
                        parse_mode: 'HTML'
                    });
                    setTimeout(function(){
                        bot.sendMessage(id, '<b>Тони:</b> Однако спустя год они вернулись..но..', {
                            parse_mode: 'HTML'
                        });
                        setTimeout(function(){
                            bot.sendMessage(id, '<b>Какая-то баба:</b> Соберись, Тони, рассказывай.', {
                                parse_mode: 'HTML'
                            });
                            setTimeout(function(){
                                bot.sendMessage(id, '<b>Тони:</b> Да. Спустя год они вернулись, правда на этот раз это были тысячи кораблей, прилетевших в разные уголки планеты, уничтожающие человечество.', {
                                    parse_mode: 'HTML'
                                });
                                setTimeout(function(){
                                    bot.sendMessage(id, '<b>Тони:</b> Выжило около 1/5 жителей Земли, хотя достоверные цифры нам до сих пор не известны.', {
                                        parse_mode: 'HTML'
                                    });
                                    setTimeout(function(){
                                        bot.sendMessage(id, '<b>Тони:</b> Ты еще следишь за рассказом, не уснул там?', {
                                            parse_mode: 'HTML',
                                            reply_markup: {
                                                force_reply: true,
                                                keyboard: [
                                                    [emoji['thumbsup'] + ' Да, все окей, продолжай'],
                                                    [emoji['thumbsdown'] + ' А покороче никак нельзя?']
                                                ],
                                                one_time_keyboard: true,
                                                resize_keyboard: true
                                            }
                                        });
                                        user.setCurrentQuestion(id, 5);
                                    }, 6000);
                                }, 8000);
                            }, 5000);
                        }, 5000)
                    }, 10000);
                }, 5000);
            }, 7000)
        }, 5000);
    }
});

bot.onText(/(Да)|(никак)/, function(mes, match){
    var id = mes.chat.id;

    if (user.getCurrentQuestion(id) === 5) {
        bot.sendMessage(id, '<b>Тони:</b> Ладно, поехали дальше.', {
            parse_mode: 'HTML'
        });
        setTimeout(function(){
            bot.sendMessage(id, '<b>Тони:</b> Большая часть их кораблей отчалила, но некоторые остались патрулировать нашу планету и уничтожать оставшихся в живых, возможно не только уничтожать.', {
                parse_mode: 'HTML'
            });
            setTimeout(function(){
                bot.sendMessage(id, '<b>Тони:</b> Был организован международный повстанческий штаб борьбы с захватчиками, так как жители Земли не готовы сдаваться. Мы являемся одним из передовых разведывательных отрядов.', {
                    parse_mode: 'HTML'
                });
                setTimeout(function(){
                    bot.sendMessage(id, '<b>Тони:</b> я - инженер, специалист по обслуживанию андроидов и компьютерных технологий, Джейн - лидер команды, стратег, вояка и у нее отвратный характер..', {
                        parse_mode: 'HTML'
                    });
                    setTimeout(function(){
                        bot.sendMessage(id, '<b>Джейн:</b> Давно не отхватывал? Не отвлекайся, инженеришка', {
                            parse_mode: 'HTML'
                        });
                        setTimeout(function(){
                            bot.sendMessage(id, '<b>Тони:</b> Вот видишь..как всегда, еще с нами Чарли - он орудует с любыми видами вооружений покруче Чака Норриса, но сейчас он снаружи ушел за едой.', {
                                parse_mode: 'HTML'
                            });
                            setTimeout(function(){
                                bot.sendMessage(id, '<b>Джейн:</b> Тони, хорош размусоливать, давай ближе к сути.', {
                                    parse_mode: 'HTML'
                                });
                                setTimeout(function(){
                                    bot.sendMessage(id, '<b>Тони:</b> Да, конечно. Нашей текущей миссией являлось добраться до завода сбора человекоподобных андроидов и привлечь в свою команду несколько боевых единиц. но завод оказался разгромлен.', {
                                        parse_mode: 'HTML'
                                    });
                                    setTimeout(function(){
                                        bot.sendMessage(id, '<b>Тони:</b> Только одна секция осталась чудом цела, хотя и здесь были разломаны и роботы и оборудование. Да что там говорить, ты единственный, кто был более менее цел и находился в своем отсеке, хотя и пришлось тебе приделать чужие руки.', {
                                            parse_mode: 'HTML',
                                            reply_markup: {
                                                keyboard: [
                                                    [emoji['thumbsdown'] + ' Погоди-погоди, ты хочешь сказать, что я робот, не человек?'],
                                                    [emoji['thumbsup'] + ' Тогда понятно, почему я так себя ощущаю'],
                                                    ['Хорошо, продолжай']
                                                ],
                                                one_time_keyboard: true,
                                                resize_keyboard: true
                                            }
                                        });
                                        user.setCurrentQuestion(id, 6);
                                    }, 6000)
                                }, 5000);
                            }, 7000);
                        }, 4000);
                    }, 5000);
                }, 7000);
            }, 6000);
        }, 5000);
    }
});

bot.onText(/(робот)|(понятно)|(продолжай)/, function(mes, match){
    var id = mes.chat.id;
    if (user.getCurrentQuestion(id) === 6) {
        if (match[0] === 'робот') {
            bot.sendMessage(id, '<b>Тони:</b> Да, боюсь, что это так, но не беспокойся, скоро твоя система полностью загрузится и конфуз пройдет', {
                parse_mode: 'HTML'
            });
        } else if (match[0] === 'понятно') {
            bot.sendMessage(id, '<b>Тони:</b> Отлично, это существенно упростит нам задачу.', {
                parse_mode: 'HTML'
            });
        } else {
            bot.sendMessage(id, '<b>Тони:</b> Супер, поехали дальше', {
                parse_mode: 'HTML'
            });
        }
        setTimeout(function(){
            bot.sendMessage(id, '<b>Тони:</b> Здесь роботы собирались очень разные, с различными наборами навыков и умений, но все записи уничтожены и мы не знаем к какому типу относишься ты.', {
                parse_mode: 'HTML'
            });
            setTimeout(function(){
                bot.sendMessage(id, '<b>Тони:</b> Нужно сделать тест, который позволит понять с кем мы имеем дело и понять, какого рода миссии нам лучше брать в штабе.', {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['Это не больно?'],
                            ['Что за тест?']
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                });
                user.setCurrentQuestion(id, 7);
            }, 6000);
        }, 5000);
    }
});

bot.onText(/(Это)|(Что)/, function(mes, match){
    var id = mes.chat.id;
    if (user.getCurrentQuestion(id) === 7) {
        if (match[0] == 'Это') {
            bot.sendMessage(id, '<b>Тони:</b> ты же робот, ты не чувствуешь боли.', {
                parse_mode: 'HTML'
            });
        } else {
            bot.sendMessage(id, '<b>Тони:</b> отличный вопрос, я как раз собирался рассказать.', {
                parse_mode: 'HTML'
            });
        }
        setTimeout(function(){
            bot.sendMessage(id, '<b>Тони:</b> Тест из себя представляет набор специально отобранных вопросов, которые позволят выявить твои сильные и слабые стороны, просто отвечай честно и мы выявим твой тип.', {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [
                        ['Отлично, погнали!'],
                        ['Серьезно, вопросы?']
                    ],
                    one_time_keyboard: true,
                    resize_keyboard: true
                }
            });
            user.setCurrentQuestion(id, 8);
        }, 5000);
    }
});

bot.onText(/(погнали)|(вопросы)/, function(mes, match){
    var id = mes.chat.id;
    if (user.getCurrentQuestion(id) === 8) {
        if (match[0] == 'погнали') {
            bot.sendMessage(id, '<b>Тони:</b> Вот это задор!, ты мне уже нравишься.', {
                parse_mode: 'HTML'
            });
        } else {
            bot.sendMessage(id, '<b>Тони:</b> Да, без этого никак, давай начинать.', {
                parse_mode: 'HTML'
            });
        }
        setTimeout(function(){
            bot.sendMessage(id, '<b>Тони:</b> Вопрос 1: Ты идешь по коридору научного объекта, вдруг к тебе бежит человек, похожий на сборщика механизмов: "Робо, я только что закончил свой гиперболический преобразователь молекул, давай внедрим его в твою панель распределения!".', {
                parse_mode: 'HTML'
            });
            setTimeout(function(){
                bot.sendMessage(id, '<b>Тони:</b> Твои действия?', {
                    parse_mode: 'HTML',
                    reply_markup: {
                        force_reply: true,
                        keyboard: [
                            ['"А не пошел бы ты туда...куда только что сказал?!"'],
                            ['"Дружище, это повредит балансу биогенных стержней в распределительном отсеке клапанов при воздействии такого рода преобразователя"'],
                            ['Молча вырубишь его и приволочешь к команде для дальнейших расспросов.']
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                });
                user.setCurrentQuestion(id, 9);
            }, 9000);
        }, 5000);
    }
});

bot.onText(/.*/, function(mes, match){
    var id = mes.chat.id;
    if (user.getCurrentQuestion(id) === 9){
        setTimeout(function(){
            bot.sendMessage(id, '<b>Тони:</b> Вопрос 2: У нас случилась стычка с неприятелем, мы одержали над врагом верх, но одному из нас, например Джейн, оторвало ногу.', {
                parse_mode: 'HTML'
            });
            setTimeout(function(){
                bot.sendMessage(id, '<b>Джейн:</b> ЭЙ!! А, да пофиг.', {
                    parse_mode: 'HTML'
                });
                setTimeout(function(){
                    bot.sendMessage(id, '<b>Тони:</b> Твои действия?', {
                        parse_mode: 'HTML',
                        reply_markup: {
                            force_reply: true,
                            keyboard: [
                                ['Будешь бегать вокруг с криками о помощи.'],
                                ['Быстро найдешь оторванную ногу и холодильник, что бы ее смогли пришить обратно'],
                                ['Сам окажешь первую помощь, перевязав ногу.'],
                                ['Пристрелишь Джейн, что бы не мучилась и не бесила остальных']
                            ],
                            one_time_keyboard: true,
                            resize_keyboard: true
                        }
                    });
                    user.setCurrentQuestion(id, 10);
                }, 7000);
            }, 4000);
        }, 3000);
    }
});

bot.onText(/.*/, function(mes, match){
    var id = mes.chat.id;
    if (user.getCurrentQuestion(id) === 10){
        setTimeout(function(){
            bot.sendMessage(id, '<b>Тони:</b> Вопрос 3: Прогуливаясь по улице и пиная от скуки консервную банку, ты вдруг замечаешь, что где-то издалека к тебе на большой скорости приближается корабль пришельцев.', {
                parse_mode: 'HTML'
            });
            setTimeout(function(){
                bot.sendMessage(id, '<b>Тони:</b> Твои действия?', {
                    parse_mode: 'HTML',
                    reply_markup: {
                        force_reply: true,
                        keyboard: [
                            ['Побежишь, что есть сил'],
                            ['Спрячешься в каком-то укрытии'],
                            ['Начнешь орать и материться на пришельцев'],
                            ['Используя подручное оружие, начнешь атаковать']
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                });
                user.setCurrentQuestion(id, 11);
            }, 7000);
        }, 3000);
    }
});

bot.onText(/.*/, function(mes, match){
    var id = mes.chat.id;
    if (user.getCurrentQuestion(id) === 11){
        bot.sendMessage(id, '<b>Тони:</b> вот и все, было несложно, ведь так?', {
            parse_mode: 'HTML',
            reply_markup: {
                force_reply: true,
                keyboard: [
                    [emoji['thumbsup'] + ' пара пустяков'],
                    [emoji['thumbsdown'] + ' прикалываешься? это было то еще испытание']
                ],
                one_time_keyboard: true,
                resize_keyboard: true
            }
        });
        user.setCurrentQuestion(id, 12);
    }
});

bot.onText(/.*/, function(mes, match){
    var id = mes.chat.id;
    if (user.getCurrentQuestion(id) === 12) {
        bot.sendMessage(id, '<b>Джейн:</b> давай сюда результаты, отправлю их в штаб, пора нам определиться со следующими задачами.', {
            parse_mode: 'HTML'
        });
        setTimeout(function(){
            bot.sendMessage(id, '<b>Чарли:</b> Тони, ты все-таки смог "оживить" эту железяку?', {
                parse_mode: 'HTML'
            });
            setTimeout(function(){
                bot.sendMessage(id, '<b>Тони:</b> ' + user.getRoboName(id) + ', это Чарли, наш последний член отряда, знакомься.', {
                    parse_mode: 'HTML',
                    reply_markup: {
                        force_reply: true,
                        keyboard: [
                            ['Привет, Чарли.'],
                            ['Сам ты железяка, гуманоид херов']
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                });
                user.setCurrentQuestion(id, 13);
            }, 4000);
        }, 7000);
    }
});

bot.onText(/.*/, function(mes, match){
    var id = mes.chat.id;

    if (user.getCurrentQuestion(id) === 13) {
        bot.sendMessage(id, '<b>Джейн:</b> Все заткнулись. Мы получили ответ из штаба, сейчас собираемся и отдыхаем, наше задание начинается завтра утром.', {
            parse_mode: 'HTML'
        });

        setTimeout(function(){
            bot.sendMessage(id, '<b>Миссия: Утренний переполох</b>\nПродолжение следует..', {
                parse_mode: 'HTML'
            });
        }, 5000);

    }
});