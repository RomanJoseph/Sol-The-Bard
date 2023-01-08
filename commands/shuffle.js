module.exports = {
  name: 'shuffle',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não tem nada na fila agora!`)
    queue.shuffle()
    message.channel.send('Músicas na fila embaralhadas!')
  }
}
