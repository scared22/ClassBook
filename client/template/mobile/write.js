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
            if(result.postExists)
                Materialize.toast('이미 등록된 내용이 있습니다.');
            else
            {
                    Materialize.toast('등록 완료!',1000);
                    if(post.part == 1) Router.go('freepost');
                    else Router.go('main');
            }
        });

    }
});
Template.write.helpers({
    lectures: function(){
        var job = Meteor.user().profile.jobs;
        var lectures = Meteor.user().profile.lectures;
        if(job === 'stu')
        {
            if(lectures)
                return Lectures.find({_id:{$in: lectures}});
            else return [];
        }
        else return Lectures.find({userId: Meteor.userId()});
    }
});
