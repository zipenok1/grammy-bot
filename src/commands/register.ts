import { PrismaClient } from '../generated/prisma';
import { Context } from 'grammy';
import { createMarzbanUser } from './marzban';
const prisma = new PrismaClient();

export const register = async (ctx: Context) => {
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

    const marzban = await createMarzbanUser(ctx.from.username)
    
    const user = await prisma.user.create({
      data: { 
        username: ctx.from.username,
        link: marzban?.link
      }
    });

    await ctx.reply(`Вы успешно зарегистрированы под именем @${user.username}! Ваш конфиг: ${user?.link}`);
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        await ctx.reply('Произошла ошибка при регистрации');
    }
};