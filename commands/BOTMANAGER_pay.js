module.exports = {
    name: 'pay',
    aliases: ['add'],
    description: 'Adds the specified amount of money to someone\'s pocket',
    usage: '*pay [member] [amount]',
    cooldown: 0,
    mod:true,
    botmanager:true,
      execute: async (message, args, client) => {
      var UserID = message.mentions.members.first()
      var toAdd = args[1]
        var eco = require('discord-economy')
        const Discord = require('discord.js')
        eco.AddToBalance(UserID.id, toAdd)
        var output = await eco.FetchBalance(UserID.id)
        const embed = new Discord.MessageEmbed()
          .setTitle('Pay')
          .setDescription(`You paid ${UserID} ${toAdd} coins, now they have ${output.balance}`)
          .setFooter(footertext)
      message.channel.send(embed);
      }
}