const model  = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

        // Generar JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            token: token
        });

    }catch(error){
        console.error('Error al registrar usuario:', error.message);
        res.status(500).json({message: 'Error interno del servidor'});
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await model.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Crear objeto de usuario sin la contraseña
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        };

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token: token,
            user: userResponse
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = {registerUser, loginUser};