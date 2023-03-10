const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    // USERNAME MUST BE
    // STRING,UNIQUE,REQUIRED,TRIMMED
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    // EMAIL MUST BE
    // STRING, REQUIRED, UNIQUE, MATCH A VALID EMAIL ADDRESS(LOOK INTO MONGOOES'S MATCHING VALIDATION)
    email: {
        type: String,
        unique: true,
        required: true,
        match: /.+\@.+\..+/,
        // email verification regex



    },
    // THOUGHTS MUST BE
    // array of `_id` values referencing the thought model
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
    }],
    // FRIENDS MUST BE
    // array of `_id` values referencing the user model(self-reference)
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }]
},
    {
        toJSON: {
            virtuals: true,
        },
    })
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual("friendcount").get(function () {
    return `${this.friends.length}`
});

// create the user model
const User = model('User', userSchema);

module.exports = User;
