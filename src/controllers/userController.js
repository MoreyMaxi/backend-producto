const UserModel = require("../models/UserModel");
const bcrypt = require ('bcrypt');
const helpers = require ('../utils/helpersFunctions');
const jwt = require ('jsonwebtoken')
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
/// login 
    async Login(req,res){ 
        try {
           const body=req.body; //extraigo el body

           if (body.email===''|| body.email===undefined){
                throw new Error("debe enviar un email")
           } 
           if (body.password===''|| body.password===undefined){
            throw new Error("debe enviar un password")
       } 

       const user = await UserModel.findOne({email:body.email}); // busco en al base de datos, y veo si es undefained
       if (user===null){
            return res.status(404).json({message:"email y/o password incorrectos"})
       };

       const compare=await bcrypt.compare(body.password, user.password);
       
       if (!compare) {
         return res.status(404).json({message:"email y/o password incorrectos"})
 
       };
       
// Encriptamos con token 
        const token = jwt.sign({
            _id:user._id,
            role:user.role
        }, process.env.SECRET_KEY, {expiresIn:'1d'} 
        );
        return res.status(200).json({email:user.email, role:user.role, token:token}); 

        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            return res.status(500).json({ message: "Ocurrió un error en el servidor" });
        }   
    }
};


module.exports=UserController;
