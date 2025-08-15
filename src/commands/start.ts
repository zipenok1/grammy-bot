import { Context } from 'grammy';

export const start = async (ctx: Context) => {
  await ctx.reply('Добро пожаловать! Используйте /register для регистрации');
};