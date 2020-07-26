module.exports = {
	name: 'botunban',
	aliases: ['botunbanish'],
	description: 'Bot unbans a user.',
	botmanager:true,
	mod:true,
	execute(message, args, client) {
	fs.readFile('./botbanned.txt', function(err, data){
		var data = fs.readFileSync('./botbanned.txt', 'utf-8');
		if(!data.includes(message.mentions.members.first().id)){message.channel.send('User not found on the bot ban list. How do you expect me to bot unban someone who isn\'t bot banned???');
    return
    }else{
      message.channel.send(`<@${message.mentions.members.first().id}> is now bot unbanned.`);
    }
		var valuetoremove = message.mentions.members.first().id;
		var newValue = data.replace((valuetoremove), '');
		fs.writeFileSync('./botbanned.txt', newValue, 'utf-8');
	})
  }
}