const { DisTube } = require('distube');
const Discord = require('discord.js');
const { GatewayIntentBits } = require('discord.js');
require('dotenv').config()

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ]
});

const fs = require('fs');
const config = require('./config.json')

const { YtDlpPlugin } = require('@distube/yt-dlp');

client.config = require('./config.json')
client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new YtDlpPlugin()
  ]
})

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.emotes = config.emoji

const prefix = config.prefix

fs.readdir('./commands/', (err, files) => {
  if (err) return console.log('Nenhum comando encontrado!')
  const jsFiles = files.filter(f => f.split('.').pop() === 'js')
  if (jsFiles.length <= 0) return console.log('Não conseguimos encontrar nenhum comando!')
  jsFiles.forEach(file => {
    const cmd = require(`./commands/${file}`)
    //console.log(`Loaded ${file}`)
    client.commands.set(cmd.name, cmd)
    if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
  })
})

client.on('ready', () => {
  console.log(`${client.user.tag} está pronto para tocar música!.`)
})

client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return
  if (!message.content.startsWith(prefix)) return

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

  if (!cmd) return

  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    return message.channel.send(`${client.emotes.error} | Você precisa estar em um canal de voz!`)
  }
  try {
    cmd.run(client, message, args)
  } catch (e) {
    console.error(e)
    message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
  }
})

const status = queue =>
  `Volume: \`${queue.volume = 100}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'Lista completa!' : 'Essa música') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send(
      `${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nPedida por: ${
        song.user
      }\n${status(queue)}`
    )
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.send(
      `${client.emotes.success} | Adicionado ${song.name} - \`${song.formattedDuration}\` à fila por ${song.user}`
    )
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send(
      `${client.emotes.success} | Adicionado as músicas da\`${playlist.name}\` (${
        playlist.songs.length
      } songs) à fila\n${status(queue)}`
    )
  )
  .on('error', (channel, e) => {
    if (channel) channel.send(`${client.emotes.error} | Um erro foi encontrado: ${e.toString().slice(0, 1974)}`)
    else console.error(e)
  })
  .on('empty', channel => channel.send('Canal de voz está vazio! Deixando o canal...'))
  .on('searchNoResult', (message, query) =>
    message.channel.send(`${client.emotes.error} | Nenhum resultado encontrado para \`${query}\`!`)
  )
  .on('finish', queue => queue.textChannel.send('Acabou!'))

  client.login(process.env.TOKEN);