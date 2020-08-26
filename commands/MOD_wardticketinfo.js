module.exports = {
    name: 'wardticketinfo',
    aliases: [''],
    description: 'Gives info about a ward ticket.',
    usage: '*wardticketinfo [ticket]',
    cooldown: 0,
    mod:true,
      execute: async (message, args, client) => {
        const Discord = require('discord.js');
        const db = require('quick.db');
        if(message.guild.id !== '741839101598367856') return message.channel.send('You need to be in the **fishy hospital** Discord server to run this command.')
        const ticketnumber = args[0]
        const patient = db.fetch(`Ticket${ticketnumber}`)
        const ward = db.fetch(`WardTicket${ticketnumber}`)
        const createdby = db.fetch(`CreatedByTicket${ticketnumber}`)
        const symptoms = db.fetch(`SYMPTOMSTicket${ticketnumber}`)
        const notes = db.fetch(`NOTESTicket${ticketnumber}`)
        const descembed = new Discord.MessageEmbed()
          .setTitle(`Info of Ticket ${ticketnumber}`)
          .setDescription(`Shows the ticket info.`)
          .addField('Patient', '<@'+patient+'>', false)
          .addField('Ward', ward, false)
          .addField('Symptoms', symptoms, false)
          .addField('Notes', notes, false)
          .addField('Ticket created by', '<@'+createdby+'>', false)
          .setFooter(footertext)
        message.channel.send(descembed);
      }
}