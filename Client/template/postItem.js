Template.postItem.helpers({
    myPost: function(){
        return this.userId === Meteor.userId();
    }
});
Template.postItem.events({
    'click #postdel':function(e,t){
        e.preventDefault();
        var currentPostId = this._id;
        Posts.remove(currentPostId);
    }
});
