import { Bot } from 'grammy';
import { start } from './commands/start';
import { register } from './commands/register';
import { echo } from './commands/echo';

const KEY = process.env.BOT_TOKEN;
if (!KEY) throw new Error('Ошибка с токеном');

export const bot = new Bot(KEY);

bot.api.setMyCommands([
  { command: 'start', description: 'Запуск бота' },
  { command: 'register', description: 'Регистрация в системе' },
]);

bot.command('start', start);
bot.command('register', register);
bot.on('message:text', echo);

bot.start()