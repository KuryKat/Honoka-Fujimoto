import honoka from '@bot'
import { createGuild } from '@utils/database'

honoka.client.on('guildCreate', guild => {
  createGuild(guild)
})
