const mongoose = require('mongoose');
const { Schema } = mongoose;

const Form = mongoose.model('forms');

const taskSchema = new Schema({
  clientID: String,
  createdAt: { type: Date, default: new Date().toUTCString() },
  lastUpdatedAt: { type: Date, default: new Date().toUTCString() },
  statusCode: { type: Number, default: 1 }, // 0 - Error, 1 - Ongoing,  2 - Completed
  error: String,
  workspace: String,
  inputFile: String,
  paramFile: String,
  Form: Form.schema,
  runtime: Number,
});

taskSchema.methods.updateStatus = function (statusCode, err = null) {
  this.lastUpdatedAt = new Date().toUTCString();
  this.statusCode = statusCode;

  if (err) this.error = err;
};

module.exports = mongoose.model('tasks', new Schema(taskSchema));
