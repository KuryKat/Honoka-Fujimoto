import { BaseCommand, Command, HelpInfo } from '@modules/handler'

@Command('daily')
@HelpInfo({
  visible: false,
  description: 'Base Command'
})
class Daily extends BaseCommand {
  async execute (): Promise<void> {
    this.msg.channel.send('Not Implemented')
  }
}

export default Daily
