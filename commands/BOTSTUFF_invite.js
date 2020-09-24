module.exports = {
    name: 'invite',
    aliases: ['invitebot'],
    description: 'Spread OrangeEcho to other servers using this bot invite link!',
    usage: '',
    cooldown: 0,
      async execute(message, args, client) {
          const Discord = require('discord.js')
          message.channel.send(`**Spread OrangeEcho!** \nHere's the bot invite link: <https://discordapp.com/oauth2/authorize?client_id=714001186897788934&scope=bot&permissions=2146958847>`)
      }
    }