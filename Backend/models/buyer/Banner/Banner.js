const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  name:{
    type:String,
    required:true,
  }
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
