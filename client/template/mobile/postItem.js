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
        return this.userId === Meteor.userId();
    },
    commentsCount : function(){
        return Comments.find({postId:this._id}).count();
    }
});
Template.postItem.events({
    'click #postdel':function(e,t){
        e.preventDefault();
        var currentPostId = this._id;
        Posts.remove(currentPostId);
    },
    'click #postedit':function(e,t){
        e.preventDefault();
        var currentPostId = this._id;
        var postProperties ={
            content:t.find('#textarea1').value
        }
        if(postProperties.content == 0){
            Materialize.toast('빈글을 작성 할 수 없습니다.',1000);
            return false;
        }
        Posts.update(currentPostId,{$set: postProperties},function(error){
            if(error) alert(error.reason);
        });
    }
});
