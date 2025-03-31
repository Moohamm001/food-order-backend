import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { VendorPayload } from '../dto';
import { APP_SECRET } from '../config';

export const generateToken = (payload: VendorPayload) => {
    return jwt.sign(payload, APP_SECRET, { expiresIn: '1h' });
}


export const verifyToken = async (req: Request) => {
    const signedToken = req.headers['authorization'];
    
    if ( signedToken ){
        const payload = await jwt.verify(signedToken.split(' ')[1], APP_SECRET) as VendorPayload;

        req.user = payload;
        return true;
    }
}