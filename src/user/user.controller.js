import { hash } from "argon2"
import User from "./user.model.js"

export const createUser = async (req, res) => {
    try {
        const data = req.body;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword

        const user = await User.create(data)
        return res.status(201).json({
            success: true,
            message: "User has been created",
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User creation failed",
            error: err.message
        });
    }
}

export const getUsers = async (req, res) => {
    try{
        const query = { status: true }

        const users = await User.find(query)

        return res.status(200).json({
            success: true,
            users
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error getting users",
            error: err.message
        })
    }
}

export const updateUser = async (req, res) => {
    try{
        const { usuario } = req
        const data = req.body
        const { uid } = data

        if(uid){
            const user = await User.findByIdAndUpdate(uid, data, { new: true})
            return res.status(200).json({
                success: true,
                message: "User updated successfully",
                user
            })
        }else{
            const user = await User.findByIdAndUpdate(usuario.uid, data, { new: true})
            return res.status(200).json({
                success: true,
                message: "User updated successfully",
                user
            })
        }
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error updating users",
            error: err.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try{
        const { usuario } = req
        const { uid } = req.body

        if(uid){
            const user = await User.findByIdAndUpdate(uid, { status: false }, { new: true })
            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
                user
            })
        }else{
            const user = await User.findByIdAndUpdate(usuario.uid, { status: false }, { new: true })
            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
                user
            })
        }
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error deleting users",
            error: err.message
        })
    }
}