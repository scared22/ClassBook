Template.main.onRendered(function() {
        $(".dropdown-button").dropdown();
});
Template.main.helpers({
    cuser: function(){
        return Meteor.user().profile.nickname;
    }
});
