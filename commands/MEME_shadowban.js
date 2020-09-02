module.exports = {
    name: 'shadowban',
    aliases: ['sban'],
    description: 'Shadow bans someone.',
    usage: '*shadowban [person]',
    cooldown: 0,
    mod:false,
      execute: async (message, args, client) => {
          const Discord = require('discord.js')
          const db = require('quick.db')
          if(!args[0]) {
              message.channel.send('User didn\'t specify any args, so they shadow banned themselves.')
              message.channel.send({files: ['./shadowbanned.jpg']})
          } else {
          if(message.mentions.members.first().id == message.author.id) {
              message.channel.send(`<@${message.author.id}> shadowbanned themselves.`)
              message.channel.send({files: ['./shadowbanned.jpg']})
          } else {
          message.channel.send(`<@${message.author.id}> shadowbanned ${message.mentions.members.first()}.`)
          message.channel.send({files: ['./shadowbanned.jpg']})
          }
        }
      }
    }