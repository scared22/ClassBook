Posts = new Mongo.Collection('posts');

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
