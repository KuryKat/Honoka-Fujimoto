import { Document, Model, model, Schema } from 'mongoose'
import { ObjectLike } from '@utils/types'

export const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, 'username is required! (String)'],
    minlength: [6, 'Minimum length of username is 6'],
    validate: {
      validator: (value: string) => /^.*#[1-9]{4}$/g.test(value),
      message: (props: ObjectLike) => `${props.value as string} is a invalid username`
    }
  },
  _id: {
    type: String,
    required: [true, 'ID is required! (String)'],
    minlength: [1, 'Minimum length of ID is 1'],
    maxlength: [18, 'Maximum length of ID is 18']
  },
  guilds: [
    {
      type: String,
      ref: 'guild',
      required: [true, 'The user guilds is required'],
      minlength: [1, 'Minimum length of a GuildID is 1'],
      maxlength: [18, 'Maximum length of a GuildID is 18']
    }
  ]
})

export const userModel: Model<Document<typeof userSchema>> = model('users', userSchema)
