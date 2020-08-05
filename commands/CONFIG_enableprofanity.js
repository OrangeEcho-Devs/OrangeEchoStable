module.exports = {
    name: 'enableprofanity',
    aliases: ['enable'],
    description: 'Enables the profanity filter.',
    usage: '*enableprofanity',
    cooldown: 0,
    mod:true,
      execute: async (message, args, client) => {
        const Discord = require('discord.js')
        const db = require('quick.db')
        const modrole = db.fetch(`ModeratorRoleID_${message.guild.id}`)
        if(!message.member.roles.cache.some(role => role.id === modrole)) return message.channel.send('This is a mod-only command.')
        else {
        try{
          db.set(`ProfanityFilterStatus_${message.guild.id}`, 'true')
          message.channel.send(`Profanity Filter enabled successfully. No swearing :)`)
        } catch(error) {
          message.channel.send('Something went wrong. \nPlease try again or contact the devs for help. \nError: '+error+'')
        }
        }
      }
}