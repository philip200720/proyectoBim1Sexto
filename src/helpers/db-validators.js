import User from "../user/user.model.js"

export const emailExists = async (email = "") => {
    const exists = await User.findOne({ email })
    if (exists) {
        throw new Error(`The email ${email} already exists`)
    }
}

export const usernameExists = async (username = "") => {
    const exists = await User.findOne({ username })
    if (exists) {
        throw new Error(`The username ${username} already exists`)
    }
}

export const userExists = async (uid = "") => {
    const existe = await User.findById(uid)
    if (!existe) {
        throw new Error("A user with the given ID does not exist")
    }
}

export const createDefaultAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: "ADMIN_ROLE" });
        if (!adminExists) {
            const defaultAdmin = {
                name: "admin",
                surname: "123",
                username: "admin123",
                email: "admin123@example.com",
                password: await hash("Abc1234."),
                adress: "123 Main Street",
                phone: "12345678",
                role: "ADMIN_ROLE",
                status: true,
            };
            await User.create(defaultAdmin);
            console.log("Default admin created");
        }
    } catch (error) {
        console.error(`"Error creating default admin:", ${error}`);
    }
};