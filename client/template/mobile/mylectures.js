Template.mylectures.helpers({
    lectures : function(){
        var user = Meteor.user();
        return Lectures.find({professor:user.profile.name});
    }
});
Template.studentlectures.helpers({
    mylectures : function(){
            var user = Meteor.user().profile.lectures;
            return Lectures.find({_id: {$in: user}});
    }
});
