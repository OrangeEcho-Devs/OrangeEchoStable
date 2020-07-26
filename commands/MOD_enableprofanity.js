module.exports = {
    name: 'enableprofanity',
    aliases: ['enable'],
    description: 'Enables the profanity filter.',
    usage: '*enableprofanity',
    cooldown: 0,
    mod:false,
      execute: async (message, args, client) => {
        const Discord = require('discord.js')
        const db = require('quick.db')
        try{
          db.set(`ProfanityFilterStatus_${message.guild.id}`, 'true')
          message.channel.send(`Profanity Filter enabled successfully. No swearing :)`)
        } catch(error) {
          message.channel.send('Something went wrong. \nPlease try again or contact the devs for help. \nError: '+error+'')
        }
      }
}