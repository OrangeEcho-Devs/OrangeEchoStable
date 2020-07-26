module.exports = {
	name: 'botban',
	aliases: ['botbanish'],
	description: 'Bot bans a user.',
	botmanager:true,
	mod:true,
	execute(message, args, client) {
	fs.readFile('./botbanned.txt', function(err, data){
		if(data.includes (message.mentions.members.first().id)){message.channel.send(`This user is already botbanned. How do you expect me to blacklist someone who's already blacklisted?!`);
    return;
    }else{
		fs.appendFile('./botbanned.txt', `${message.mentions.members.first().id}\n`, function(err,){})
		message.channel.send(`<@${message.mentions.members.first().id}> (${message.mentions.members.first().id}) was bot banned. Phew, no more bot abusers.`)
		}
})
	}
}

  
