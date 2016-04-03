Lectures = new Mongo.Collection('lectures');

Lectures.allow({
    update: function(userId, lecture){return ownsDocument(userId,lecture);},
    remove: function(userId, lecture){return ownsDocument(userId,lecture);}
});
Lectures.deny({
    update: function(userId, lecture, filedNames){
        return(_.without(filedNames,'name').lenth>1);
    }
});
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
