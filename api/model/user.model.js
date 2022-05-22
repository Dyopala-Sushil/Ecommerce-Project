const mongoose = require("mongoose");
const AddressSchema = new mongoose.Schema({
    name: {
        type: String
    },
    ward_no: {
        type: Number,
        default: 0
    }
});
const UserSchema = new mongoose.Schema({
    // user schema 
    name: {
        type: String,   // Number, ObjectId, Boolean, Null, Date
        required: true,     // true, false 
        // enum: [],           // array
        // type: mongoose.Types.ObjectId,
        // ref: "Role"         // model name
        // default: null,  // any
        // unique: true,   // true, or false    
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        temp: AddressSchema,
        perm: AddressSchema
    },
    role: {
        type: String,
        enum: ['admin','seller','customer'],
        default: 'customer'
    },
    status: {
        type: String,
        enum: ['active','inactive'],
        default: 'inactive'
    },
    phone: {
        type: String,
        default: null
    },
    image: [{
        type: String, 
        default: null
    }]
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;