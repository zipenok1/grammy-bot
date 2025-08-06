import { PrismaClient } from '../generated/prisma';
import { Context } from 'grammy';
const prisma = new PrismaClient();

export const Register = async (ctx: Context) => {
  try {
    if (!ctx.from?.username) {
      await ctx.reply('Для регистрации у вас должен быть username в Telegram');
      return;
    }

    const existingUser = await prisma.user.findFirst({
      where: { username: ctx.from.username }
    });

    if (existingUser) {
      await ctx.reply('Вы уже зарегистрированы в системе');
      return;
    }

    const user = await prisma.user.create({
      data: { username: ctx.from.username }
    });

    await ctx.reply(`Вы успешно зарегистрированы под именем @${user.username}! Ваш ID: ${user.id}`);
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        await ctx.reply('Произошла ошибка при регистрации');
    }
};