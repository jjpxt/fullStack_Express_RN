import EmailVerificationToken from "@/models/EmailVerificationToken";
import { CreateUser, VerifyEmailRequest } from "@/@types/user";
import { sendVerificationMail } from "@/mail/mail";
import { generateToken } from "@/utils/helper";
import { RequestHandler } from "express";
import User from "@/models/user";
import { isValidObjectId } from "mongoose";

export const create: RequestHandler = async (req: CreateUser, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({ name, email, password });

        const token = generateToken();

        await EmailVerificationToken.create({
            owner: user._id,
            token
        });

        sendVerificationMail(token, { name, email, userId: user._id.toString() });

        res.status(201).json({ user: { id: user._id, name, email } });
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({
                error: "This email already has been used! Try another one :)"
            });
        }
        res.status(500).json({ error: "Error trying create a new user." });
    };
};

export const verifyEmail: RequestHandler = async (req: VerifyEmailRequest, res) => {
    const { token, userId } = req.body;

    const verificationToken = await EmailVerificationToken.findOne({
        owner: userId
    });

    if (!verificationToken)
        return res.status(403).json({ error: "Invalid token" });

    const matched = await verificationToken.compareToken(token);

    if (!matched)
        return res.status(403).json({ error: "Invalid token" });

    await User.findByIdAndUpdate(userId, { verified: true });

    await EmailVerificationToken.findByIdAndDelete(verificationToken._id);

    res.json({ message: "Your email is now verified :]" });
};

export const sendReverificationToken: RequestHandler = async (req, res) => {
    const { userId } = req.body;

    if (!isValidObjectId(userId))
        return res.status(403).json({ error: "Invalid request" });

    const user = await User.findById(userId);

    if (!user) return res.status(403).json({ error: "Invalid request" });

    await EmailVerificationToken.findOneAndDelete({
        owner: userId
    });
    const token = generateToken();

    await EmailVerificationToken.create({
        owner: userId,
        token
    });

    sendVerificationMail(token, {
        name: user?.name,
        email: user?.email,
        userId: user?._id.toString()
    });

    res.json({ message: "Please check your email." });
};

