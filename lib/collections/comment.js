Comments = new Mongo.Collection('commets');

Meteor.methods({
    commentInsert: function(commentAttributes){
        check(this.userId, String);
        check(commentAttributes, {
            postId: String,
            body: String
        });
        var user = Meteor.user();
        var post = Posts.findOne(commentAttributes.postId);
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
        var dataformat = new Date();
        if(!post) throw new Meteor.Error('유효하지 않는 댓글입니다.','댓글을 작성해주세요.');
        var comment = _.extend(commentAttributes,{
            userId: user._id,
            author: user.profile.nickname,
            submitted:dataformat.getFromFormat('yyyy-mm-dd hh:ii:ss')
        });
        Posts.update(comment.postId, {$inc: {commentsCount: 1}});

        comment._id=Comments.insert(comment);

        createCommentNotification(comment);

        return comment._id;
    }
});
