import honoka from '@bot'
import { GuildMember, MessageEmbed, TextChannel } from 'discord.js'
import { updateUserGuilds } from '@utils/database'

honoka.client.on('guildMemberRemove', member => {
  const completeMember = member as GuildMember
  if (member.guild.id === process.env.MAINGUILD) {
    memberLog(completeMember)
  }
  updateUserGuilds(completeMember, true)
})

function memberLog (member: GuildMember): void {
  const channel = member.guild.channels.cache.get(process.env.MAINLOG as string) as TextChannel
  channel.send(new MessageEmbed()
    .setColor('#f20c23')
    .setTimestamp(new Date())
    .setTitle(`**${member.user.username} #${member.user.discriminator}**`)
    .setFooter('ID: ' + member.id)
    .setThumbnail(member.user.displayAvatarURL({
      dynamic: true
    }))
    .addFields([
      {
        name: 'Membros:',
        value: `\`#${member.guild.memberCount}\``,
        inline: true
      },
      {
        name: 'Bot:',
        value: (member.user.bot) ? 'Sim' : 'Não',
        inline: true
      }
    ]))
}
