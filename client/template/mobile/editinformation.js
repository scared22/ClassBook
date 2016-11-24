Template.editinformation.helpers({
    userEmail: function() {
       return Meteor.user().emails[0].address;
     },
     userNick: function() {
       return Meteor.user().profile.nickname;
   },
     userName: function() {
         return Meteor.user().profile.name;
     }
});
Template.editinformation.events({
    'click #cancel':function(e){
        e.preventDefault();
        Router.go('main');
    },
    'click #edit':function(e,t){
        e.preventDefault();
        var password = t.find('#private-password').value;
        var passwordconfirm = t.find('#private-passwordconfirm').value;
        var changename= t.find('#private-name').value;
        var changenickname= t.find('#private-nickname').value;
        var id = Meteor.userId();
        if(changename==='' || changenickname===''||password===''||passwordconfirm===''){
            Materialize.toast('이름 또는 닉네임을 다시한번확인해주세요.');
            return false;
        }
        if (password !== passwordconfirm) {
          Materialize.toast('비밀번호가 일치하지 않습니다.',1000);
          t.find('#private-password').value = '';
          t.find('#private-passwordconfirm').value = '';
          return false;
        }
        Meteor.users.update(Meteor.userId(), {$set: {"profile.name": changename, "profile.nickname": changenickname}},function(err){
            if(err){
                Materialize.toast('다시한번확인해주세요.',3000);
            }
        });
        Meteor.call('editPassword', password, function(err) {
          if (err) {
            Materialize.toast('비밀번호 변경 실패',1000);
            return false;
          } else {
            Router.go('myinformation');
          }
        });
    }
});
