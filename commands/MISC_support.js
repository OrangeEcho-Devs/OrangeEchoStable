module.exports = {
    name: 'support',
    aliases: ['supportserver'],
    description: 'Shows support command to users.',
    usage: '*rob [user]',
    cooldown: 0,
    mod:false,
      execute: async (message, args, client) => {
        const Discord = require('discord.js')
        message.channel.send('Need help with the bot? Join our support server at discord.gg/Mdyjzvf . \nIf you want to get support from the original bot owner Daniel C and his team Freshman Devs, join their server here: discord.gg/dFYPjrh')
      }
}