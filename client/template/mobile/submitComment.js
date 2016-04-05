Template.submitComment.events({
    'click #postcomment':function(e,t){
        e.preventDefault();

        var comment = {
            body: t.find('#icon_prefix2').value,
            postId: t.data._id
        };
        if(comment.body == 0)return false;
        Meteor.call('commentInsert',comment,function(error,commentId){
            if(error) Materialize.toast(error);
            else t.find('#icon_prefix2').value =' ';
        });
    }
});
