Template.lecturelist.helpers({
    lectures:function(){
        return Lectures.find();
    }
});

Template.lecturelist.events({
    'click .apply-lecture':function(e){
        Meteor.call('applyLecture',e.target.id, function(err,result){
            if(err) Materialize.toast("신청에 실패 했습니다.",1000);
        });
    }
})
