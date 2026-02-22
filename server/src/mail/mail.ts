import { MAILTRAP_PASSWORD, MAILTRAP_USER, VERIFICATION_EMAIL } from "@/utils/variables";
import EmailVerificationToken from "@/models/EmailVerificationToken";
import { generateTemplate } from "@/mail/template";
import nodemailer from 'nodemailer';
import path from "path";

interface Profile {
    name: string;
    email: string;
    userId: string;
}

const generateMailTransporter = () => {
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: MAILTRAP_USER,
            pass: MAILTRAP_PASSWORD
        }
    });

    return transport;
}

export const sendVerificationMail = async (token: string, profile: Profile) => {
    const transport = generateMailTransporter();

    const { name, email, userId } = profile;

    const welcomeMessage = `Hi ${name} welcome to Podify! Use the given OTP to verify your account :)`

    transport.sendMail({
        to: email,
        from: VERIFICATION_EMAIL,
        subject: "Welcome message",
        html: generateTemplate({
            title: "Welcome to Podify",
            message: welcomeMessage,
            logo: "cid:logo",
            banner: "cid:welcome",
            link: "#",
            btnTitle: token
        }),
        attachments: [
            {
                filename: "logo.png",
                path: path.join(__dirname, "../mail/logo.png"),
                cid: "logo"
            },
            {
                filename: "welcome.png",
                path: path.join(__dirname, "../mail/welcome.png"),
                cid: "welcome"
            }
        ]
    });
}
