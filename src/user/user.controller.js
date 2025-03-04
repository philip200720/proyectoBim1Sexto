import { hash } from "argon2"
import User from "./user.model.js"

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

        if(data.uid){
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