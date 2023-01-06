const { Schema, Types } = require('mongoose');
const moment = require('moment');

// reactions(these are like replies)
// array of nested documents created with the reactionSchema
const reactionSchema = new schema(
    {
        // reactionId , mongoose ObjectId data type, default value is set to new ObjectId
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        //reactionBody, STRING REQUIRED MAX=280
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        // username STRING REQUIRED
        username: {
            type: String,
            required: true,
        },
        // createdAt DATE, set default value to the current timestamp, 
        // use a getter method to format the timestamp on query
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("MMM Do, YYYY [at] hh:mm a")
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)


const thoughtSchema = new Schema({

    // thought Text must have
    // string, required, must be between 1-280 characters
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    // createdAt
    // Date, set default value to the current timstamp,use a GETTER method to format the timestamp on a query
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("MMM Do, YYYY [at] hh:mm a")
    },
    // username(the user that created this thought)
    // string and required
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
},
    {
        toJSON: {
            virtuals: true,
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
    .get(function () {
        return this.reactions.length
    });

// initalize our Thoughts model
const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;



