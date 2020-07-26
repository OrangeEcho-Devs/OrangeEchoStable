module.exports = {
    name: 'rob',
    aliases: ['steal', 'ripoff'],
    description: 'Robs a user.',
    usage: '*rob [user]',
    cooldown: 300,
    mod:false,
      execute: async (message, args, client) => {
        const Discord = require('discord.js');
        const eco = require('discord-economy')
        let user = message.mentions.members.first()
        let targetuserbalance = await eco.FetchBalance(user.id)
        let authorbalance = await eco.FetchBalance(message.author.id)
        
        if (authorbalance.balance < 500) {
          return message.channel.send('You need at least 500 coins to rob someone.')
        }
        if (targetuserbalance.balance < 500) {
          return message.channel.send('The target user doesn\'t have enough coins, not worth it man')
        }
        let stealingOdds = Math.floor(Math.random() * 100) + 1 
        if (stealingOdds <= 28) {
          await eco.SubtractFromBalance(message.author.id, 500)
          await eco.AddToBalance(user.id, 500)
          return message.channel.send('You were caught **HAHAHA** \nYou paid the person you stole from **500** coins.')
        } else if (stealingOdds > 30 && stealingOdds <= 50) {
          let worth = Math.round(targetuserbalance.balance * 0.3);
          await eco.SubtractFromBalance(user.id, worth);
          await eco.AddToBalance(message.author.id, worth);
          return message.channel.send(`💸 You stole a handful of coins! Your payout is **${worth.toLocaleString()}** coins.`)
        } else if (stealingOdds > 50 && stealingOdds <= 80) {
          let worth = Math.round(targetuserbalance.balance * 0.5);
          await eco.SubtractFromBalance(user.id, worth)
          await eco.AddToBalance(message.author.id, worth)
          return message.channel.send(`💰You stole a large bag of coins! Your payout is **${worth.toLocaleString()}** coins.`)
        } else {
          let worth = Math.round(targetuserbalance.balance)
          await eco.SubtractFromBalance(user.id, worth)
          await eco.AddToBalance(message.author.id, worth)
          return message.channel.send(`🤑 You stole a **MASSIVE** portion! Your payout is **${worth.toLocaleString()}** coins.`)
        }
      }
}