module.exports = {
  name: 'previous',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não tem nada na fila!`)
    const song = queue.previous()
    message.channel.send(`${client.emotes.success} | Tocando agora: \n${song.name}`)
  }
}
