import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


interface AuthRequest{
    login: string;
    senha: string;
}

class AuthUserService{
    async execute({login, senha}: AuthRequest){
        //verifica se o login está cadastrado
        const user = await prismaClient.usuario.findFirst({
            where:{
                login: login
            }
        })
        if(!user){
            return("Usuário ou senha incorretos!");
        }
        //verificar se a senha está correta
        const senhaMatch = await compare(senha, user.senha);

        if(!senhaMatch){
            return("Usuário ou senha incorretos");
        }
        //gerar um token JWT para o usuario
        const token = sign(
            {
                nome: user.nome,
                usuario: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )
        return{
            id:user.id,
            nome: user.nome,
            email: user.email,
            login: user.login,
            token: token
        }
    }
}

export {AuthUserService};