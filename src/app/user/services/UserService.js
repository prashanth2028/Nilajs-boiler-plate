import { User } from '../models/UserModel';

class UserService {
    
    async createUser(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async listUsers() {
        return await User.find();
    }

    async getUserById(id) {
        return await User.findById(id);
    }

    async updateUserById(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { new: true });
    }

    async deleteUserById(id) {
        return await User.findByIdAndDelete(id);
    }
}

export default new UserService();
