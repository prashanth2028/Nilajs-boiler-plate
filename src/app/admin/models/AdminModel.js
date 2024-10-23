import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'cva-jwt';

/**
 * AdminSchema
 * @description Admin model
 */

const AdminSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name must not be empty'],
    },
    email: {
        type: String,
        required: [true, 'Email must not be empty'],
        unique: true
    },
    is_primary: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, 'Password must not be empty'],
    },
    authorisation: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now
    }

}, { versionKey: false });


// Pre-validate hook to hash password
AdminSchema.pre('validate', async function(next) {
    this.authorisation = jwt.encode(this, process.env.JWT_SECRET, 'HS256');
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Instance method to compare passwords
AdminSchema.methods.comparePassword = async function(adminPassword) {
    return await bcrypt.compare(adminPassword, this.password);
};

export const Admin = model('admin', AdminSchema);