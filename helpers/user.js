var users = [];

module.exports = {
    checkUser: function (chat){
        if (users.some(function(u){return u.id === chat.id})) {
            return 1;
        } else {
            users.push(chat);
            return 0;
        }
    },
    getUsersCount: function(){
        return users.length;
    },
    getCurrentUser: function(id){
        var user;
        for (var i=0; i<users.length; i++) {
            if (users[i].id == id) {
                user = users[i];
                break;
            }
        }
        return user;
    },
    setCurrentQuestion: function(id, qid){
        var user = this.getCurrentUser(id);
        if (user) {
            if (!qid) user.qid = 0;
            else user.qid = qid;
        }
    },
    getCurrentQuestion: function(id){
        console.dir(this.getCurrentUser(id).qid);
        return this.getCurrentUser(id).qid;
    },
    setRoboName: function(id, name){
        var user = this.getCurrentUser(id);
        if (user) {
            if (!name) user.name = 'Robo';
            else user.name = name;
        }
    },
    getRoboName: function(id){
        return this.getCurrentUser(id).name;
    }
};