const { Schema, model } = require('mongoose');

const ModelSchema = new Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 30
    },
    email: {
        type: String,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "Author", // This is another model name which reffrenced fromthis model here
        // autopupulate: true
    },
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true })

module.exports = model('Model', ModelSchema)