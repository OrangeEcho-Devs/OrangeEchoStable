module.exports = {
    name: 'bigbrain',
    aliases: ['howbigbrain'],
    description: 'Sees how big the mentioned person\'s brain is.',
    usage: '*bigbrain [person]',
    cooldown: 0,
    mod:false,
      execute: async (message, args, client) => {
          const Discord = require('discord.js')
          const db = require('quick.db')
          let targetuser = message.mentions.members.first().displayName
          if(!args[0]) return message.channel.send('Mention a user to scan their big brain percentage.')
          let user = message.mentions.users.first()
          let bigbrainpercentage = Math.floor(Math.random() * 100) + 1;
          if(bigbrainpercentage <= 50) {
          const smolbrainembed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setAuthor(targetuser, user.avatarURL())
            .setTitle(`${bigbrainpercentage}%`)
            .setDescription(`You're as dumb as a bag of bricks`)
            .setImage(`https://images-ext-1.discordapp.net/external/9f9dNlngfGqSNR0vo6h1_2T31fKgczRPq1dOOSbNjwU/https/i.imgflip.com/4/2ih485.jpg`)
            .setFooter(footertext)
          message.channel.send(smolbrainembed);
          } else if(bigbrainpercentage > 50 && bigbrainpercentage < 101) {
            const bigbrainembed = new Discord.MessageEmbed()
              .setColor('#008000')
              .setAuthor(targetuser, user.avatarURL())
              .setTitle(`${bigbrainpercentage}%`)
              .setDescription(`You're as smart as Albert Einstein`)
              .setImage('https://images-ext-1.discordapp.net/external/zkD5wg9Z9YGM9iOjTZy5QYP92wbyJ5hcJQUfxr7m-l0/https/i.imgur.com/ZvgZH7oh.jpg')
              .setFooter(footertext)
            message.channel.send(bigbrainembed);
          }
      }
    }