Template.mylectureform.onRendered(function(){
    $('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        complete: function() {$('#modal1').closeModal();} // Callback for Modal close
    });
    $('select').material_select();
});
Template.mylectureform.events({
    'click #lecture-del':function(e,t){
        e.preventDefault();
        var currentLectureId = this._id;
        Lectures.remove(currentLectureId);
    },
    'click #lecture-edit':function(e,t){
        e.preventDefault();
        var currentLectureId = this._id;
        var lectureProperties ={
            major:t.find('#lecture-Classification').value,
            name:t.find('#textarea1').value
        }
        if(lectureProperties.major==1)lectureProperties.major='일반선택';
        else if(lectureProperties.major==2)lectureProperties.major='교양선택';
        else if(lectureProperties.major==3)lectureProperties.major='전공선택';
        else lectureProperties.major='전공필수';

        if(lectureProperties.name ==0){
            Materialize.toast('과목명을 입력해주세요.');
            return false;
        }
        Lectures.update(currentLectureId,{$set: lectureProperties},function(error){
            if(error) alert(error.reason);
            else Materialize.toast('수정완료');
        });
    }
});
Template.lectureform.helpers({
    isStundet : function(){
        var user = Meteor.user();
        var job = user.profile.jobs;
        if(job == 'stu')return true;
        else return false;
    },
    isApplied : function(){
        var lectures = Meteor.user().profile.lectures;
        if($.inArray(this._id,lectures)>-1) return true;
        else return false;
    }
});
Template.stlectureform.events({
    'click #stlecture-del':function(e){
        e.preventDefault();
        if(confirm("삭제하시겠습니까?"))
        {
            var currentId = Meteor.userId();
            var subjectId = this._id;
            Meteor.users.update({_id:currentId},{$pull:{"profile.lectures":subjectId}});
            Router.go('studentlectures');
        }
    }
});
