const UserController = require('../controllers/userController');
const Auth=require('../utils/AuthMiddlewares');
const UserRoutes = (base, app)=> {
    const controller = new UserController();

    app.post(`${base}/create-admin`, async (req,res,next) => {
        try {
            const {email, password} = req.body;
            await controller.CreateNewAdmin(email,password);
            return res.status(201).json({message: "Exitos al crear el usuario"});
        } catch (error) {
            console.error("error al crear un nuevo usuario>", error);
            return res.status(500).json({message:"ocurrio un error al crear el usuario"})
        }
    });
// agrego isAuth para manejar y si no pasa mandarselo al midleware
// tiene q pertenecer a un rol de admin para modificar
    app.post(`${base}`, Auth.isAuth, Auth.isAdmin, async (req,res,next) => {
        try {
            const {email, password} = req.body;
            await controller.CreateNewUser(email,password);
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
    });
    /// login users
    app.post(`${base}/login`, async (req, res, next)=>{
        try{
            const response = await controller.Login(req,res);
            return response; 
        } catch (error) { 
            next(error);
        }
    })
};
module.exports=UserRoutes; 