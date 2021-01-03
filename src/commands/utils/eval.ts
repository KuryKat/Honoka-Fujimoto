import { success, unsuccess, successWithInput } from '@/src/utils/embeds'
import { BaseCommand, Command, HelpInfo } from '@modules/handler'
import { MessageReaction, User } from 'discord.js'
import { inspect } from 'util'

@Command('eval')
@HelpInfo({
  visible: false,
  description: 'Command just for my father'
})
class Eval extends BaseCommand {
  async execute (): Promise<void> {
    if (this.msg.author.id !== '367425061122211843') {
      return
    }

    const input = this.args.join(' ')

    try {
      // ! assim... meu comando de eval precisa de eval ;-;
      // eslint-disable-next-line no-eval
      let output = await eval(input)

      if (typeof output !== 'string') {
        output = inspect(output)
      }

      if (output.length > 1900) {
        output = output.substr(0, 1900)
      }

      const emojis: {
        [key: string]: string
      } = {
        '🌈': '🌈 Para visualizar o input!',
        '💥': '💥 Para remover este eval!'
      }

      const emojisKey = Object.keys(emojis)

      const msg = await this.msg.channel.send(
        success(output, emojisKey.reduce((acc, cur) => acc + emojis[cur], '')
        ))

      for (const emoji of emojisKey) {
        await msg.react(emoji)
      }

      const filter = (reaction: MessageReaction, user: User): boolean => reaction.me && user.id === this.msg.author.id

      const options = { time: 60000, max: 2 }

      msg.createReactionCollector(filter, options)
        .on('collect', reaction => {
          reaction.remove()
            .catch(console.error)
          reaction.emoji.name === emojisKey[0]
            ? msg.edit(successWithInput(input, output))
              .catch(console.error)
            : msg.delete()
              .catch(console.error)
        })
    } catch (error) {
      this.msg.channel.send(unsuccess(error.message))
        .catch(console.error)
    }
  }
}

export default Eval
