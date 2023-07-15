import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    topic: { type: String, required: true }, // new
    profilePicture: { type: String }, // new
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [{
        content: String,
        image: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }]
});

const Community = mongoose.model('Community', communitySchema);
export default Community;

