Template.lecturesignin.onRendered(function(){
    $('input#input_text, textarea#textarea1').characterCounter();
    $('select').material_select();
});
Template.lecturesignin.events({
    'click #lecture-submit':function(e,t){
            e.preventDefault();
            var lecture ={
                major:t.find('#lecture-classification').value,
                name:t.find('#lecture-name').value,
                professor:Meteor.user().profile.name
            };
            //전공 분류
            if(lecture.major == 1)lecture.major='일반선택';
            else if(lecture.major == 2)lecture.major='교양선택';
            else if(lecture.major == 3)lecture.major='전공선택';
            else lecture.major='전공필수';
            //과목명 체크
            if(lecture.name ==0)
            {
                Materialize.toast('과목명을 입력해주세요',1000);
                return false;
            }
            Meteor.call('lectureInsert',lecture,function(error,result){
                if(error) return alert(error.reason);
                Materialize.toast('등록 완료!',1000);
                Router.go('lecturelist');
            });
    }
});
