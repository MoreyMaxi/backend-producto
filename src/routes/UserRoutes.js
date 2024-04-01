const UserController = require('../controllers/userController');
//instanciamos una clase 
const controller = new UserController
const UserRoutes = (base, app)=> {

    app.post(`${base}/create`, async (req,res,next) => {
        try {
            const {email, password, role} = req.body
            const response=await controller.CreateNewUser(email,password,role);
            return res.status(201).json({message: "Exitos al crear el usuario"});
        } catch (error) {
            console.error("error al crear un nuevo usuario>", error);
            return res.status(500).json({message:"ocurrio un error al crear el usuario"})
        }
    });

    app.delete(`${base}/delete/:id`, async(req,res)=>{
        try {
            const id=req.params.id; 
            const response=await controller.DeleteUserById(id);
            console.log("usuario eliminado>>", JSON.stringify(response))
            return res.status(500).json({message:"Exito al eliminar el usuario"});
        } catch (error) {
            console.error("Error al eliminar un usuario>", error);
            return res.status(500).json({message:"ocurrio un error al intentar eliminar un usuario"});

        }
    })
};
module.exports=UserRoutes; 