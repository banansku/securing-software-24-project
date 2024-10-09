/**
 * Here is the implementation for the webtoken auth
 */

//import jwt from 'jsonwebtoken';
//
//// SECRET_KEY should be in a separate .env file or in some cloud parameter store
//const SECRET_KEY = 'your_secret_key';
//
//export const generateToken = (userId: number): string => {
//    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
//};
//
//export const authenticateToken = (req: any, res: any, next: any) => {
//    const token = req.headers['authorization'];
//
//    if (!token) {
//        return res.status(401).json({ error: 'Access denied. No token provided.' });
//    }
//
//    try {
//        const decoded = jwt.verify(token, SECRET_KEY);
//        req.user = decoded;
//        next();
//    } catch (error) {
//        return res.status(403).json({ error: 'Invalid token.' });
//    }
//};