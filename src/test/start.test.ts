import { start } from '../commands/start';

test('первое сообщение', async () => {
  const ctx = {
    reply: jest.fn(),
    from: { id: 123 }
  } as any

  await start(ctx);
  expect(ctx.reply).toHaveBeenCalledWith(
    'Добро пожаловать! Используйте /register для регистрации'
  )
})
