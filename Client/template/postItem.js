Template.postItem.onRendered(function(){
    $('.modal-trigger').leanModal();
    $('input#input_text, textarea#textarea1').characterCounter();
});
Template.postItem.helpers({
    myPost: function(){
        return this.userId === Meteor.userId();
    },
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
            if(error){
                alert(error.reason);
            } 
        });
    }
});
