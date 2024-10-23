import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'cva-jwt';

const options = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    authorisation: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }, 
}, options);

// Pre-validate hook to hash password
userSchema.pre('validate', async function(next) {
    this.authorisation = jwt.encode(this, process.env.JWT_SECRET, 'HS256');
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
    this.updated_at = Date.now(); // Update updatedAt field
    next();
});

// Post-save hook
userSchema.post('save', function(doc) {
    console.log(`User ${doc.email} has been created.`);
});

// Pre-find hook to log queries (example)
userSchema.pre('find', function() {
    console.log('A find query has been executed.');
});

// Pre-update hook
userSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: Date.now() }); // Update the updatedAt field
    next();
});

// Post-update hook
userSchema.post('findOneAndUpdate', function(doc) {
    console.log(`User ${doc.email} has been updated.`);
});

// Pre-remove hook
userSchema.pre('remove', function(next) {
    console.log(`User ${this.email} is being removed.`);
    next();
});

// Post-remove hook
userSchema.post('remove', function(doc) {
    console.log(`User ${doc.email} has been removed.`);
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);
