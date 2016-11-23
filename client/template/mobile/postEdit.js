Template.postEdit.events({
    'click #postdel':function(e,t){
        e.preventDefault();
        var currentPostId = this._id;
        Posts.remove(currentPostId);
        Router.go('main');
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
            var part = Posts.findOne({_id:currentPostId}).part;
            if(part==="1")Router.go('freepost');
            else Router.go('main');
        });

    }
});
Template.postEdit.helpers({
    mypost: function(){
        return this.userId===Meteor.userId();
    }
})
