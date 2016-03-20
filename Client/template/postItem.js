Template.postItem.helpers({
    myPost: function(){
        return this.userId === Meteor.userId();
    }
});
