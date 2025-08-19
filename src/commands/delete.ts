import { Context } from 'grammy';
import { PrismaClient } from '../generated/prisma';
import { deleteMarzbanUser } from './marzban';

const prisma = new PrismaClient();

export const deleteUser = async (ctx: Context) =>{
     try{
        if (!ctx.from?.username) {
            await ctx.reply('У вас должен быть username в Telegram для удаления аккаунта')
            return
        }   
        const username = ctx.from.username
        await prisma.user.delete({
            where: {username: username}
        })
        
        await deleteMarzbanUser(username)

        await ctx.reply('Вы успешно удалили данные')
     } catch(error:any){
        console.error('Ошибка при удалении', error)
     }
}