// ! Sinceramente ainda não sei trabalhar direito com Mongoose + TypeScript ainda
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { guildModel, userModel } from '@database'
import { Guild, GuildMember } from 'discord.js'
import { ObjectLike } from '@utils/types'

function updateUserGuilds (member: GuildMember, verifyGhost = false): void {
  if (member.user.bot) {
    return
  }
  userModel.findById(member.id).exec()
    .then((user: any) => {
      const updatedGuilds: string[] = user?._doc.guilds.filter((guildID: string) => guildID !== member.guild.id)
      delete user?._doc.guilds
      const updatedUser = { ...user?._doc, guilds: updatedGuilds }
      user?.update(updatedUser).exec()
      if (verifyGhost) {
        if (user?._doc.guilds === undefined || user?._doc.guilds.length === 0) {
          user?.delete().exec()
        }
      }
    })
}

function createUser (member: GuildMember): void {
  if (member.user.bot) {
    return
  }
  userModel.findById(member.id).exec()
    .then((user: any) => {
      const updatedGuilds = [...new Set([member.guild.id, ...user?._doc.guilds])]
      delete user?._doc.guilds
      const updatedUser = { ...user?._doc, guilds: updatedGuilds }
      user?.update(updatedUser).exec()
    })
    .catch(() => {
      const newUser: ObjectLike = { _id: member.id, username: member.user.tag, guilds: [member.guild.id] }
      userModel.create(newUser)
    })
}

function createGuild (guild: Guild): void {
  function registerMembers (guild: Guild): void {
    guild.members.fetch()
    guild.members.cache.forEach(member => {
      createUser(member)
    })
  }
  guildModel.findById(guild.id).exec()
    .then(() => registerMembers(guild))
    .catch(() => {
      registerMembers(guild)
      const guildDoc: ObjectLike = { _id: guild.id, name: guild.name }
      guildModel.create(guildDoc)
    })
}

function deleteGuild (guild: Guild): void {
  guild.members.fetch()
  guild.members.cache.forEach(member => {
    updateUserGuilds(member, true)
  })
  guildModel.findByIdAndDelete(guild.id).exec()
}

export { updateUserGuilds, createUser, createGuild, deleteGuild }
