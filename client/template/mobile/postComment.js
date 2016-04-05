Template.postComment.helpers({
    comments : function(){
        return Comments.find({postId: this._id},{sort:{submitted:-1}});
    },
    commentsCount : function(){
        return Comments.find({postId:this._id}).count();
    }
});
