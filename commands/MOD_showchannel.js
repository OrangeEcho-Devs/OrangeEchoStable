module.exports = {
  name: 'show',
  aliases: ['showchannel', 'visible'],
  description: 'Shows the channel the command is ran in.',
  usage: '',
  cooldown: 0,
  mod:true,
	execute(message, args, client) {
	const channel = message.channel
  const MemberRoleID = db.fetch(`MemberRoleID_${message.guild.id}`)
  const roletoshow = message.guild.roles.cache.get(MemberRoleID)
    try {
    channel.updateOverwrite(roletoshow, { VIEW_CHANNEL: true });
		respond('','<#'+message.channel.id+'> is no longer hidden.', message.channel)
	const ModReportEmbed = new Discord.MessageEmbed()
		ModReportEmbed.setColor('#81D8D0')
		ModReportEmbed.setTitle('Show channel')
		ModReportEmbed.setDescription(`Unhides a channel to all users`)
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
