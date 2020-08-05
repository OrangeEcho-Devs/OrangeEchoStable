module.exports = {
  name: 'decancer',
  aliases: ['nick', 'nickname'],
  description: 'Sets the mentioned user\'s nickname.',
  usage: '<member> <new name>',
  cooldown: 0,
  mod:true,
	execute(message, args, client) {	
		const { prefix } = require('../config.json');
		const db = require('quick.db')
		const userToDecancer = message.mentions.members.first();
		const reason = `Remove cancerous characters from previous name`
		var args = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
		const text = args.join(' ');
		try{
			message.mentions.members.first().setNickname(text)

	const ModReportEmbed = new Discord.MessageEmbed()
		ModReportEmbed.setColor('#98DCE8')
		ModReportEmbed.setTitle('Decancer')
		ModReportEmbed.setDescription(`Remove cancerous characters from nickname`)
		ModReportEmbed.addFields(
			{ name: 'Offender', value: `${userToDecancer}`, inline: false },
			{ name: 'Responsible Moderator', value: `${message.author.tag}`, inline: false },
			{ name: 'Reason', value: `Remove cancerous characters from previous nickname`, inline: false }
		)
		ModReportEmbed.setTimestamp()
    try {
    const ModLog = db.fetch(`ModlogID_${message.guild.id}`)
		const modlogchannel = client.channels.cache.get(`${ModLog}`);
		modlogchannel.send(ModReportEmbed)
    } catch(error) {
      message.channel.send('Oopsie doopsie, the bot ran into an error. \nError code: -2')
    }
		respond('Decancer',`${message.mentions.members.first()} had their nickname changed to \`${text}\`.`, message.channel)
	}catch(error) {
		respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
		errorlog(error)
		// Your code broke (Leave untouched in most cases)
		console.error('an error has occured', error);
		}
		  
  }
}