import type { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";
import { listComments } from "./list-comments.js";
import { getComment } from "./get-comment.js";
import { updateComment } from "./update-comment.js";
import { deleteCommentById } from "./delete-comment.js";
import { listCommentLikes } from "../likes/list-comment-likes.js";

export async function commentsRoutes(app: FastifyInstance) {
  app.get('/', listComments)

  app.get('/:id', getComment)
  
  app.put('/:id', { onRequest: verifyJwt }, updateComment)
  
  app.delete('/:id', { onRequest: verifyJwt }, deleteCommentById)

  app.get('/:id/likes', listCommentLikes)
}