import User from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const showUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}

export const showUser = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, lastname, email, password, phone, address } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear un nuevo usuario con la contraseña hasheada
        const newUser = new User({ name, lastname, email, password: hashedPassword, phone, address, photo });
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar el usuario por su correo electrónico
        const user = await User.findOne({ email });

        // Si no se encuentra el usuario, devolver un error
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Si la contraseña es incorrecta, devolver un error
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar un token JWT
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1m',
        });

        // Enviar el token en la respuesta
        res.json({ token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export const loginUserGoogle = async (req, res) => {
    try {
        const { tokenId } = req.body;

        // Verificar el token de id de Google
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, name, picture } = ticket.getPayload();

        // Aquí puedes buscar al usuario en tu base de datos por su correo electrónico
        // Si no existe, puedes crear un nuevo usuario con los datos proporcionados por Google

        // Generar un token JWT
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1m', // El token expirará en 1 hora
        });

        // Enviar el token en la respuesta
        res.json({ token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}