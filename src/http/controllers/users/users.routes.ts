import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import { listUserComments } from '../comments/list-user-comments.js'
import { listUserLikes } from '../likes/list-user-likes.js'
import { listUserPosts } from '../posts/list-user-posts.js'
import { authenticate } from './authenticate.js'
import { deleteUserById } from './delete-user.js'
import { forgotPassword } from './forgot-password.js'
import { getUserById } from './get-user-profile.js'
import { listUsers } from './list-users.js'
import { register } from './register.js'
import { resetPassword } from './reset-password.js'
import { updateUser } from './update-user.js'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', register)

  app.get('/', listUsers)

  app.delete('/:publicId', { onRequest: verifyJwt }, deleteUserById)

  app.put('/:publicId', { onRequest: verifyJwt }, updateUser)

  app.get('/:publicId', getUserById)

  app.get('/:publicId/posts', listUserPosts)

  app.get('/:publicId/likes', listUserLikes)

  app.get('/:publicId/comments', listUserComments)

  app.post('/password/forgot', forgotPassword)

  app.patch('/password/reset', resetPassword)
}

export async function authRoutes(app: FastifyInstance) {
  app.post('/login', authenticate)
}
