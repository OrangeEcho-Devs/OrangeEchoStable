module.exports = {
    name: 'notetomidi',
    aliases: ['midiconverter'],
    description: 'Robs a user.',
    usage: '*rob [user]',
    cooldown: 300,
    mod:false,
      execute: async (message, args, client) => {
        const Discord = require('discord.js');
        const fs = require('fs');
        if (!args) {
          message.channel.send('Please send the notes and their numbers eg C4')
        }
        if (args.includes = 'C3') {
          var convert1result = '48'
        }
      }
  }