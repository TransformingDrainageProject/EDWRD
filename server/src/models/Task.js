const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  createdAt: { type: Date, default: new Date().toUTCString() },
  lastUpdatedAt: { type: Date, default: new Date().toUTCString() },
  statusCode: { type: Number, default: 1 }, // 0 - Error, 1 - Ongoing,  2 - Completed
  error: String,
  params: {
    darea: Number,
    iarea: Number,
    rarea: Number,
    rdep: Number,
    rseep: Number,
    zr: Number,
    zrfc: Number,
    zrwp: Number,
    ze: Number,
    zefc: Number,
    zewp: Number,
    rew: Number,
    cn: Number,
    wind: [Number],
    rhmin: [Number],
    cstart: Number,
    cstage: [Number],
    ngrw_stage: [Number],
    cht: [Number],
    kc: [Number],
    frz_kc: Number,
    fw: Number,
    pfact: Number,
    irr: Number,
    residue: Number,
  },
});

taskSchema.methods.updateStatus = function (statusCode, err = null) {
  this.lastUpdatedAt = new Date().toUTCString();
  this.statusCode = statusCode;

  if (err) this.error = err;
};

module.exports = mongoose.model('tasks', new Schema(taskSchema));
