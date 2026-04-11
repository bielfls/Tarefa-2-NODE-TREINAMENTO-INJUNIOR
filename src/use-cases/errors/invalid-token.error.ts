export class InvalidTokenError extends Error {
  constructor() {
    super('Token inválido!')
  }
}
