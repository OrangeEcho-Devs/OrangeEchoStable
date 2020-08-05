module.exports = {
    name: 'gamble',
    aliases: ['bet'],
    description: 'Gamble and see if you win',
    usage: '*gamble',
    cooldown: 0,
    mod:false,
      execute: async (message, args, client) => {
        var eco = require('discord-economy')
        var flip = args[0] //Heads or Tails
        var amount = args[1] //Coins to gamble
 
        if (!flip || !['heads', 'tails'].includes(flip)) return message.reply('Please specify the flip, either heads or tails')
        if (!amount) return message.reply('Tell me how much you want to gamble lol')
 
        var output = await eco.FetchBalance(message.author.id)
        if (output.balance < amount) return message.reply('You don\'t have enough coins, don\'t try to break me.')
 
        var gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error)
        message.reply(`You ${gamble.output}! You now have ${gamble.newbalance} coins`)
      }
}