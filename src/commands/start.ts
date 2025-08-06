import { Context } from 'grammy';

export const Start = async (ctx: Context) => {
  await ctx.reply('Добро пожаловать! Используйте /register для регистрации');
};