const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    // username: {
    //     type: String
    // },
    password: {
        type: String,
        required: true,
        unique: true
    },
    profileimage: {
        type: String
    }
});

userSchema.plugin(uniqueValidator);

const User = module.exports = mongoose.model('User', userSchema);