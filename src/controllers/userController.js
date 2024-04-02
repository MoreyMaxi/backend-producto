const UserModel = require("../models/UserModel");
const bcrypt = require ('bcrypt');
const helpers = require ('../utils/helpersFunctions');

class UserController { 
    async CreateNewAdmin(email, password){
        try {
            if (!helpers.ValidateEmail(email)) {
                throw new Error("formato email invalido")
                
            }
            if (!helpers.ValidatePassword(password)) throw new Error ("formato password incorrecto"); 

            const SALT=parseInt(process.env.BCRYPT_SALT); 
            const hash= await bcrypt.hash(password, SALT);
            const newUser= new UserModel({
                email:email,
                password:hash,
                role:"Admin"
            });
            const savedUser= await newUser.save();
            return savedUser;

        } catch (error) {
            throw error;
        }
    }

    async CreateNewUser(email, password){
        try {
            if (!helpers.ValidateEmail(email)) {
                throw new Error("formato email invalido")
                
            }
            if (!helpers.ValidatePassword(password)) throw new Error ("formato password incorrecto"); 

            const SALT=parseInt(process.env.BCRYPT_SALT); 
            const hash= await bcrypt.hash(password, SALT);
            const newUser= new UserModel({
                email:email,
                password:hash,
                role:"User"
            });
            const savedUser= await newUser.save();
            return savedUser;

        } catch (error) {
            throw error;
        }
    }

    async DeleteUserById(id){
        try {
            const deletedUser=await UserModel.findByIdAndDelete(id);
            return deletedUser; 
        } catch (error) {
            throw error //manda el error a capas superiores
        }
    }
};

module.exports=UserController;
