const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
});

userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) {
    return next();    
   } 
   try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
   } catch (error) {
    next(new Error('Password hashing failed'));
   }
});

module.exports = mongoose.model("user", userSchema);