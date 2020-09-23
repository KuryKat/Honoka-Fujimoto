require('dotenv').config()
const { Client } = require('discord.js')
const client = new Client();

client.on('ready', () => console.log("ready!"))

client.on('message', async message => {
    if (message.cleanContent === "ping") return message.reply('Pong!')
})
client.on('raw', dados => {
    console.log(dados)
})

client.login(process.env.TOKEN)