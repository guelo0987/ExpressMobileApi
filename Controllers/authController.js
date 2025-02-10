const model  = require('../Models/User');
const bcrypt = require('bcryptjs');

const registerUser   = async (req, res) => {

    try{
        const {name, email, password} = req.body;

        let user = await model.findOne({email: email});

        if(user){
            return res.status(400).json({message: 'El usuario ya existe'});
        }
        
        user = new model({name, email, password});
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        res.status(201).json({message: 'Usuario registrado exitosamente'});

    }catch(error){
        console.error('Error al registrar usuario:', error.message);
        res.status(500).json({message: 'Error interno del servidor'});
    }
}

const loginUser = async (req, res) => {
    try{

    const {email , password} = req.body;

    let user  = await model.findOne({email: email});

    if(!user){
        return res.status(400).json({message: 'Usuario no encontrado'});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({message: 'Contraseña incorrecta'});
    }

    res.status(200).json({message: 'Inicio de sesión exitoso'});

    }catch(error){
    console.error('Error al iniciar sesión:', error.message);
    res.status(500).json({message: 'Error interno del servidor'});
}

}


module.exports = {registerUser, loginUser};