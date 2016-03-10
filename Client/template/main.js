Template.main.helpers({
    cuser: function(){
        return Meteor.user().profile.nickname;
    }
});
