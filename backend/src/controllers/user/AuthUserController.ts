import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController{
    async handle(req: Request, res: Response){
        const {login, senha} = req.body;

        const authUserService = new AuthUserService();

        const auth = await authUserService.execute({
            login,
            senha
        })
        return res.json(auth);
    }  
}

export {AuthUserController}