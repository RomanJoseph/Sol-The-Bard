module.exports = {
  name: 'pause',
  aliases: ['pause', 'hold'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não tem nada na fila!`)
    if (queue.paused) {
      queue.resume()
      return message.channel.send('A musica foi despausada! :)')
    }
    queue.pause()
    message.channel.send('A música foi pausada :)')
  }
}
