import type { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";
import { createLike } from "./create-like.js";
import { getLike } from "./get-like.js";
import { deleteLikeById } from "./delete-like.js";

export async function likesRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: verifyJwt }, createLike)
  app.get('/:id', getLike)
  app.delete('/:id', { onRequest: verifyJwt }, deleteLikeById)
}