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
    }
});
Template.main.events({
    'click #logout':function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});
