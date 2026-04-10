import { sendEmail } from '@/utils/send-emails.js'

export class SendHighlightsUseCase {
  async execute(): Promise<void> {
    console.log('busca pelos destaques do dia...')

    const mockUsers = [
      { name: 'Gabriel Felis', email: 'gabrielmfelis@gmail.com' }
    ]

    const topPosts24h = [
      { id: 1, titulo: 'Como largar o lol', likes: 300 },
      { id: 2, titulo: 'Como ficar challenger em lol', likes: 120 },
      { id: 3, titulo: 'Eu não aguento mais lol', likes: 135 },
      { id: 4, titulo: 'Como sair do bronze no lol', likes: 240}
    ]

    if (topPosts24h.length === 0) {
      console.log('nenhum post de destaque hoje.')
      return
    }

    //logica para ordenar os posts do maior pro menor
    const postsHtmlList = topPosts24h.sort((a, b) => b.likes - a.likes) 
    .map(post => `<li>${post.titulo} - ${post.likes} curtidas</li>`).join('')

    for (const user of mockUsers) {
      await sendEmail({
        to: user.email,
        subject: 'Posts mais curtidos',
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>Olá, ${user.name}!</h2>
            <p>Posts com mais likes nas últimas 24 horas:</p>
            <ul>
              ${postsHtmlList}
            </ul>
          </div>
        `,
      })
    }

    console.log('destaques do dia enviados com sucesso')
  }
}