module.exports = {
    name: 'setwardnotes',
    aliases: [''],
    description: 'Sets ward notes.',
    usage: '*setwardnotes [number]',
    cooldown: 0,
    mod:true,
      execute: async (message, args, client) => {
        const Discord = require('discord.js');
        const db = require('quick.db');
        if(message.guild.id !== '741839101598367856') return message.channel.send('You need to be in the **fishy hospital** Discord server to run this command.')
        const ticketnumber = args.join(0)
        message.channel.send('Please enter the notes for the patient.')
        const awaitnotes = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
          db.set(`NOTESTicket${ticketnumber}`, collected.first().content)
          message.channel.send(`✅ Notes set for ticket ${ticketnumber}`)
        })
      }
}