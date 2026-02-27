import type { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";
import { createPost } from "./create-post.js";
import { listPosts } from "./list-posts.js";
import { getPost } from "./get-post.js";
import { updatePost } from "./update-post.js";
import { deletePostById } from "./delete-post.js";
import { createComment } from "../comments/create-comment.js";
import { listPostComments } from "../comments/list-post-comments.js";
import { listPostLikes } from "../likes/list-post-likes.js";

export async function postsRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: verifyJwt }, createPost)

  app.get('/', listPosts)

  app.get('/:id', getPost)

  app.put('/:id', { onRequest: verifyJwt }, updatePost)
  
  app.delete('/:id', { onRequest: verifyJwt }, deletePostById)


  app.post('/:postId/comments', { onRequest: verifyJwt }, createComment)

  app.get('/:id/comments', listPostComments)

  app.get('/:id/likes', listPostLikes)
}