const mongoose = require('mongoose');

const VideoadSchema = new mongoose.Schema({
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

const Videoad = mongoose.model('Videoad',VideoadSchema);

module.exports = Videoad;
