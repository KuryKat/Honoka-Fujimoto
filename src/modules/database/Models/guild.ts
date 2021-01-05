import { Document, Model, model, Schema } from 'mongoose'
import { ObjectLike } from '@utils/types'

export const guildSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'guild name is required! (String)'],
    minlength: [1, 'Minimum length of username is 1'],
    validate: {
      validator: (value: string) => /^.*$/g.test(value),
      message: (props: ObjectLike) => `${props.value as string} is a invalid guild name`
    }
  },
  _id: {
    type: String,
    required: [true, 'ID is required! (String)'],
    minlength: [1, 'Minimum length of ID is 1'],
    maxlength: [18, 'Maximum length of ID is 18']
  }
})

export const guildModel: Model<Document<typeof guildSchema>> = model('guilds', guildSchema)
