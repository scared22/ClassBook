Meteor.methods({
    editPassword: function(password) {
    check(password, String);
    var id = Meteor.userId();
    Accounts.setPassword(id, password, {logout: false});
    }
});
