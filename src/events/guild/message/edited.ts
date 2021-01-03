import honoka from '@bot'
import { Message } from 'discord.js'

honoka.client.on('messageUpdate', (_old, newer) => {
  honoka.client.emit('message', newer as Message)
})
