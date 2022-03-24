const { Schema, model } = require('mongoose');

const Task = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
}, {
    timestamps: true
});

module.exports = model('Task', Task)