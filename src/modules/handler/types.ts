import { Message } from 'discord.js'
import HonokaBot from '../../honoka-bot'

export interface CommandData{
  commandNames: string[]
  // ! TEMPORÁRIO
  // TODO: Arranjar uma forma de não precisar desse disable
  // ? Qual seria o tipo de uma classe?
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CommandClass: any
}

export class HelpData {
  description?: string
  visible?: boolean
  module?: string
  usage?: string[]
}

export abstract class BaseCommand {
  msg!: Message
  args!: string[]
  honoka!: HonokaBot

  abstract execute (): void
}
