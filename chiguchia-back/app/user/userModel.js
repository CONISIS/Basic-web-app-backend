"use strict";
const mongoose = require ('../../config/mongoose').mongoose,
      Schema   = mongoose.Schema,
      bcrypt   = require('bcrypt'),
    //   jwt      = require('jsonwebtoken'),
    //   secret = require('../../config/secret'),
      validator = require('validator'),
      FKHelper = require('../../helpers/fk-helper');


const userSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    role: {
        type: String, 
        ref: 'Role',
        required: true,
        validate: {
            validator: (v) => {
				return FKHelper(mongoose.model('Role'), v);
			}
		}
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
});


// userSchema.methods.generateAuthToken = async function() {
//     // Generate an auth token for the user
//     const user = this
//     const token = jwt.sign({_id: user._id}, secret.key, { expiresIn: "1h" });
//     user.tokens = user.tokens.concat({token})
//     await user.save()
//     return token
// }


userSchema.statics.findByCredentials = async (r_email, r_password) => {
    // Search for a user by email and password.
    console.log("enter find user");
    const user = await User.findOne({ email : r_email} );
    console.log(user);
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(r_password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

const User = mongoose.model('User', userSchema);

module.exports = User;
