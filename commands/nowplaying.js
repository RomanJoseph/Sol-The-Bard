module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não tem nada na fila!`)
    const song = queue.songs[0]
    message.channel.send(`${client.emotes.play} | Eu estou tocando **\`${song.name}\`**, de ${song.user}`)
  }
}
