Router.route('/',function(){
        if(!Meteor.userId() || Meteor.loggingIn()){
            this.redirect('/login');
        }else{
            this.redirect('/main');
        }
});
Router.route('/signin',{
    name:'signin',
    template:'signin',
});
Router.route('/main',{
    name:'main',
    template:'main',
});
Router.route('/login',{
    name:'login',
    template:'login',
});
Router.route('/write',{
    name:'write',
    template:'write'
});
Router.route('/freepost',{
    name:'freepost',
    template:'freepost',
});
Router.route('/posts/:_id/postComment',{
    name:'postComment',
    template:'postComment',
    data: function() { return Posts.findOne(this.params._id); }
});
Router.route('/lecturesignin',{
    name:'lecturesignin',
    template:'lecturesignin'
});
Router.route('/mylectures',{
    name:'mylectures',
    template:'mylectures'
});
Router.route('/lecturelist',{
    name:'lecturelist',
    template:'lecturelist'
});
Router.route('/test',{

});
var requireLogin = function(){
    if(!Meteor.user()){
        this.render('accessDenied');
    }else {
        this.next();
    }
}
Router.onBeforeAction(requireLogin, {only: 'write'});
