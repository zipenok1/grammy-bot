import { link } from 'fs';
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

jest.mock('../commands/marzban', () => ({
  createMarzbanUser: jest.fn()
}));

const { mockUser } = require('../generated/prisma');
const { createMarzbanUser } = require('../commands/marzban')

describe('/register command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Успешная регистрация', async () => {
    const ctx = {
      reply: jest.fn(),
      from: { id: 1, username: 'test_user' }
    } as any;

    mockUser.findFirst.mockResolvedValue(null);
    createMarzbanUser.mockResolvedValue({link: 'vpn-config-link'})
    mockUser.create.mockResolvedValue({
      id: 1,
      username: 'test_user',
      link: 'vpn-config-link',
      createdAt: new Date()
    });

    await Register(ctx);

    expect(mockUser.findFirst).toHaveBeenCalledWith({
      where: { username: 'test_user' }
    })
    expect(createMarzbanUser).toHaveBeenCalledWith('test_user')
    expect(ctx.reply).toHaveBeenCalledWith(
      'Вы успешно зарегистрированы под именем @test_user! Ваш конфиг: vpn-config-link'
    );
  });
});