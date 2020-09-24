module.exports = {
    name: 'ramusage',
    aliases: ['ramused'],
    description: 'Check how much RAM the bot using.',
    usage: '',
    cooldown: 0,
      async execute(message, args, client) {
          const Discord = require('discord.js')
          const db = require('quick.db')
          const inuse = process.memoryUsage().heapUsed / 1024 / 1024
          const total = process.memoryUsage().heapTotal / 1024 / 1024 / 1024
          const ramembed = new Discord.MessageEmbed()
          .setTitle('RAM Usage')
          .setDescription(inuse.toFixed(2)+`MB/${total.toFixed(2)}GB`)
          message.channel.send(ramembed)
      }
    }