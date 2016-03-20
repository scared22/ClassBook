Template.freepost.helpers({
    posts: function(){
        return Posts.find({part:"1"},{sort:{submitted:-1}});
    }
});
