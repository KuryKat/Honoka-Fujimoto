import { MessageEmbed } from 'discord.js'

const success = (output: string, footer: string): MessageEmbed =>
  new MessageEmbed()
    .setTitle('☄️ Success Output')
    .setColor('#33cc1f')
    .setDescription('```js\n' + output + '```')
    .setFooter(footer)

const successWithInput = (input: string, output: string): MessageEmbed =>
  new MessageEmbed()
    .setTitle('☄️ Success Output')
    .setColor('#33cc1f')
    .setDescription('\n\n\n**Input** ```js\n' + input + '```' +
                  '\n\n**Output** ```js\n' + output + '```')

const unsuccess = (output: string): MessageEmbed =>
  new MessageEmbed()
    .setTitle('🚨 Unsuccess Output')
    .setColor('#e60000')
    .setDescription('```js\n' + output + '```')

export { success, successWithInput, unsuccess }
