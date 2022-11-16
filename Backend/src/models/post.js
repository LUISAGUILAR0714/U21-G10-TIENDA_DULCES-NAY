const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const postSchema = Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        status: { type: String, enum:['Published', 'On review', 'Draft'], required: true },
        user: { type: String, required: true }
    },
    {
        timestamps: true 
    }
);

const Post = mongoose.model('posts', postSchema);

module.exports = Post;
