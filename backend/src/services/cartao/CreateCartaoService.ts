import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prisma";
import { AuthUserService } from "../user/AuthUserService";


interface UserRequest {
    numero: string,
    nomeProprietario: string,
    validade: string,
    digitoSeguranca: string,
    id_usuario: string
}

class CreateCartaoService {

    async execute({ numero, nomeProprietario, validade, digitoSeguranca, id_usuario }: UserRequest) {
        //verifica se os dados foram enviados
        if (!numero || !nomeProprietario || !validade || !digitoSeguranca) {
            return("Não foram enviados todos os dados do cartão, por favor envie todos os dados");
        }
        //verfiica se o cartão já existe
        const CartaoAlreadyExists = await prismaClient.cartao.findFirst({
            where: {
                numero: numero
                
            }
        })
        if (CartaoAlreadyExists) {
            return("Esse cartão já está cadastrado, não é possível cadastrá-lo novamente");
        }
        //cadastro no banco de dados
        const cartao = await prismaClient.cartao.create({
            data: {
                numero: numero,
                nomeProprietario: nomeProprietario,
                validade: validade,
                digitoSeguranca: digitoSeguranca,
                id_usuario: id_usuario

            },
            select: {
                id: true,
                numero: true,
                nomeProprietario: true,
                validade: true,
                digitoSeguranca: true,
            }
        })
        return cartao;
    }
}

export { CreateCartaoService }