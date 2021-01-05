import { BaseCommand, Command, HelpInfo } from '@modules/handler'

@Command('daily')
@HelpInfo({
  module: 'Economy',
  description: 'Not Implemented',
  usage: ['']
})
class Daily extends BaseCommand {
  async execute (): Promise<void> {
    this.msg.channel.send('Not Implemented')
  }
}

export default Daily
