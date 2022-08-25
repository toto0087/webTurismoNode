import express from "express"; //importamos express y lo tiramos a una variable
import router from "./routes/index.js";
import db from "./config/db.js"; //importamos base de datos
import dotenv from "dotenv"

dotenv.config()

console.log(process.env.DB_HOST)

const app = express(); // ahora tenemos una funcion para ejecutar express que lo tiene app. solo tenemos una instania de esta porque sin ose reiniciaria el servidor y no estaria conectado entre si

//conectamos db
db.authenticate()
    .then(() => console.log("Base de datos conectada"))
    .catch(error => console.log(error))

// definir puerto 
const port = process.env.PORT || 4000;

//habilita PUG 
app.set("view engine","pug");

// obtener año actual
app.use( (req,res,next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear() // esto crea una variable local , el "res locals" , la variable se alamacena en el objeyo de res y locals.
    res.locals.nombreSitio = "Agencia de viajes"
    console.log(res.locals);
    next(); //- ir al siguiente middleware
});

// agregar body parser para leer datos del form
app.use(express.urlencoded({extended: true }));

// definir carpeta publica
app.use(express.static("public"));

// agrega router
app.use("/",router); //agrega router a app.

app.listen(port, () => { //con listen ejecutamos el servidor y lo arrancamos, le pasamos el puerto sobre el cual queremos ejecutar luego tenemos un callback que si funciona bien nos dice eso
    console.log(`el servidor funciona en el puerto ${port}`)
})

