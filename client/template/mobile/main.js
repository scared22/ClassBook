Template.main.onRendered(function() {
    $(".button-collapse").sideNav();
    $('#mobile-demo a').click(function() {
        $('.button-collapse').sideNav('hide');
    });
});
Template.main.helpers({
    cuser: function(){
        return Meteor.user().profile.nickname;
    }
});
Template.main.events({
    'click #logout':function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});
