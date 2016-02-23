Template.signin.events({
    'click #submit': function(e,t){
        e.preventDefault();

    var email = t.find('#submit-email').value;
    var nickname = t.find('#submit-nickname').value;
    var password = t.find('#submit-password').value;
    password.toString();
    var passwordconfirm = t.find('#submit-passwordconfirm').value;
    var name = t.find('#submit-usrname').value;
        if(password != passwordconfirm){
            Materialize.toast('비밀번호가 일치하지 않습니다.');
            t.find('#submit-password').value = '';
            t.find('#submit-passwordconfirm').value = '';
            return false;
        }
        var user = {
        email: email,
        password: password,
        profile: {
            name: name,
            nickname: nickname,
            },
        };

        Accounts.createUser(user, function(err){
            if (err) {
              if (err.reason === 'Email already exists.') {
                Materialize.toast('이미 사용 중인 이메일 입니다.');
              } else {
                Materialize.toast('회원가입에 실패하였습니다. 다시 확인해주세요.');
              }
            } else {
              Router.go('main');
            }
        });
    },
});
