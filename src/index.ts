import HonokaBot from './honoka-bot'
import 'reflect-metadata'
import { config } from 'dotenv'
config()

const honokaBot = new HonokaBot()
honokaBot.start()

export default honokaBot
