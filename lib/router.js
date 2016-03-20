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
Router.route('/test',{
    name:'test',
    template:'postItem',
});
Router.route('/posts/:_id/edit',{
    name:'postEdit',
    template:'postEdit',
    data: function() { return Posts.findOne(this.params._id); }
});
var requireLogin = function(){
    if(!Meteor.user()){
        this.render('accessDenied');
    }else {
        this.next();
    }
}
Router.onBeforeAction(requireLogin, {only: 'write'});
