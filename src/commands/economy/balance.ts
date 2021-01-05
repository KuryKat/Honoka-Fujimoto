import { BaseCommand, Command, HelpInfo } from '@modules/handler'

@Command('balance')
@HelpInfo({
  module: 'Economy',
  description: 'Not Implemented',
  usage: ['', '{user}']
})
class Balance extends BaseCommand {
  async execute (): Promise<void> {
    this.msg.channel.send('Not Implemented')
  }
}

export default Balance
