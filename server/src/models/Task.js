const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  createdAt: { type: Date, default: new Date().toUTCString() },
  lastUpdatedAt: { type: Date, default: new Date().toUTCString() },
  statusCode: { type: Number, default: 1 }, // 0 - Error, 1 - Ongoing,  2 - Completed
  error: String,
  params: {
    darea: Number,
    dareaIncSurfaceRunoff: Boolean,
    iarea: Number,
    rarea: Number,
    rdep: Number,
    rdep_min: Number,
    rseep: Number,
    zr: Number,
    zrfc: Number,
    zrwp: Number,
    ze: Number,
    zefc: Number,
    zewp: Number,
    rew: Number,
    cn: { type: Number, default: 65 },
    wind: [Number],
    rhmin: [Number],
    cstart: Number,
    cstage: [Number],
    ngrw_stage: [Number],
    cht: [Number],
    kc: [Number],
    fw: { type: Number, default: 1 },
    pfact: { type: Number, default: 0.55 },
    irrdep: String,
    irrdep_min: Number,
    resd: { type: Number, default: 0.3 },
  },
});

taskSchema.methods.updateStatus = function (statusCode, err = null) {
  this.lastUpdatedAt = new Date().toUTCString();
  this.statusCode = statusCode;

  if (err) this.error = err;
};

module.exports = mongoose.model('tasks', new Schema(taskSchema));
