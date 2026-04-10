import { randomBytes } from 'node:crypto'
import { sendEmail } from '@/utils/send-emails.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'

interface ForgotPasswordUseCaseRequest {
  email: string
}

const EXPIRES_IN_MINUTES = 15
const TOKEN_LENGTH = 32

export class ForgotPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email }: ForgotPasswordUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const passwordToken = randomBytes(TOKEN_LENGTH).toString('hex')

    const resetLink = `http://localhost:3333/reset-password?token=${passwordToken}`
    //aqui usei a ajuda do gemini para ajudar na estilização do email só pra ver bonitinho kkkk
    await sendEmail({
      to: user.email,
      subject: 'Recuperação de Senha - Treinamento INJUNIOR',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333;">Recuperação de Senha</h2>
          <p>Olá, <strong>${user.name}</strong>!</p>
          <p>Recebemos uma solicitação para redefinir a senha da sua conta. Se foi você, clique no botão abaixo:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #007bff; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Redefinir Minha Senha
            </a>
          </div>
          
          <p style="color: #d9534f; font-weight: bold; font-size: 14px;">
            Atenção: Este link expira em ${EXPIRES_IN_MINUTES} minutos.
          </p>
          <p style="color: #666; font-size: 14px;">Se você não solicitou essa alteração, pode ignorar este e-mail em segurança.</p>
        </div>
      `,
    })
  }
}