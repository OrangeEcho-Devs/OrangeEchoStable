module.exports = {
    name: 'balance',
    aliases: ['bal'],
    description: 'Show your balance',
    usage: '*balance',
    cooldown: 0,
    mod:false,
      execute: async (message, args, client) => {
        const Discord = require('discord.js');
        const eco = require("discord-economy");
        const fs = require('fs');
        if (!args[0]){
        var output = await eco.FetchBalance(message.author.id)
        const embed = new Discord.MessageEmbed()
            .setTitle("Balance")
            .addFields(
                { name: "Pocket", value: output.balance, inline: true },
                { name: "Bank", value: "0", inline: false },
            )
            .setFooter(footertext)
        message.channel.send(embed);
        message.channel.send("The bank feature is currently WIP.")
        }else{
          let member = message.mentions.members.first()
          var output = await eco.FetchBalance(member.id)
          const memberembed = new Discord.MessageEmbed()
            .setTitle("Balance")
            .addFields(
              { name: "Pocket", value: output.balance, inline:true },
              { name: "Bank", value: "0", inline: false}
            )
            .setFooter(footertext)
          message.channel.send(memberembed);
          message.channel.send("The bank feature is currently WIP.")
        }
        
    }
}