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
        Posts.update(currentPostId,{$set: postProperties},function(error){
            if(error){
                alert(error.reason);
            } else {
                Router.go('freepost');
            }
        });
    }
});
