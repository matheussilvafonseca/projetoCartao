import { Response, Request } from "express";
import { CreateCartaoService } from "../../services/cartao/CreateCartaoService";

class CrateCartaoController{
    async handle(req: Request, res: Response){

        const {numero, nomeProprietario, validade, digitoSeguranca } = req.body;
        const id_usuario = req.user_id;

        const createCartaoService = new CreateCartaoService();

        const cartao = await createCartaoService.execute({numero, nomeProprietario, validade, digitoSeguranca, id_usuario});

        return res.json(cartao)
    }
}

export {CrateCartaoController}