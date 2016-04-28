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
        Date.prototype.getFromFormat = function(format) {
            var yyyy = this.getFullYear().toString();
            format = format.replace(/yyyy/g, yyyy)
            var mm = (this.getMonth()+1).toString();
            format = format.replace(/mm/g, (mm[1]?mm:"0"+mm[0]));
            var dd  = this.getDate().toString();
            format = format.replace(/dd/g, (dd[1]?dd:"0"+dd[0]));
            var hh = this.getHours().toString();
            format = format.replace(/hh/g, (hh[1]?hh:"0"+hh[0]));
            var ii = this.getMinutes().toString();
            format = format.replace(/ii/g, (ii[1]?ii:"0"+ii[0]));
            var ss  = this.getSeconds().toString();
            format = format.replace(/ss/g, (ss[1]?ss:"0"+ss[0]));
            return format;
        };
        var user = Meteor.user();
        var dataformat = new Date();
        var post =_.extend(postAttributes,{
            userId: user._id,
            author: user.profile.nickname,
            submitted:dataformat.getFromFormat('yyyy-mm-dd hh:ii:ss'),
            lecture: postAttributes.part
        });
        var postId = Posts.insert(post);
        return{_id:postId};
    }
});
