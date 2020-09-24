module.exports = {
    name: 'donate',
    aliases: ['donation'],
    description: 'Support the bot devs by donating!',
    usage: '',
    cooldown: 0,
      async execute(message, args, client) {
          const Discord = require('discord.js')
          const db = require('quick.db')
          const embed = new Discord.MessageEmbed()
          .setTitle('Donate to OrangeEcho')
          .setDescription('Support the one man developer of OrangeEcho!')
          .addField('How to become a member?', 'DM Orange Group#5362', false)
          .addField('Payment method', 'Discord Nitro (non classic)', false)
          .addField('1 month membership', '-Access to the Nightly build of OrangeEcho, which includes a lot of beta features that are not available in the stable build yet. \n-Special badge just for you to show that you are a supporter of OrangeEcho \n-Slowmode bypass in OrangeEchoSauce server \n-Special role just for you! \n-Advertising in OrangeEchoSauce server!', false)
          .addField('1 year membership', 'Same perks listed in 1 month membership, with additional: \n-Ability to boost 2 servers with OrangeEcho Premium so that you and your server members can enjoy OrangeEcho Premium! \n-Advertising and partnering with OrangeEchoSauce, with an optional perk of being able to ping @ everyone', false)
          message.channel.send(embed);
      }
}