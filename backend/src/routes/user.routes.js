import { registerUser, loginUser,logoutUser } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { googleOAuth , githubOAuth} from "../controllers/oauth.controller.js";
import {Router} from "express";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyUser, logoutUser);

router.get('/google/callback', googleOAuth);
router.get('/google/login',(req, res)=>{
    const redirectUri= process.env.GOOGLE_OAUTH_REDIRECT_URI;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;
    res.redirect(authUrl);
})

router.get('/github/callback', githubOAuth);
router.get('/github/login',(req, res)=>{
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = process.env.GITHUB_OAUTH_REDIRECT_URI;
    //const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;
    const authUrl =
  `https://github.com/login/oauth/authorize` +
  `?client_id=${clientId}` +
  `&redirect_uri=${redirectUri}` +
  `&scope=user:email`;
    res.redirect(authUrl);
});
export default router;