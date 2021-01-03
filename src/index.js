require('dotenv').config()
const { Client, MessageEmbed } = require('discord.js')
const client = new Client();
const { inspect } = require('util')

client.on('ready', () => console.log("ready!"))

client.on('message', async message => {
    if (message.cleanContent === "ping") return message.reply('Pong!')

    const args = message.content
        .trim()
        .split(/ +/)

    const cmd = args.shift()?.toLowerCase()

    if(cmd === 'eval') {
      const success = (output, footer) =>
          new MessageEmbed()
              .setTitle(`☄️ Success Output`)
              .setColor('#33cc1f')
              .setDescription("```js\n" + output + "```")
              .setFooter(footer)

      const successWithInput = (input, output) =>
          new MessageEmbed()
              .setTitle(`☄️ Success Output`)
              .setColor('#33cc1f')
              .setDescription("\n\n\n**Input** ```js\n" + input + "```" +
                  "\n\n**Output** ```js\n" + output + "```")


      const unsuccess = (output) =>
          new MessageEmbed()
              .setTitle(`🚨 Unsuccess Output`)
              .setColor('#e60000')
              .setDescription("```js\n" + output + "```")

      if (message.author.id !== "367425061122211843") return
  
      const input = args.join(" ")
  
      try {
  
          let output = await eval(input)
  
          if (typeof output !== "string") output = inspect(output)
  
          if (output.length > 1900) output = output.substr(0, 1900)
  
          const emojis = {
              '🌈': "🌈 Para visualizar o input!",
              '💥': "💥 Para remover este eval!"
          }
  
          const emojisKey = Object.keys(emojis)
  
          const msg = await message.channel.send(
              success(output, emojisKey.reduce((acc, cur) => acc + emojis[cur], '')
              ))
  
          for (const emoji of emojisKey) await msg.react(emoji)
  
          const filter = (reaction, user) => reaction.me && user.id === message.author.id
  
          const options = { time: 60000, max: 2 }
  
          msg.createReactionCollector(filter, options)
              .on("collect", async reaction => {
                  await reaction.remove()
                  reaction.emoji.name == emojisKey[0] ? msg.edit(successWithInput(input, output)) : msg.delete()
              })
  
      } catch (error) {
          message.channel.send(unsuccess(error.message))
      }
    }
})

client.login(process.env.TOKEN)
