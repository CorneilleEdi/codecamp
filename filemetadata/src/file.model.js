const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema =  Schema({
    name: { type: String, required: [true, 'name is required!'] },
    type: { type: String, required: [true, 'type is required!'] },
    size: { type: Number, required: [true, 'size is required!'] },
  });
  
  const File = mongoose.model('File', fileSchema);
  module.exports = File