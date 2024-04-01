const UserModel = require("../models/UserModel");

class UserController { 
    async CreateNewUser (email, password, role){
        try {
            const newUser= new UserModel({
                email:email,
                password:password,
                role:role
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
