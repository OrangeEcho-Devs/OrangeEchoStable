module.exports = {
	name: 'generatekey',
	aliases: ['keygen'],
	description: 'Generates an OrangeEcho Premium key.',
	botmanager:true,
	mod:true,
	async execute (message, args, client) {
        const Discord = require('discord.js')
        const db = require('quick.db')
        message.channel.send('How long (in months) would the membership be?')
        const awaitmessage1 = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
            if(collected.first().content == undefined) return message.channel.send('You didn\'t answer in time dummy')
            
        })
    }
}