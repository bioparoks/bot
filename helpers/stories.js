var request = require('request');

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getStory(callback) {

    request('http://appsandstartups.com/bot/varnike.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var stories = JSON.parse(response.body);
            var oneStory = stories[getRandomArbitrary(0, stories.length)];

            var message = '<b>' + oneStory.title + '</b> \n \n';
            message += oneStory.content;

            var img = {
                url: oneStory.image,
                caption: oneStory.title
            };

            img.url = './images/' + img.url.substring(img.url.lastIndexOf('/') + 1, img.url.length);

            if (callback) callback(message, img, oneStory.question);
        }
    });
}

module.exports = {
    getStory: getStory
};