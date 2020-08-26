module.exports = {
  name: 'hide',
  aliases: ['hidechannel', 'invisible'],
  description: 'Hides the channel the command is ran in.',
  cooldown: 0,
  mod:true,
	execute(message, args, client) {
	const channel = message.channel
  const db = require('quick.db')
  const MemberRoleID = db.fetch(`MemberRoleID_${message.guild.id}`)
  const roletohide = message.guild.roles.cache.get(MemberRoleID)
    try {
		channel.updateOverwrite(roletohide, { VIEW_CHANNEL: false });
		respond('','<#'+message.channel+'> was hidden.',message.channel)
	const ModReportEmbed = new Discord.MessageEmbed()
		ModReportEmbed.setColor('#FFC2F7')
		ModReportEmbed.setTitle('Hide channel')
		ModReportEmbed.setDescription(`Hides a channel from everyone`)
		ModReportEmbed.addFields(
			{ name: 'Responsible Moderator', value: `${message.author.tag}`, inline: false },
			{ name: 'Channel', value: `${message.channel.name}`, inline: false }
		)
		ModReportEmbed.setTimestamp()
    try {
    const ModLog = db.fetch(`ModlogID_${message.guild.id}`)
		const modlogchannel = client.channels.cache.get(`${ModLog}`);
		modlogchannel.send(ModReportEmbed)
    } catch(error) {
      message.channel.send('Oopsie doopsie, the bot ran into an error. \nError code: -2')
    }

	}catch(error) {
		respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
		errorlog(error)
		// Your code broke (Leave untouched in most cases)
		console.error('an error has occured', error);
		}

  }}
