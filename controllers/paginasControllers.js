import { Viaje } from "../models/Viaje.js";
import { Testimoniales } from "../models/Testimoniales.js";

const paginaInicio = async (req,res) => { //Request es lo que enviamos, response es lo que express nos envia

    const promiseDB = [];

    promiseDB.push( Viaje.findAll({limit: 3}) )
    promiseDB.push( Testimoniales.findAll({limit: 3}) )

    try {
        // multiple consulta a BD 
        const resultado = await Promise.all(promiseDB)

        res.render("inicio", {
            pagina: "Inicio",
            clase: "home",
            viajes: resultado[0],
            testimoniales: resultado[1]

        }) 
    } catch (error) {
        console.log(error)
    }
    
    res.render("inicio", {
        pagina: "Inicio",
        clase: "home"
    })  //. send muestra algo en pantalla luego res.json crea respuesta en json y res.render muestra una vista 
};

const paginaNosotros = (req,res) => { //Request es lo que enviamos, response es lo que express nos envia
    // Consultar BD
    res.render("nosotros", {
        pagina: "Nosotros"
    }); //aqui podemos colocar toda la info para mandar al archivo de nosotros
}; //. send muestra algo en pantalla luego res.json crea respuesta en json y res.render muestra una vista 

const paginaViajes = async (req,res) => { 
    const viajes = await Viaje.findAll();

    console.log(viajes)

    res.render("viajes", {
        pagina: "Viajes",
        viajes
    }); 
};

const paginaTestimoniales = async (req,res) => { // renderizamos pag de testimoniales y consultamos base de datos para llevar los testimoniales ahi
    try {
        const testimoniales = await Testimoniales.findAll()

        res.render("testimoniales", {
        pagina: "Testimoniales",
        testimoniales
    });
    } catch (error) {
        console.log(error)
    }
    
 
};

// meustra un viaje por su slug 
const paginaDetalleViaje = async (req,res) => { 

    const {slug} = req.params 

    try {
        const viaje = await Viaje.findOne({where : { slug: slug }})

        res.render("viaje", {
            pagina: "Informacion Viaje",
            viaje
        })
    } catch (error) {
        console.log(error)
    }

};

export { 
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}

