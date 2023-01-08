module.exports = {
  name: 'filter',
  aliases: ['filters'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não tem nada na fila!`)
    const filter = args[0]
    if (filter === 'off' && queue.filters.size) queue.filters.clear()
    else if (Object.keys(client.distube.filters).includes(filter)) {
      if (queue.filters.has(filter)) queue.filters.remove(filter)
      else queue.filters.add(filter)
    } else if (args[0]) return message.channel.send(`${client.emotes.error} | Não é um filtro válido!`)
    message.channel.send(`Atual filtro da fila: \`${queue.filters.names.join(', ') || 'Off'}\``)
  }
}
