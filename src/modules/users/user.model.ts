import mongoose from '../../database/mongoose';
let Schema = mongoose.Schema;


/**
 * Schema
 */

let User = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter your email.'],
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: [true, 'Please enter your password.']
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'reseller', 'client'],
            message: 'Please select valid role.'
        },
        required: [true, 'Please select role.']
    }
});


/**
 * Pre hooks
 */

User.pre('save', (next, done) => {
    // TODO: email password to user
    next();
});


/**
 * Methods
 */

User.methods.isAdmin = function (callback) {
    return this.role === 'admin';
};

User.methods.isReseller = function (callback) {
    return this.role === 'reseller';
};

User.methods.isClient = function (callback) {
    return this.role === 'client';
};


/**
 * Define model
 */

let Model = mongoose.model('User', User);


/**
 * Export model
 */

export default Model;