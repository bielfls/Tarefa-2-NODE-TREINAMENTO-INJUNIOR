import cron from 'node-cron'
import { env } from '@/env/index.js'
import { SendHighlightsUseCase } from '@/use-cases/posts/send-highlights.js'

export function startDailyHighlightsJob() {
  cron.schedule(env.CRON_SCHEDULE, async () => {
    try {
      const useCase = new SendHighlightsUseCase()
      await useCase.execute()
    } catch (error) {
      console.error('Erro ao enviar os destaques:', error)
    }
  })
}