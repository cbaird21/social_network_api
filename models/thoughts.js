const { Schema, Types } = require('mongoose');


const thoughtSchema = new Schema({
    // reactions(these are like replies)
    // array of nested documents created with the reactionSchema

    // i'm not sure that this was the right way... i'm trying!

    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    // thought Text must have
    // string, required, must be between 1-280 characters
    responseBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    // createdAt
    // Date, set default value to the current timstamp,use a GETTER method to format the timestamp on a query
    createdAt: {
        type: Date,
        default: Date.now
    },
    // username(the user that created this thought)
    // string and required
    username: {
        type: String,
        required: true,
    }
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
// Schema Settings
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
    .virtual('reactionCount')
// getter function to get the length of the thoughts reactions array field on query.
    .get(function (){
        return `${this.responseBody.length}`
    });

// initalize our Thoughts model
const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;



