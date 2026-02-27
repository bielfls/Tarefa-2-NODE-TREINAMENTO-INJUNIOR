import type { FastifyInstance } from "fastify";
import { usersRoutes, authRoutes } from "./controllers/users/users.routes.js";
import { postsRoutes } from "./controllers/posts/posts.routes.js";
import { commentsRoutes } from "./controllers/comments/comments.routes.js";
import { likesRoutes } from "./controllers/likes/likes.routes.js";

export async function appRoutes(app: FastifyInstance) {
    app.register(authRoutes)
    app.register(usersRoutes, { prefix: '/users' })
    app.register(postsRoutes, { prefix: '/posts' })
    app.register(commentsRoutes, { prefix: '/comments' })
    app.register(likesRoutes, { prefix: '/likes' })
}