const { Schema, model } = require('mongoose');
const { schema } = require('./User');

const thoughtSchema = new Schema(
    {
        ThoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => date.toLocalString()
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
        virtuals: false
        },
        id: false
    }
);

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => date.toLocalString()
        }
    },
    {
    toJSON: {getters:true},
    id:false
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thoughts', thoughtSchema);

modeule.exports = Thought