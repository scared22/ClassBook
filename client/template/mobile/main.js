Template.main.onRendered(function() {
    $(".button-collapse").sideNav();
    $('#mobile-demo a').click(function() {
        $('.button-collapse').sideNav('hide');
    });
});
Template.main.helpers({
    cuser: function(){
        return Meteor.user().profile.nickname;
    },
    Isprofessor: function(){
        var usr = Meteor.user().profile.jobs;
        if(usr =='pro')return true;
        else return false;
    },
    Isstudent: function(){
        var usr = Meteor.user().profile.jobs;
        if(usr == 'stu')return true;
        else return false;
    },
    posts: function(){
        var user = Meteor.users.findOne(Meteor.userId());
        if(user)
        {
            var job = user.profile.jobs;
            if(job === 'pro')
            {
                var lectures = Lectures.find({userId: user._id}).fetch();
                if(lectures){
                    lectures = _.map(lectures, function(doc){
                        return doc._id
                    });
                    return Posts.find({lecture: {$exists: true, $in: lectures}},{sort:{submitted:-1}});
                }
                else return [];
            }
            else if(job === 'stu'){
                var lectures = user.profile.lectures;
                if(lectures) return Posts.find({lecture: {$exists: true, $in: lectures}},{sort:{submitted:-1}});
                else return [];
            }
            else throw new Meteor.Error('Invalid User Info');
        }
        else Roter.go('login');
    },
    notificationCount: function(){
      return Notifications.find({userId: Meteor.userId(), read: false}).count();
    }
});
Template.main.events({
    'click #logout':function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});
