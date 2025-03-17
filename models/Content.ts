import mongoose,  {Schema, Types} from "mongoose";

const contentType = ['youtube', 'instagram', 'twitter', 'linkedin', 'link'];

const ContentSchema = new Schema({
    link : {
        type: String,
        required: true
    },
    type : {
        type : String,
        enum : contentType,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    tags : [
        {
            type : Types.ObjectId,
            ref : 'Tag'
        }
    ],
    userId : {
        type : Types.ObjectId,
        ref : 'User',
        required : true
    }
});

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);