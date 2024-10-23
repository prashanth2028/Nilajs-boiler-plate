import { Admin } from "../models/AdminModel";


class AdminService {
    async createAdmin(adminData) {
        const admin = new Admin(adminData);
        return await admin.save();
    }
}

export default new AdminService();