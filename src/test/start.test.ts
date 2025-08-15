import { Start } from '../commands/start';

describe('start', () => {
  test('первое сообщение', async () => {
    const ctx = {
      reply: jest.fn(),
      from: { id: 123 }
    } as any

    await Start(ctx);
    expect(ctx.reply).toHaveBeenCalledWith(
      'Добро пожаловать! Используйте /register для регистрации'
    )
  })
})