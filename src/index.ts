import { Bot } from 'grammy';
import { Start } from './commands/start';
import { Register } from './commands/register';
import { Echo } from './commands/echo';

const KEY = process.env.BOT_TOKEN;
if (!KEY) throw new Error('Ошибка с токеном');

export const bot = new Bot(KEY);

bot.api.setMyCommands([
  { command: 'start', description: 'Запуск бота' },
  { command: 'register', description: 'Регистрация в системе' },
]);

bot.command('start', Start);
bot.command('register', Register);
bot.on('message:text', Echo);

bot.start()