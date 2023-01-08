module.exports = {
  name: 'repeat',
  aliases: ['loop', 'rp'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    console.log(args)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não tem nada tocando!`)
    let mode = null
    switch (args[0]) {
      case 'off':
        mode = 0
        break
      case 'song':
        mode = 1
        break
      case 'queue':
        mode = 2
        break
      default:
        mode = 1;
    }
    mode = queue.setRepeatMode()
    mode = mode ? (mode === 2 ? 'Repeat queue' : 'Repeat song') : 'Off'
    message.channel.send(`${client.emotes.repeat} | Modo repetição definido para \`${mode}\``)
  }
}
