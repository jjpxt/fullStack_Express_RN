import { CreateUser } from "@/@types/user";
import { RequestHandler } from "express";
import User from "@/models/user";

export const create: RequestHandler = async (req: CreateUser, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({ user });
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({
                error: "This email already has been used! Try another one :)"
            });
        }
        res.status(500).json({ error: "Error trying create a new user." })
    }
}