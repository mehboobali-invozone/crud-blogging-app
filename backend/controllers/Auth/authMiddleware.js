import jwt from 'jsonwebtoken';

// Middleware to check JWT token and role
export const verifyRole = (roles) => {
    return (req, res, next) => {
        const token = req.cookies.access_token; // Read the token from cookies

        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        try {
            const user = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify JWT
            req.user = user; // Attach the user data to the request object

            // Check if user's role is allowed
            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: "You do not have permission to access this route" });
            }

            next(); // Proceed to the next middleware/controller
        } catch (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
    };
};
