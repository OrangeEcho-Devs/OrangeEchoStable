module.exports = {
  name: 'echo',
  aliases: ['speakother', 'sayother'],
  description: 'Has the bot speak in another channel.',
  usage: '<channel> <text>',
  cooldown: 0,
  mod:true,
  nodelay:true,
	execute(message, args, client) {
    const { prefix } = require('../config.json');
    const argarray = args

		if(!message.mentions.channels.first()){
      respond('Error', 'Please mention a channel.', message.channel);
      return;
    }
    if(!argarray[1].includes(message.mentions.channels.first().id)){
      respond('Error', 'Please mention a channel.', message.channel);
      return;
    }
    if(!argarray[2]){
      respond('Error', 'Please provide a message.', message.channel);
      return;
    }
    if(argarray.includes('@everyone')) {
      message.channel.send('HAHA you can\'t trick me into pinging everyone lmaoo')
      return;
    }
    if(argarray.includes('@here')) {
      message.channel.send('HAHA you can\'t trick me into pinging here lmaoo')
      return;
    }
    try {
    const channel = message.guild.channels.cache.get(message.mentions.channels.first().id)
    channel.send('a').then(msg => {
      msg.delete()
    })
    }catch(error) {
      message.channel.send('Channel is not in this guild, don\'t try to break me.')
      return;
    }
    var text = args.join(' ');
    var text = text.replace(argarray[1], '')
		message.delete()
		message.mentions.channels.first().send(text)
  }}