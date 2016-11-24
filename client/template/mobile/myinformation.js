Template.myinformation.helpers({
    getEmail:function(){
        var get = Meteor.user().emails[0].address;
        return get;
    },
    getName:function(){
        var get = Meteor.user().profile.name;
        return get;
    },
    getNickname:function(){
        var get = Meteor.user().profile.nickname;
        return get;
    }
});
Template.myinformation.events({
    'click #cancel':function(e){
        e.preventDefault();
        Router.go('main');
    },
    'click #edit':function(e){
        e.preventDefault();
        Router.go('editinformation');
    }
});
