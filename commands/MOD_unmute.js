module.exports = {
  name: 'unmute',
  aliases: ['unquiet'],
  description: 'Unmutes a user.',
  usage: '<user>',
  cooldown: 0,
  mod:true,
	execute(message, args, client) {
    const Discord = require('discord.js');
    
    const fs = require('fs');
    const db = require('quick.db')
    const MuteRoleID = db.fetch(`MuteRoleID_${message.guild.id}`)
    try {
      const prefix = '*'
      if(!message.mentions.members.first()) {
        const user = args[0]
        if (message.author.id == user){respond('',`Since you can talk, you aren't muted isn't that obvious???.`, message.channel);return;}
      const ModeratorRoleID = db.fetch(`ModeratorRoleID_${message.guild.id}`)
			const checkmemberforroles = message.guild.members.cache.get(user)
			if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
      var reason = args.join(' ')
      const argarray = args
      var reason = reason.replace(argarray[1], '')
    const taggeduser = user
    const guild = message.guild
    const role = guild.roles.cache.find(role => role.id === `${MuteRoleID}`);
    const member = message.guild.members.cache.get(user)
      if(reason == ''){var reason = 'No reason provided.'}
   member.roles.remove(role);
    respond('🔈 Unmuted','<@'+ taggeduser +`> was unmuted. \nReason: ${reason}`,message.channel);
	const ModReportEmbed = new Discord.MessageEmbed()
		ModReportEmbed.setColor('#10C891')
		ModReportEmbed.setTitle('Unmute')
		ModReportEmbed.setDescription(`Un-shuts up a user`)
		ModReportEmbed.addFields(
			{ name: 'Offender', value: `<@${user}>`, inline: false },
			{ name: 'Responsible Moderator', value: `${message.author.tag}`, inline: false },
			{ name: 'Reason', value: `${reason}`, inline: false }
		)
		ModReportEmbed.setTimestamp()
    try {
    const ModLog = db.fetch(`ModlogID_${message.guild.id}`)
		const modlogchannel = client.channels.cache.get(`${ModLog}`);
		modlogchannel.send(ModReportEmbed)
    } catch(error) {
      message.channel.send('Oopsie doopsie, the bot ran into an error. \nError code: -2')
    }
    return;
      }
      if (message.author.id == message.mentions.members.first().id){respond('',`Since you can talk, you aren't muted isn't that obvious???.`, message.channel);return;}
      const {ModeratorRoleID} = db.fetch(`ModeratorRoleID_${message.guild.id}`)
			const checkmemberforroles = message.mentions.members.first()
			if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
      var reason = args.join(' ')
      const argarray = args
      var reason = reason.replace(argarray[1], '')
    const taggeduser = message.mentions.users.first().id
    const guild = message.guild
    const role = guild.roles.cache.find(role => role.id === `${MuteRoleID}`);
    const member = message.mentions.members.first();
      if(reason == ''){var reason = 'No reason provided.'}
   member.roles.remove(role);
    respond('🔈 Unmuted','<@'+ taggeduser +'> was unmuted.',message.channel);
	const ModReportEmbed = new Discord.MessageEmbed()
		ModReportEmbed.setColor('#10C891')
		ModReportEmbed.setTitle('Unmute')
		ModReportEmbed.setDescription(`Un-shuts up a user`)
		ModReportEmbed.addFields(
			{ name: 'Offender', value: `${member}`, inline: false },
			{ name: 'Responsible Moderator', value: `${message.author.tag}`, inline: false },
			{ name: 'Reason', value: `${reason}`, inline: false }
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