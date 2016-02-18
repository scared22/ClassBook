Router.route('/',{
    name:'main',
    template:'login',
});
Router.route('/signin',{
    name:'signin',
    template:'signin'
});
Router.route('/login',function(){
    if(Meteor.isCordova)
    {
        if (!Meteor.userId() || Meteor.loggingIn()) {
          this.redirect('/login');
        } else {
          this.redirect('/login');
        }
    }
});
