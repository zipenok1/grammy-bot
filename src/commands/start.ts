import { Context } from 'grammy';

export const start = async (ctx: Context) =>{
  await ctx.reply(
    `Добро пожаловать! \n` +
    `Используйте /register для регистрации`
  );
};