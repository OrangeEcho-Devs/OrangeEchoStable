module.exports = {
    name: 'vote',
    aliases: [''],
    description: 'Support the bot by voting it!',
    usage: '',
    cooldown: 0,
      async execute(message, args, client) {
          const Discord = require('discord.js')
          const db = require('quick.db')
          const voteembed = new Discord.MessageEmbed()
          .setTitle('Vote for OrangeEcho')
          .setDescription('Support the one man developer of OrangeEcho so more people can find our bot!')
          .setColor('#008000')
          .addField('Every 24h', 'https://discordbotlist.com/bots/orangeecho-stable', false)
          .setFooter('Thanks for your support!\n'+footertext)
          message.channel.send(voteembed);
      }
    }