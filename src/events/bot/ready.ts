import honoka from '@bot'

honoka.client.on('ready', () => {
  setStatus()
  setInterval(setStatus, 300000)
  console.log(honoka.client.user?.username as string + ' se encontra online!')
})

function setStatus (): void {
  honoka.client.user?.setActivity('you 😋', { type: 'WATCHING' })
    .catch(console.error)
}
