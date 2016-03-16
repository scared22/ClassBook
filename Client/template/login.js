Template.login.events({
    'click #login': function(evt, tmpl){
        var id = tmpl.find('#icon_email').value;
        var pwd = tmpl.find('#icon_password').value;
        Meteor.loginWithPassword(id,pwd,function(err){
            if(err) Materialize.toast('아이디나 비밀번호가 일치하지 않습니다.');
            else Router.go('main');
        });
    },
});
