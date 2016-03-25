Template.postComment.helpers({
    comments : function(){
        return Comments.find({postId: this._id});
    },
    commentsCount : function(){
        return Comments.find({postId:this._id}).count();
    }
});
