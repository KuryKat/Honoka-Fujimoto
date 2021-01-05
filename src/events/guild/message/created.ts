import honoka from '@bot'
import { Message, MessageEmbed } from 'discord.js'

honoka.client.on('message', msg => {
  selfMention(msg)
})

function selfMention (msg: Message): void {
  if (honoka.client.user === null) {
    return
  }

  const selfMention = msg.mentions.users.get(honoka.client.user.id)
  if (selfMention !== undefined && msg.content.length < 23) {
    const prefix: string = process.env.PREFIX as string
    msg.channel.send(new MessageEmbed()
      .setColor(process.env.PRIMARYCOLOR as string)
      .setTitle(`${msg.author.username}, meu prefixo é \`${prefix}\`, para ver meus comandos basta usar o comando \`${prefix}help\`!`))
  }
}
