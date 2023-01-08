module.exports = {
  name: 'playtop',
  aliases: ['pt'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (!string) return message.channel.send(`${client.emotes.error} | Por favor, insira um nome de música ou URL válida para a busca.`)
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message,
      position: 1
    })
  }
}
