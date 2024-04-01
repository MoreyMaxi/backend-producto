const mongoose=require('mongoose');
const {Schema}=mongoose;
const userSchema=new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        match:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
    password: {
        type:String,
        required:[true, 'la contraseña es requerida'],
    },
    role:{
        type:String,
        required:[true, 'El rol es requerido']
    }
});

const UserModel=mongoose.model('user', userSchema);
module.exports=UserModel; 