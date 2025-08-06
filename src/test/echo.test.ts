import { Echo } from '../commands/echo';

describe('Echo handler', () => {
  test('should echo text messages', async () => {
    const text = 'Привет';
    const ctx = {
      reply: jest.fn(),
      message: {text}
    } as any;

    await Echo(ctx);
    expect(ctx.reply).toHaveBeenCalledWith(text);
  });

  test('should not reply if no text', async () => {
    const ctx = {
      reply: jest.fn(),
      message: {}
    } as any;

    await Echo(ctx);
    expect(ctx.reply).not.toHaveBeenCalled();
  });
});