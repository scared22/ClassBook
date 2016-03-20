Template.write.onRendered(function(){
    $('input#input_text, textarea#textarea1').characterCounter();
    $('select').material_select();
});
Template.write.events({
    'click #submit':function(e,t){
        e.preventDefault();
        var post ={
            part:t.find('#Classification').value,
            content:t.find('#textarea1').value,
            postuser:Meteor.user().profile.nickname
        };
        if(post.content ==0)Materialize.toast('제목 또는 내용을 입력 해주세요',1000);
        Meteor.call('postInsert',post,function(error,result){
            if(error) return alert(error.reason);
            else {
                Materialize.toast('등록 완료!',1000);
                if(post.part == 1) Router.go('freepost');
                else Router.go('main');
            }
        });

    }
});
