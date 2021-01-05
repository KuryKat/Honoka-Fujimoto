import { BaseCommand, Command, HelpInfo } from '@modules/handler'

@Command('balance')
@HelpInfo({
  visible: false,
  description: 'Base Command'
})
class Balance extends BaseCommand {
  async execute (): Promise<void> {
    this.msg.channel.send('Not Implemented')
  }
}

export default Balance
