import { Schema, model } from "mongoose"

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    username:{
        type: String,
        required: [true, "Username is required"],
        unique:true,
        maxLength: [25, "Username cannot exceed 25 characters"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "CLIENT_ROLE"]
    },
    adress:{
        type: String,
        required: [true, "Adress is required"]
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    /*
    history:{
        type: Schema.ObjectId,
        ref: 'Product',
        required: true
    }
    */
    status:{
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false,
})

userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)