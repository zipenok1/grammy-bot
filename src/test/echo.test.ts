import { Echo } from '../commands/echo';

describe('echo', () => {
  test('повторение сообщений', async () => {
    const text = 'Привет'
    const ctx = {
      reply: jest.fn(),
      message: {text}
    } as any

    await Echo(ctx);
    expect(ctx.reply).toHaveBeenCalledWith(text);
  })

  test('пустая строка', async () => {
    const ctx = {
      reply: jest.fn(),
      message: {}
    } as any

    await Echo(ctx);
    expect(ctx.reply).not.toHaveBeenCalled();
  })
})