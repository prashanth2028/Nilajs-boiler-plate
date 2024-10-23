import mongoose from 'mongoose';

const options = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
};

const userSessionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    session_token: {
        type: String,
        required: true,
        unique: true,
    },
    session_information: {
        type: Object
    },
    status: {
        type: Number,
        default: 1 // 1 - active, 0 - inactive 
    }
}, options);

// Pre-validate hook to check for required fields
userSessionSchema.pre('validate', function(next) {
    if (!this.session_token) {
        return next(new Error('Session token is required'));
    }
    next();
});

// Pre-save hook to log when a session is being created
userSessionSchema.pre('save', function(next) {
    console.log(`Creating session for user ${this.user_id}`);
    next();
});

// Post-save hook
userSessionSchema.post('save', function(doc) {
    console.log(`Session ${doc.session_token} has been created for user ${doc.user_id}`);
});

// Pre-find hook to log queries
userSessionSchema.pre('find', function() {
    console.log('A find query has been executed on user sessions.');
});

// Pre-update hook
userSessionSchema.pre('findOneAndUpdate', function(next) {
    console.log(`Updating session ${this.getFilter().session_token}`);
    next();
});

// Post-update hook
userSessionSchema.post('findOneAndUpdate', function(doc) {
    console.log(`Session ${doc.session_token} has been updated.`);
});

// Pre-remove hook
userSessionSchema.pre('remove', function(next) {
    console.log(`Removing session ${this.session_token} for user ${this.user_id}`);
    next();
});

// Post-remove hook
userSessionSchema.post('remove', function(doc) {
    console.log(`Session ${doc.session_token} has been removed.`);
});

// Instance method to check session status
userSessionSchema.methods.isActive = function() {
    return this.status === 1; // Check if session is active
};

export const UserSession = mongoose.model('UserSession', userSessionSchema);
