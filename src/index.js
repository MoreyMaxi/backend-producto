const express = require('express');
const cors = require ('cors');
const morgan = require('morgan');
const path=require('path');

// crear una instancia de express 

const app = express ();
// configuramos el acceso a las variables de entorno 
require('dotenv').config();


// configura el puerto donde se ejecuta el servidor - backend

app.set('port',process.env.PORT || 9001);

// ponerlo permanente al puerto 
app.listen(app.get('port'), ()=>{console.log(`back end products linstening in port ${app.get('port')}`);});

// middleaware nativos de express 
app.use(express.json());// permite recibir objetos en formato json. 
app.use(express.urlencoded({extended:true}));// permite recibir objetos de tood tipo en las peticiones

//middlewares de terceros
app.use(morgan('dev')); // proporciona detalles de las peticones en la terminal
app.use(cors()); //permite las peticiones remotas

// para ver si el servidor esta vivo, vemos el archivo estatico index.html
///console.log(__dirname,'DIRNAME')
app.use(express.static(path.join(__dirname,'../public')));

// creamios una ruta de prueba 
/*
tipo de peticiones
GET: obtener, pedir, leer
PUT / PATCH : ACTUALIZAR
POST : CREAR Y ENVIAR INFORMAICON DESDE EL CLIENTE AL BACKEND O SERVIDOR
DELETE : BORRAR. 
*/
// req=resquest (contiene toda la informacion de la peticion del cliente al servidor)
// res=response(contiene toda la informacion de la repuesta del servidor al cliente)
//next indica que continue con la siguiente funcion o mddleware

app.get('/test',async(req,res,next)=>{
    try {
        console.log('request>',req);
        return res.status(200).json({succes:true, message:'API IS ALIVE'});

    } catch (error) {
        console.error(error);
        next(error);
    }
})