import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './libs/prisma.js'
import { hash, compare } from "bcryptjs"
import cors from '@fastify/cors'

export const app = fastify()

app.register(cors)

app.post('/users', async (request, reply) => {
    const registerBodySchema = z.object({
        name: z.string().trim().min(1).max(100),
        foto: z.string(),
        email: z.email().max(100),
        password: z.string().min(8).max(100),
    })

    const { name, foto, email, password } = registerBodySchema.parse(request.body)

    const userWithSameEmail = await prisma.user.findFirst({
        where: {
            email
        },
    })

    if (userWithSameEmail) {
        return reply.status(409).send({ message: 'This email is already in use.'})
    }

    const passwordHash = await hash(password, 10)

    const user = await prisma.user.create({
        data: {
            name,
            foto,
            email,
            passwordHash
        }
    })

    return reply.status(201).send(user)
})

app.post('/posts', async (request, reply) => {
    const registerBodySchema = z.object({
        titulo: z.string().min(1).max(100),
        conteudo: z.string().min(1),
        userId: z.number()
    })

    const { titulo, conteudo, userId } = registerBodySchema.parse(request.body)

    const post = await prisma.post.create({
        data: {
            titulo,
            conteudo,
            userId
        }
    })

    return reply.status(201).send(post)
})

app.get('/users', async (request, reply) => {
    const users = await prisma.user.findMany()

    return reply.status(200).send(users)
})

app.get('/posts', async (request, reply) => {
    const posts = await prisma.post.findMany()

    return reply.status(200).send(posts)
})

app.delete('/users/:id', async (request, reply) => {
    const deleteUserParamsSchema = z.object({
        id: z.coerce.number(),
    })
    const { id } = deleteUserParamsSchema.parse(request.params)

    await prisma.user.delete({
        where: {
            id
        },
    })

    return reply.status(204).send()
})

app.delete('/posts/:id', async (request, reply) => {
    const deletePostParamsSchema = z.object({
        id: z.coerce.number(),
    })

    const { id } = deletePostParamsSchema.parse(request.params)

    await prisma.post.delete({
        where: {
            id
        },
    })

    return reply.status(204).send()
})

app.put('/users/:id', async (request, reply) => {
    let passwordHash: string | undefined = undefined
    
    const updateUserBodySchema = z.object({
        name: z.string().trim().min(1).max(100).optional(),
        foto: z.string().optional(),
        email: z.email().max(100).optional(),
        password: z.string().min(8).max(100).optional(),
    })
    const updateParamsSchema = z.object({
        id: z.coerce.number(),
    })

    const { name, foto, email, password } = updateUserBodySchema.parse(request.body)
    const { id } = updateParamsSchema.parse(request.params)

    if(email){
        const userWithSameEmail = await prisma.user.findFirst({
            where: {
                email,
                id: {not: id},
            },
        })
        if (userWithSameEmail) {
            return reply.status(409).send({ message: 'This email is already in use.'})
        }
    }

    if(password){
        passwordHash = await hash(password, 10)
    }

    await prisma.user.update({
        where: {
            id
        },
        data: {
            name,
            foto,
            email,
            passwordHash,
        }
    })

    return reply.status(204).send()
})

app.put('/posts/:id', async (request, reply) => {
    const updatePostBodySchema = z.object({
        titulo: z.string().min(1).max(100).optional(),
        conteudo: z.string().min(1).optional(),
    })
    const updateParamsSchema = z.object({
        id: z.coerce.number(),
    })

    const { titulo, conteudo } = updatePostBodySchema.parse(request.body)
    const { id } = updateParamsSchema.parse(request.params)

    await prisma.post.update({
        where: {
            id
        },
        data: {
            titulo,
            conteudo,
        }
    })

    return reply.status(204).send()
})

app.get('/users/:id', async (request, reply) =>{
    const getParamsSchema = z.object({
        id: z.coerce.number(),
    })

    const { id } = getParamsSchema.parse(request.params)

    const user = await prisma.user.findUnique({ where: { id }})

    if(!user){
        return reply.status(404).send()
    }

    return reply.status(200).send(user)
})


app.get('/posts/:id', async (request, reply) =>{
    const getParamsSchema = z.object({
        id: z.coerce.number(),
    })

    const { id } = getParamsSchema.parse(request.params)

    const post = await prisma.post.findUnique({ where: { id }})

    if(!post){
        return reply.status(404).send()
    }

    return reply.status(200).send(post)
})

app.get('/users/:id/posts', async (request, reply) =>{
    const getParamsSchema = z.object({
        id: z.coerce.number(), 
    })

    const { id } = getParamsSchema.parse(request.params)

    const posts = await prisma.post.findMany({
        where: {
            userId: id,
        }
    })

    return reply.status(200).send(posts)
})

app.post('/login', async (request, reply) =>{
    const getUserBodySchema = z.object({
        email: z.email().max(100),
        password: z.string().min(8).max(100),
    })

    const { email, password } = getUserBodySchema.parse(request.body)

    const user = await prisma.user.findUnique({
        where: {
            email,
        }
    })

    if(!user){
        return reply.status(401).send({ message: 'Email ou senha inválidos.' })
    }

    // 2. Compara a senha digitada com o hash do banco
    const isPasswordValid = await compare(password, user.passwordHash)

    if(!isPasswordValid){
        return reply.status(401).send({ message: 'Email ou senha inválidos.' })
    }

    return reply.status(200).send(user)
})