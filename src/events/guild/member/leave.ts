import honoka from '@bot'
import { GuildMember, MessageEmbed, TextChannel } from 'discord.js'

honoka.client.on('guildMemberRemove', member => {
  if (member.guild.id === process.env.MAINGUILD) {
    const completeMember = member as GuildMember
    memberLog(completeMember)
  }
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
    .catch(console.error)
}
