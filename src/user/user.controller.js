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
        const role = usuario.role
        const data = req.body

        if(role === "ADMIN_ROLE"){
            const { uid } = req.body
            const user = await User.findById(uid)
            if(user.role === "ADMIN_ROLE"){
                res.status(401).json({
                    success: false,
                    message: "Unable to edit other admins"
                })
            }else if(user.role === "CLIENT_ROLE"){
                user = await User.findByIdAndUpdate(uid, data, { new: true})
                res.status(200).json({
                    success: true,
                    message: "User updated successfully",
                    user
                })
            }

            res.status(200).json({
                success: true,
                message: "User updated successfully",
                user
            })
        }else if(role === "CLIENT_ROLE"){
            if(data.uid){
                res.status(401).json({
                    success: false,
                    message: "Only admins are authorized to edit other users"
                })
            }else if(data.role){
                res.status(401).json({
                    success: false,
                    message: "Only admins are authorized to edit roles"
                })
            }else if(data.status){
                res.status(405).json({
                    success: false,
                    message: "Unable to switch status in update method"
                })
            }
            const { uid } = usuario
            const user = await User.findByIdAndUpdate(uid, data, { new: true})

            res.status(200).json({
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