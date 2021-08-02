const TelegramApi = require('node-telegram-bot-api')

const {gameOptions, againOptions} = requere('./options')

const token = '1890597378:AAEbp0_e_tn6uQPirkwiROcNNc2RTjkmD_I'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const startGame = async(chatId) => {
    await bot.sendMessage(chatId,
        "Загадываю цифру от 0 до 9, а ты ее отгадывай");
    const randomNumber = Math.floor(Math.random()*10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
    console.log("Рендомное число  ", randomNumber)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: `Начальное приветствие`},
        {command: '/game', description: `Угадай номер`},
        {command: '/info', description: `Информация о`},
        {command: '/video', description: `Видео`},
        {command: '/animation', description: `Анимация`},
        {command: '/location', description: `Анимация`}
    ])
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendMessage(chatId, `Добро пожаловать`);
            await bot.sendSticker(chatId, "/home/alex/images/welcome.webp");
        } else if (text === '/info') {
            await bot.sendMessage(chatId, `Твое имя ${msg.from.first_name} ${msg.from.last_name}`);
            await bot.sendSticker(chatId, "https://www.gstatic.com/webp/gallery/1.webp");
        } else if (text === '/game') {
            return startGame(chatId)
        } else if (text === '/video') {
            await bot.sendVideo(chatId,
                video = "http://techslides.com/demos/sample-videos/small.mp4");
        } else if (text === '/animation') {
            await bot.sendAnimation(chatId,
                animation = "https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif");
        } else if (text === '/location') {
            await bot.sendLocation(chatId,
                53.1576, 34.2218);
        } else {
            await bot.sendMessage(chatId, "Неправильно набрана команда")
        }
    })


    bot.on('callback_query', async msg => {
        console.log(msg)
        const data = msg.data;
        const chatId = msg.message.chat.id;
        console.log("Число --", data, "Ремдомное число ", chats[chatId])
        if (data === '/again') {
            return startGame(chatId)
        }
        console.log("Задаем ", data, "Получаем ", chats[chatId])
        if (data == chats[chatId]) {
            console.log("Задаем ", data, "Получаем ", chats[chatId])
            await bot.sendMessage(chatId, `Ты   угадал  ${chats[chatId]}`, againOptions)
        } else {
            await bot.sendMessage(chatId, `Ты не угадал  ${chats[chatId]}`, againOptions)
        }
    })
}
start()
