import { describe, it, expect, vi } from 'vitest'
import { AuthenticateUseCase } from './authenticate.js'
import { compare } from 'bcryptjs'

//interceptando o bcryptjs pra nao rodar de verdade
vi.mock('bcryptjs', () => ({
  compare: vi.fn().mockResolvedValue(true),
}))

const makeUsersRepositoryMock = () => {
  return {
    findByEmail: vi.fn(),
  } as any
}

describe('Authenticate Use Case', () => {
  it('deve retornar o usuário quando o email e a senha estiverem corretos', async () => {
    const usersRepositoryMock = makeUsersRepositoryMock()

    usersRepositoryMock.findByEmail.mockResolvedValue({
      id: 'user-falso-123',
      name: 'Gabriel',
      email: 'biel@test.com',
      passwordHash: 'senha',
      created_at: new Date(),
    })

    const sut = new AuthenticateUseCase(usersRepositoryMock)

    const { user } = await sut.execute({
      email: 'biel@test.com',
      password: 'senhaa',
    })

    expect(user.id).toEqual('user-falso-123')

    expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith('biel@test.com')

    expect(compare).toHaveBeenCalledWith('senhaa', 'senha')
  })
})