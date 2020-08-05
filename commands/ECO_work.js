module.exports = {
    name: 'work',
    aliases: ['money'],
    description: 'Do work and earn money',
    usage: '*work',
    cooldown: 0,
    mod:false,
      execute: async (message, args, client) => {
        const Discord = require('discord.js')
      var eco = require('discord-economy');
      var output = await eco.Work(message.author.id)
      //50% chance to fail and earn nothing. You earn between 1-100 coins. And you get one out of 20 random jobs.
      if (output.earned == 0) {
        const failembed = new Discord.MessageEmbed()
          .setColor('#FF0000')
          .setTitle('Work')
          .setDescription(`BOSS: Poor effort <@${message.author.id}>, you didn't do the job well. You earn 0 coins. I don't want to see this happen again.`)
          .setFooter(footertext)
          .setTimestamp()
        message.channel.send(failembed);

        }else {
        const successembed = new Discord.MessageEmbed()
          .setColor('#008000')
          .setTitle('Work')
          .setDescription(`<@${message.author.id}>, you worked as a \` ${output.job} \` and earned :money_with_wings: ${output.earned} coins. \nYou now own :money_with_wings: ${output.balance}`)
          .setFooter(footertext)
          .setTimestamp()
        message.channel.send(successembed);
}

 
 
 /*     var output = await eco.Work(message.author.id, {
      failurerate: 10,
      money: Math.floor(Math.random() * 500),
      jobs: ['cashier', 'shopkeeper']
    })
    //10% chance to fail and earn nothing. You earn between 1-500 coins. And you get one of those 3 random jobs.
    if (output.earned == 0) return message.reply(`BOSS: Poor effort ${message.author.tag}, you didn't do the job well. You earn 0 coins. I don't want to see this happen again.`)
 
    message.channel.send(`${message.author.username}
You worked as a \` ${output.job} \` and earned :money_with_wings: ${output.earned} coins
You now own :money_with_wings: ${output.balance} coins`)
*/
      }
}