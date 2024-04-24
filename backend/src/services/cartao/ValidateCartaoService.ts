import prismaClient from "../../prisma";

interface DadosCartao{
    numero: string,
    digitoSeguranca: string,
    id_usuario: string
}

class ValidateCartaoService{
    async execute({numero, digitoSeguranca, id_usuario}: DadosCartao){
        // valida se todos os dados foram enviados
        if(!numero || !digitoSeguranca){
            return("Não foi enviado todos os dados, por favor insira todos os dados!");
        }

        const CartaoAlreadyExists = await prismaClient.cartao.findFirst({
            where:{
                numero: numero,
                digitoSeguranca: digitoSeguranca
            }
        })
        if(!CartaoAlreadyExists){
            return("O cartão informado não existe, valide se os dados estão corretos")
        }
        if(CartaoAlreadyExists.id_usuario != id_usuario){
            return("Uso negado, o usuário que está informando o cartão não foi o mesmo que o cadastrou")
        }
        if(CartaoAlreadyExists && CartaoAlreadyExists.id_usuario == id_usuario){
            return ("Compra aprovada!")
        }
    }
}

export{ValidateCartaoService}