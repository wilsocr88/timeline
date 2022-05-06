const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
    id: ObjectId,
    name: String,
    text: String,
    date: Date
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;