import mongoose from 'mongoose'
import { userModel, userSchema } from './Models/user'
import { guildModel, guildSchema } from './Models/guild'

mongoose.connect(process.env.MONGODB as string, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('open', () => console.log('Conexão ao MongoDB realizada com sucesso!'))
db.on('error', console.error)

export { db, userModel, userSchema, guildModel, guildSchema }
