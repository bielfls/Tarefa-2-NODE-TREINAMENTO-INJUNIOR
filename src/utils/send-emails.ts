import nodemailer, { type SentMessageInfo } from 'nodemailer'
import { env } from '@/env/index.js'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
})

interface SendEmailRequest {
  to: string
  subject: string
  message?: string
  html: string
}

export async function sendEmail({
  to,
  subject,
  message,
  html,
}: SendEmailRequest): Promise<SentMessageInfo> {
  try {
    const info = await transporter.sendMail({
      from: `Equipe Trainee <${env.EMAIL_USER}>`,
      to,
      subject,
      text: message,
      html,
    })

    console.log(`E-mail enviado com sucesso para ${to}! ID: ${info.messageId}`)
    return info
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error)
    throw error
  }
}
