import {Testimoniales} from "../models/Testimoniales.js" 

const guardarTestimonial = async (req,res) => {
    const {nombre,correo,mensaje} = req.body

    const errores = []

    if (nombre.trim() === "") {
        errores.push({mensaje: "El nombre esta vacio"})
    }

    if (correo.trim() === "") {
        errores.push({mensaje: "El correo esta vacio"})
    }

    if (mensaje.trim() === "") {
        errores.push({mensaje: "El mensaje esta vacio"})
    }

    if(errores.length > 0) {

        //consulto testimoniales existentes
        const testimoniales = await Testimoniales.findAll()

        //mostrar vista con errores
        res.render("testimoniales",{
            pagina: "Testimoniales",
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {
        //almacenamos info en base de datos  
        try {
            await Testimoniales.create({
                nombre,
                correo,
                mensaje
            })
            res.redirect("/testimoniales")
        } catch (error) {
            console.log(error)
        }
    }
} 


export {
    guardarTestimonial
}