import { Bot } from 'grammy';
import { start } from './commands/start';
import { register } from './commands/register';
import { echo } from './commands/echo';
import { deleteUser } from './commands/delete';
import 'dotenv/config';

const KEY = process.env.BOT_TOKEN;
if (!KEY) throw new Error('Ошибка с токеном');

export const bot = new Bot(KEY);

bot.api.setMyCommands([
  { command: 'start', description: 'Запуск бота' },
  { command: 'register', description: 'Регистрация в системе' },
  { command: 'delete', description: 'Удаление акка' },
]);

bot.command('start', start);
bot.command('register', register);
bot.command('delete', deleteUser)
bot.on('message:text', echo);

bot.start()