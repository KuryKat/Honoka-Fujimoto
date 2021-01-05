import honoka from '@bot'
import { MessageEmbed, GuildMember, TextChannel } from 'discord.js'
import moment from 'moment'
import { createUser } from '@utils/database'

honoka.client.on('guildMemberAdd', member => {
  if (member.guild.id === process.env.MAINGUILD) {
    autoRole(member)
    memberLog(member)
  }
  createUser(member)
})

function autoRole (member: GuildMember): void {
  member.roles.add(process.env.MEMBERROLE as string)
}

function memberLog (member: GuildMember): void {
  const channel = member.guild.channels.cache.get(process.env.MAINLOG as string) as TextChannel
  moment.locale('pt-br')
  const createdAt = moment(member.user.createdTimestamp)
  channel.send(new MessageEmbed()
    .setColor('#3ecc1f')
    .setTimestamp(member.joinedAt as Date)
    .setTitle(`**${member.user.username} #${member.user.discriminator}**`)
    .setThumbnail(member.user.displayAvatarURL({
      dynamic: true
    }))
    .addFields([
      {
        name: 'Criação da conta:',
        value: `${createdAt.format('LLLL')}\n\`${createdAt.fromNow()}\``,
        inline: true
      },
      {
        name: 'Posição:',
        value: `\`#${member.guild.memberCount}\``,
        inline: true
      },
      {
        name: 'Bot:',
        value: (member.user.bot) ? 'Sim' : 'Não',
        inline: true
      }
    ])
    .setFooter(member.id)
  )
}
