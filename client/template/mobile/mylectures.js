Template.mylectures.helpers({
    lectures : function(){
        var user = Meteor.user();
        return Lectures.find({professor:user.profile.name});
    } 
});
