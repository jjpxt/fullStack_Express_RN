import { MAILTRAP_PASSWORD, MAILTRAP_USER } from "@/utils/variables";
import EmailVerificationToken from "@/models/EmailVerificationToken";
import { generateToken } from "@/utils/helper";
import { CreateUser } from "@/@types/user";
import { RequestHandler } from "express";
import nodemailer from 'nodemailer'
import User from "@/models/user";

export const create: RequestHandler = async (req: CreateUser, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({ name, email, password });

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: MAILTRAP_USER,
                pass: MAILTRAP_PASSWORD
            }
        });

        const token = generateToken();

        await EmailVerificationToken.create({
            owner: user._id,
            token
        });

        transport.sendMail({
            to: user.email,
            from: "aut@myapp.com",
            html: `<h1> Hey jude ${token} </h1>`
        });

        res.status(201).json({ user });

    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({
                error: "This email already has been used! Try another one :)"
            });
        }
        res.status(500).json({ error: "Error trying create a new user." });
    }
}