import {NextFunction, Request, Response} from "express";
import logger from "../utils/logger";

const jwt = require("jsonwebtoken");
const config = require('../config');

async function verifyToken(req: Request, res: Response, next: NextFunction) {
    /*
     * Check if authorization header is set
     */
    if( req.headers && req.headers.authorization) {
        try {
            /*
             * Try to decode & verify the JWT token
             * The token contains user's id ( it can contain more informations )
             * and this is saved in req.user object
             */
            let user =  jwt.verify(req.headers.authorization.split(' ')[1], config.JWT_SECRET)
            res.locals.user = user
            return next()
        } catch(err) { 
            logger.error('authentication failed')
        }
    } 
    return res.status(401).send({message: 'authentication required'})

};
module.exports = { verifyToken }