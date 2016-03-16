Template.main.onRendered(function() {
    this.$('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false // Displays dropdown below the button
    });
});
Template.main.helpers({
    cuser: function(){
        return Meteor.user().profile.nickname;
    }
});
Template.main.events({
    'click .logout':function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});
