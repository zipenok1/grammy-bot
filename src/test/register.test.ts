import { Register } from '../commands/register';

jest.mock('../generated/prisma', () => {
  const mockUser = {
    findFirst: jest.fn(),
    create: jest.fn()
  };
  return {
    PrismaClient: jest.fn(() => ({
      user: mockUser
    })),
    mockUser 
  };
});

const { mockUser } = require('../generated/prisma');

describe('/register command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Успешная регистрация', async () => {
    const ctx = {
      reply: jest.fn(),
      from: { id: 123, username: 'test_user' }
    } as any;

    mockUser.findFirst.mockResolvedValue(null);
    mockUser.create.mockResolvedValue({
      id: 1,
      // username: 'test_user',
      // createdAt: new Date()
    });

    await Register(ctx);

    expect(mockUser.findFirst).toHaveBeenCalledWith({
      where: { username: 'test_user' }
    });
    expect(ctx.reply).toHaveBeenCalledWith(
      'Вы успешно зарегистрированы под именем @test_user! Ваш ID: 1'
    );
  });
});