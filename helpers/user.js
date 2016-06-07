var users = [];

module.exports = {
    setUser: function (chat, callback){
        if (!users.some(function(u){return u.id === chat.id})) {
            users.push({
                first_name: chat['first_name'],
                last_name: chat['last_name'],
                id: chat['id'],
                name: null,
                sex: null,
                age: null,
                email: null,
                progress: {
                    mission: null,
                    question: null
                }
            });
            if (callback) callback(false);
            return 0;
        } else {
            if (callback) callback(true);
            return 1;
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
    setRoboName: function(id, name){
        this.getCurrentUser(id).name = name || 'Robo';
    },
    getRoboName: function(id){
        return this.getCurrentUser(id).name;
    },
    setRoboSex: function(id, sex){
        this.getCurrentUser(id).sex = sex || null;
    },
    getRoboSex: function(id){
      return this.getCurrentUser(id).sex;
    },
    setRoboAge: function(id, age){
        this.getCurrentUser(id).age = age || null;
    },
    getRoboAge: function(id){
        return this.getCurrentUser(id).age;
    },
    setEmail: function(id, email){
        this.getCurrentUser(id).email = email || null;
    },
    getEmail: function(id){
        return this.getCurrentUser(id).email;
    },
    setMission: function(id, mission){
        var path;
        switch (mission) {
            case 0 || 'prolog':
                path = '../missions/prolog';
                break;
        }
        this.getCurrentUser(id).progress.mission = path;
    },
    getMission: function(id){
        return require(this.getCurrentUser(id).progress.mission);
    },
    setQuestion: function(id, question){
        this.getCurrentUser(id).progress.question = question || null;
    },
    getQuestion: function(id){
        return this.getCurrentUser(id).progress.question;
    },
    getUserAttribute: function(id, attr){
        var attribute;
        switch (attr){
            case 'name':
                attribute = this.getRoboName(id);
                break;
            case 'sex':
                attribute = this.getRoboSex(id);
                break;
            case 'age':
                attribute = this.getRoboAge(id);
                break;
            case 'email':
                attribute = this.getEmail(id);
                break;
        }
        return attribute;
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
    }
};