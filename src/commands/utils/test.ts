import { BaseCommand, Command, HelpInfo } from '@modules/handler'

@Command('test')
@HelpInfo({
  visible: false,
  description: 'Base Command'
})
class Test extends BaseCommand {
  async execute (): Promise<void> {
    this.msg.channel.send('Hello World')
      .catch(console.error)
  }
}

export default Test
