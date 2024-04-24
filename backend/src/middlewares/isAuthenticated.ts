import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    //armazena o token enviado na requisição
    const authToken = req.headers.authorization;

    //verifica se o usuário enviou um token na requisição

    if(!authToken){
        return res.status(401).end();
    }
    const [, token] = authToken.split(" ")

    try{
        //validação do token
        const {sub} = verify(
            token,
            process.env.JWT_SECRET
        ) as PayLoad

        req.user_id = sub

        console.log(sub)
        return next();
    }
    catch (err){
        return res.status(401).end();
    }
}