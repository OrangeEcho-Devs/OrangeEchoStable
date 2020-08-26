module.exports = {
  name: 'say',
  aliases: ['speak'],
  description: 'Has the bot speak.',
  usage: '<text>',
  cooldown: 0,
  mod:true,
  nodelay:true,
	execute(message, args, client) {	
    const Discord = require('discord.js');
		const { prefix } = require('../config.json');
		const argarray = message.content.slice(prefix.length).trim().split(/ +/g);
		const text = args.join(' ');
    if(text.includes('@everyone')) {
      message.channel.send('HAHA you can\'t trick me into pinging everyone lmaoo')
      return;
    }
    if(text.includes('@here')) {
      message.channel.send('HAHA you can\'t trick me into pinging here lmaoo')
      return;
    }
    message.channel.send(text)
    message.delete()
  }}