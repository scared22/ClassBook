Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post){return ownsDocument(userId, post);},
  remove: function(userId, post){return ownsDocument(userId, post);}
});
Posts.deny({
    update: function(userId, post, fieldNames) {
    return (_.without(fieldNames, 'content').length > 1);
  }
});
Meteor.methods({
        postInsert: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            content:String,
            part:String,
            postuser:String
        });
        //이중등록 방지
        var postWithSameLink = Posts.findOne({content: postAttributes.content});
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }
        var user = Meteor.user();
        var post =_.extend(postAttributes,{
            userId: user._id,
            author: user.profile.nickname,
            submitted: new Date()
        });
        var postId = Posts.insert(post);
        return{_id:postId};
    }
});
