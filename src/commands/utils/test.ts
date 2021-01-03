import { BaseCommand, Command, HelpInfo } from '@modules/handler'

@Command('test')
@HelpInfo({
  visible: false
})
class Test extends BaseCommand {
  async execute (): Promise<void> {
    console.log('Hello World')
  }
}

export default Test
