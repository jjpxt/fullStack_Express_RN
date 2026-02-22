import { CreateUserSchema, EmailValidationBody } from "@/utils/validationSchema";
import { create, sendReverificationToken, verifyEmail } from "@/controllers/user";
import { validate } from "@/middleware/validator";
import { Router } from "express";

const router = Router();

router.post('/create', validate(CreateUserSchema), create);
router.post('/verify-email', validate(EmailValidationBody), verifyEmail);
router.post('/re-verify-email', sendReverificationToken);

export default router;