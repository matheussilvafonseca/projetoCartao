import { PrismaClient } from "@prisma/client"
import prismaClient from "../../prisma"

import { hash } from 'bcryptjs'

interface UserRequest {
    nome: string,
    email: string,
    login: string,
    senha: string
}

class CreateUserService{
    async execute({nome, email, login, senha}: UserRequest){
        
        //verificar se foi enviado o valor do e-mail
        if(!login){
            return("Erro, login não enviado!");
        }

        //verifica se o email já foi cadastrado
        const UserAlreadyExists = await prismaClient.usuario.findFirst({
            where:{
                login: login
            }
        })
        if(UserAlreadyExists){
            return("Erro, login já cadastrado!");
        }
        // criptografando a senha
        const senhaHash = await hash(senha,8)
        
        //cadastro no banco de dados
    const user = await prismaClient.usuario.create({
        data:{
            nome: nome,
            email: email,
            login: login,
            senha: senhaHash,
        },
        select:{
            id: true,
            nome: true,
            email: true,
            login: true,
        }
    })
    return user;
    }
    
}

export {CreateUserService}