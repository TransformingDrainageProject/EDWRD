const mongoose = require('mongoose');
const { Schema } = mongoose;

const formSchema = new Schema({
  createdAt: { type: Date, default: new Date().toUTCString() },
  cropSelection: String,
  darea: Number,
  dareaIncSurfaceRunoff: Boolean,
  devDateEnd: Date,
  devDateStart: Date,
  freeze: Number,
  harvestDateStart: Date,
  iarea: Number,
  initCropHeight: Number,
  initDateEnd: Date,
  initDateStart: Date,
  initKC: Number,
  irrdep: String,
  irrdep_min: Number,
  irrdepType: String,
  lateDateEnd: Date,
  lateDateStart: Date,
  location: {
    latitude: Number,
    longitude: Number,
  },
  midCropHeight: Number,
  midDateEnd: Date,
  midDateStart: Date,
  midKC: Number,
  pfact: Number,
  plantDateStart: Date,
  rarea: Number,
  rdep: Number,
  rdep_min: Number,
  rew: Number,
  rseep: Number,
  soilDateEnd: Date,
  soilDateStart: Date,
  soilType: String,
  thaw: Number,
  unitType: String,
  userData: Boolean,
  ze: Number,
  zefc: Number,
  zewp: Number,
  zr: Number,
  zrfc: Number,
  zrwp: Number,
});

module.exports = mongoose.model('forms', new Schema(formSchema));
