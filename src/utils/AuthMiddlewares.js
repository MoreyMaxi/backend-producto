const jwt=require('jsonwebtoken');

// primer midelware, comprueba que la peticion tenga el header authorization, valido en funcion del tiempo

function isAuth (req,res,next){
    const auth = req.get("Authorization"); //calculamos el valor

    if(!auth){
            return res.status(401).json({message:"No, autorizado"}
) }
try {
    const token=auth.split(" ")[1]; //selecciona al del espacio 1
    const decodeToken=jwt.verify(token, process.env.SECRET_KEY); //decodificamos el token creado en el controller
    req.user=decodeToken;
    next();

 } catch (error) {
    //next(new Error("token vencido"))
    return res.status(401).json({message:"token invalido y/o vencido"})
 }
}

function isAdmin(req,res,next){
      if(req.user.role!=="Admin"){
      return res.status(403).json({message:"Acceso denegado"})
   }
   next();
} 
module.exports={isAuth, isAdmin}