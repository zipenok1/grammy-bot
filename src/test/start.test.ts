import { Start } from '../commands/start';

describe('/start command', () => {
  test('should send welcome message', async () => {
    const ctx = {
      reply: jest.fn(),
      from: { id: 123 }
    } as any;

    await Start(ctx);
    expect(ctx.reply).toHaveBeenCalledWith(
      'Добро пожаловать! Используйте /register для регистрации'
    );
  });
});