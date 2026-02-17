import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";


const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        });
        // console.log("data", newUser)

        await newUser.save();
        res.status(200).send("User has been created.");
    } catch (err) {
        next(err);
    }
};

export default register