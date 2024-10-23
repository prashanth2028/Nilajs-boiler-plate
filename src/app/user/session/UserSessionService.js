import { UserSession } from './UserSessionModel';

class UserSessionService {
    
    async createSession(sessionData) {
        const session = new UserSession(sessionData);
        return await session.save();
    }

    async listSessions() {
        return await UserSession.find().populate('user_id');
    }

    async getSessionById(id) {
        return await UserSession.findById(id).populate('user_id');
    }

    async updateSessionById(id, sessionData) {
        return await UserSession.findByIdAndUpdate(id, sessionData, { new: true });
    }

    async deleteSessionById(id) {
        return await UserSession.findByIdAndDelete(id);
    }
}

export default new UserSessionService();
