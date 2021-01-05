import honoka from '@bot'
import { deleteGuild } from '@utils/database'

honoka.client.on('guildDelete', guild => {
  deleteGuild(guild)
})
