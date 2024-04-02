const mongoose = require('mongoose'); 

const databaseConnection= ()=> {
    const connectionString = process.env.DDBB; 

mongoose.connect(connectionString);
const connection=mongoose.connection;
// dectectamos el evento cuando se conecta 
connection.once("open",()=> {
    console.log("DDBB CONNECT SUCCESFUL")
});
};
module.exports=databaseConnection ;

