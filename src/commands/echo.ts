import { Context } from 'grammy';

export const Echo = async (ctx: Context) => {
  if (ctx.message?.text) {
    await ctx.reply(ctx.message.text);
  }
};