const mongoose = require('mongoose');

const candySchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  color: String,
  created_at: Date,
  updated_at: Date
});

candySchema.pre('save', function (next) {
  let now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const Candy = mongoose.model('Candy', candySchema);

module.exports = Candy;
