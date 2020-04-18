const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique:true,
        required:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

//antes de salvar o usuário .pre :função do mongoose
UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10); // gera encrypt da senha com 10 rounds(vezes que omhash será gerado)
    this.password = hash;

    next();
})
const User = mongoose.model('User', UserSchema);

module.exports = User;