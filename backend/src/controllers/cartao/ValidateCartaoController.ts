import { Request, Response } from "express";
import { ValidateCartaoService } from "../../services/cartao/ValidateCartaoService";

class ValidateCartaoController{
    async handle(req: Request, res: Response){
        const {numero, digitoSeguranca} = req.body;
        const id_usuario = req.user_id;

        const validateCartaoService = new ValidateCartaoService();

        const cartao = await validateCartaoService.execute({numero, digitoSeguranca, id_usuario});

        return res.json(cartao)
    }
}

export {ValidateCartaoController}