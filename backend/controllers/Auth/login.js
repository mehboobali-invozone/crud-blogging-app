import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from 'cookie';

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ success: false, message: "email or password is incorrect" });
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordCorrect) {
            return res.status(404).send({ success: false, message: "Username or password is incorrect" });
        }
        // user's role in the token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );
        const { password, ...otherDetails } = user._doc;
        // Set token in cookie
        res.setHeader('Set-Cookie', cookie.serialize('access_token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60, // Cookie expires in 1 hour
        }));

        res.status(200).send({ details: { ...otherDetails }, token: token });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

export default login;
