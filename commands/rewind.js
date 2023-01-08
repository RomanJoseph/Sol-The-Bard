module.exports = {
  name: 'rewind',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não tem nada na fila agora!`)
    if (!args[0]) {
      return message.channel.send(`${client.emotes.error} | Por favor, insira um tempo (em segundos) para rebobinar`)
    }
    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send(`${client.emotes.error} | Por favor, insira um tempo válido!`)
    queue.seek((queue.currentTime - time))
    message.channel.send(`Rebobinando a música por ${time} segundos!`)
  }
}
