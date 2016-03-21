Template.postEdit.onRendered(function(){
    $('input#input_text, textarea#textarea1').characterCounter();
});
Template.postEdit.events({
    'click #edit':function(e,t){
        e.preventDefault();
        var currentPostId = this._id;

        var postProperties ={
            content:t.find('#textarea1').value
        }
        if(postProperties.content == 0){
            Materialize.toast('빈글을 작성 할 수 없습니다.');
            return false;
        }
        Posts.update(currentPostId,{$set: postProperties},function(error){
            if(error){
                alert(error.reason);
            } else {
                Router.go('freepost');
            }
        });
    }
});
