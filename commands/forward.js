module.exports = {
  name: 'forward',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não tem nada na fila!`)
    if (!args[0]) {
      return message.channel.send(`${client.emotes.error} | Por favor, insira o tempo (em segundos) para avançar na música`)
    }
    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send(`${client.emotes.error} | Por favor insira um número válido`)
    queue.seek((queue.currentTime + time))
    message.channel.send(`A música foi avançada em ${time} segundos!`)
  }
}
