import { Context } from 'grammy';

export const echo = async (ctx: Context) => {
  if (ctx.message?.text) {
    await ctx.reply(ctx.message.text);
  }
};