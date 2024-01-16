const TelegramBot = require('node-telegram-bot-api')

const token = '6874045683:AAGuAYc6AmhxRx3qPA1XK1n62tWVPS8F7Zg';
const{gameOptions,againOptions} = require('./options')

const bot = new TelegramBot(token, { polling: true })

const chats = {}





const startGame = async (ChatId) => {
    await bot.sendMessage(ChatId, `Boty pahum e tiv 0 ic 9 y ,du petq e gushakes ayd tivy`);
    const randomNumber = Math.floor(Math.random() * 10)
    chats[ChatId] = randomNumber;
    await bot.sendMessage(ChatId, 'gushakir tivy', gameOptions)
}

const start = () => {

    bot.setMyCommands([
        { command: '/start', description: 'Skzbnakan dimavorum' },
        { command: '/info', description: 'informacia user i masin' },
        { command: '/game', description: 'Xax gushakir tivy' },
    ])



    bot.on('message', async msg => {
        const text = msg.text;
        const ChatId = msg.chat.id;


        const FirstName = msg.chat.first_name;



        if (text === '/start') {
            await bot.sendSticker(ChatId, 'https://tlgrm.eu/_/stickers/9dd/43e/9dd43e0b-dc50-4f08-b776-6b0b251433c2/6.webp')
            return bot.sendMessage(ChatId, `Bari galust telegram bot, vor-i hexinaky Vahen e `)
        }

        if (text === '/info') {
            if (!msg.from.last_name) {
                return bot.sendMessage(ChatId, `qo Anunne ${msg.from.first_name}`);
            }
            if (msg.from.last_name) {
                return bot.sendMessage(ChatId, `qo Anunne ${msg.from.first_name}  ,  ${msg.from.last_name}`);
            }

        }

        if (text === '/game') {
            return startGame(ChatId);
        }

        return bot.sendMessage(ChatId, 'Es qez chem haskanum)), noric porcir');

    })
    bot.on('callback_query', msg => {
        const data = msg.data
        const ChatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(ChatId);
        }

        console.log('data:', data);
        console.log('chats[ChatId]:', chats[ChatId]);

        if (data === chats[ChatId]) {
            return bot.sendMessage(ChatId, `Shnorhavorum em, boty pahel e ${chats[ChatId]}`, againOptions)
        }
        else {
            return bot.sendMessage(ChatId, `Cavoq Srti sxal e, boty pahel e ${chats[ChatId]}`, againOptions)
        }
    })
}

start();
