const { Schema, model } = require('mongoose');

const uuid = require('uuid');

const TaskSchema = new Schema({
    _id: { type: String, default: () => uuid.v4() },
    title: { type: String, required: true },
    text: { type: String }
});

module.exports = model('Task', TaskSchema);
