module.exports = {
    name: 'disableprofanity',
    aliases: ['disable'],
    description: 'Disables the profanity filter.',
    usage: '*disableprofanity',
    cooldown: 0,
    mod:true,
      execute: async (message, args, client) => {
        const Discord = require('discord.js')
        const db = require('quick.db')
        const modrole = db.fetch(`ModeratorRoleID_${message.guild.id}`)
        if(!message.member.roles.cache.some(role => role.id === modrole)) return message.channel.send('This is a mod-only command.')
        else {
        try {
          db.set(`ProfanityFilterStatus_${message.guild.id}`, 'false')
          message.channel.send('Profanity Filter disabled successfully. Swearing is now allowed.')
        } catch(error) {
          message.channel.send('Something went wrong. \nPlease try again or contact the devs. \nError: '+error+'')
        }
        }
      }
}