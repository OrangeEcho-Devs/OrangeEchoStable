module.exports = {
    name: 'contactdevs',
    aliases: ['messagedevs'],
    description: 'Want to contact the devs? Use this command! Don\'t spam pls.',
    usage: '*contactdevs [message]',
    cooldown: 15,
      execute(message, args, client) {
        const Discord = require('discord.js')
        const fs = require('fs')
        const db = require('quick.db')
        const msg = args.join(' ')
        try {
        respond('Contact devs', 'A user has contacted you:\n**' +message.author.tag+ '**\n\nHere is their message: \n' + msg , client.channels.cache.get('731377818382106626'), 'd90e00', footertext)
        respond('Report sent!','Your message has been sent to the bot developers!', message.channel, '29BF00', `${message.author.tag} | ${message.author.id}`)
        message.delete()
      } catch(error){
        respond('Error', 'Something went wrong.\nError code: 2')
      }
}
}