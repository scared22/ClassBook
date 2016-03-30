Lectures = new Mongo.Collection('lectures');

Meteor.methods({
    lectureInsert: function(lectureAttributes){
        check(Meteor.userId(),String);
        check(lectureAttributes,{
            major:String,
            name:String,
            professor:String
        });
        var user = Meteor.user();
        var lecture = _.extend(lectureAttributes,{
            userId:user._id,
            submitted:new Date()
        });
        var lectureId = Lectures.insert(lecture);
        return {_id:lectureId};
    }
});
