Template.postItem.onRendered(function(){
    $('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
    });
});
Template.postItem.helpers({
    myPost: function(){
        var temp1 = Meteor.userId();
        var temp2 = Posts.findOne({_id:this._id}).userId;
        //alert(temp2);
        return temp1 === temp2;
    },
    commentsCount : function(){
        return Comments.find({postId:this._id}).count();
    },
    judgePart: function(){
        if(this.part == 1)return false;
        else return true;
    },
    lectitle : function(){
        return Lectures.findOne({_id: this.part}).name;
    }
});
