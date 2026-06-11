import axios from "axios";
import { User } from "../models/user.model.js";

export const googleOAuth = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) {
      return res.status(400).json({ message: "Authorization code is missing" });
    }
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
        grant_type: "authorization_code",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const googleAccessToken = tokenResponse.data.access_token;
    if (!googleAccessToken)
      return res.status(400).json({ message: "No access token" });
    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      },
    );
    const { email, name, picture } = userInfoResponse.data;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        fullname: name,
        email,
        username: email.split("@")[0],
        password: Math.random().toString(36).slice(-8),
        avatar: picture || undefined,
      });
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();
    const options = {
      httpOnly: true,
      secure: true,
    };
    res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .redirect("http://localhost:5173/");
  } catch (err) {
    console.log("Error in Google OAuth:", err);
    res.status(500).json({ message: "Google OAuth failed" });
  }
};

export const githubOAuth = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) {
      return res.status(400).json({ message: "Authorization code is missing" });
    }
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        code,
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
      },
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    const githubAccessToken = tokenResponse.data.access_token;
    if (!githubAccessToken) {
      return res
        .status(400)
        .json({ message: "No access token received from GitHub" });
    }
    const userInfoResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
      },
    });
    const { login, name, avatar_url } = userInfoResponse.data;
    let email = userInfoResponse?.data?.email;
    if (!email) {
      try {
        const emailsResponse = await axios.get(
          "https://api.github.com/user/emails",
          {
            headers: {
              Authorization: `Bearer ${githubAccessToken}`,
              Accept: "application/vnd.github+json",
            },
          },
        );

        const primaryEmail = emailsResponse.data.find(
          (e) => e.primary && e.verified,
        );

        email = primaryEmail?.email;
      } catch (err) {
        console.log("Couldn't fetch GitHub email");
      }
    }
    let user = await User.findOne({ username: login });
    if (!user) {
      user = await User.create({
        fullname: name,
        email,
        username: login,
        password: Math.random().toString(36).slice(-8),
        avatar: avatar_url || undefined,
      });
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();
    const options = {
      httpOnly: true,
      secure: true,
    };
    res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .redirect("http://localhost:5173/");
  } catch (err) {
    console.log("Error in GitHub OAuth:", err);
    res.status(500).json({ message: "GitHub OAuth failed" });
  }
};
