import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
import endpoint  from '../endpoints.config'
dotenv.config();

export const createToken = (email: string, user_role: string) => {
    return jwt.sign(
        {
            email: email,
            userRole: user_role,
        },
        // process.env.JWT_SECRET
        endpoint.JWT_SECRET,
        {
            expiresIn: endpoint.EXPIRESIN_TOKEN,
        }
    );
};

