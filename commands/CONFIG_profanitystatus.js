module.exports = {
    name: 'profanitystatus',
    aliases: [''],
    description: 'Checks if the profanity filter is enabled.',
    usage: '*profanitystatus',
    cooldown: 0,
    mod:false,
      execute: async (message, args, client) => {
        const Discord = require('discord.js')
        const db = require('quick.db')
        const result = db.fetch(`ProfanityFilterStatus_${message.guild.id}`)
        if (result == 'true') {
        const enabledembed = new Discord.MessageEmbed()
          .setTitle('Profanity Filter Status')
          .setDescription(`Profanity Filter: ENABLED`)
          .setFooter(footertext)
        message.channel.send(enabledembed);
        } else {
          const disabledembed = new Discord.MessageEmbed()
            .setTitle('Profanity Filter Status')
            .setDescription(`Profanity Filter: DISABLED`)
            .setFooter(footertext)
        message.channel.send(disabledembed);
        }
      }
}