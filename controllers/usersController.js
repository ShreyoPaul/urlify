import prisma from '../DB/connectionDB.js';
import { hashPassword, generateJWT, comparePassword } from '../utils/authenticate.js';

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(typeof password, password);

    try {
        const user = await prisma.url_shortner_user.findFirst({ where: { email } })
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }
        if (!await comparePassword(password, user.password)) {
            return res.status(400).json({ message: 'Invalid password!' });
        }
        const token = generateJWT({ user });
        res.status(200).json({ message: 'Login successful!', token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        else if (await prisma.url_shortner_user.findFirst({ where: { email } })) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        const user = await prisma.url_shortner_user.create({
            data: {
                email,
                password: hashedPassword,
                username: name
            }
        })
        console.log(user);
        const token = generateJWT({ user });
        res.status(200).json({ message: 'User registered successfully', user, token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export { loginUser, registerUser };