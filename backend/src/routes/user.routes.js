import { registerUser, loginUser,logoutUser } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import {Router} from "express";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyUser, logoutUser);

export default router;