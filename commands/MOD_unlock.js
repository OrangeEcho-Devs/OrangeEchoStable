
module.exports = {
  name: 'unlock',
  aliases: ['unlockout'],
  description: 'Unlocks the channel the command is ran in.',
  usage: '',
  cooldown: 0,
  mod:true,
	execute(message, args, client) {
      const Discord = require('discord.js');
	const fs = require('fs');
	const channel = message.channel
	const reason = args.join(' ')
  const db = require('quick.db')
  const MemberRoleID = db.fetch(`MemberRoleID_${message.guild.id}`)
    try {
	message.member.roles.cache.some(role => role.name === 'BotFun');
    channel.updateOverwrite(MemberRoleID, { SEND_MESSAGES: true });
		if(args != ''){respond('🔓', `<#${message.channel.id}> was unlocked.\nReason: `+reason, message.channel)}
		else{respond('🔓', `<#${message.channel.id}> was unlocked.`, message.channel)}
	const ModReportEmbed = new Discord.MessageEmbed()
		ModReportEmbed.setColor('#81D8D0')
		ModReportEmbed.setTitle('Unlock channel')
		ModReportEmbed.setDescription(`Regrants Send Messages permission to all users`)
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
