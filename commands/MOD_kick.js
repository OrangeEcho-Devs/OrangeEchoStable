const { prefix } = require('../config.json');

module.exports = {
	name: 'kick',
	description: 'Kicks a user from the server.',
	aliases: ['boot'],
	usage: '<user>',
	cooldown: 0,
	mod:true,
	execute(message, args, client) {
    const Discord = require('discord.js')
    const fs = require('fs')
		const argarray = message.content.slice(prefix.length).trim().split(/ +/g);
    const db = require('quick.db')
		try {
			if(!message.mentions.members.first()) {
				const user1 = args[0]
				if (message.author.id == user1){respond('',`Are you REALLY gonna try and kick **YOURSELF**`, message.channel);return;}
			const ModeratorRoleID = db.fetch(`ModeratorRoleID_${message.guild.id}`)
			const checkmemberforroles = message.guild.members.cache.get(user1)
			if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
			// Code hopefully works
			const channel = message.channel
			const user = user1
      let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
			var reason = reasonraw.join(' ')
			var reason = reason.replace(argarray[1], '')
			const auditreason = reason.replace(argarray[1], '')
			if(reason == ''){var reason = 'No reason provided.'}
			fs.appendFileSync('./logs/' + user.id + '-warnings.log', 'Kick\nReason: ' + auditreason +'\n\n');
			fs.appendFileSync('./logs/' + user.id + '-modwarnings.log', 'Kick issued by '+ message.author.tag +'\nReason: ' + auditreason +'\n\n');
			respond('⬅️ Kick','<@'+user.id+'> was kicked from the server. Goodbye and good riddance!\nReason: '+auditreason, message.channel)
			channel.send(':wave: Goodbye and good riddance!');
			respond('⬅️ Kick','You have been kicked from the server. You may rejoin at anytime.\n\nReason for kick: '+auditreason, client.users.cache.get(user))
	const ModReportEmbed = new Discord.MessageEmbed()
		ModReportEmbed.setColor('#2859B8')
		ModReportEmbed.setTitle('Kick')
		ModReportEmbed.setDescription(`Gives the specified member the boot from the server.`)
		ModReportEmbed.addFields(
			{ name: 'Offender', value: `${user}`, inline: false },
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
			if (message.author.id == message.mentions.members.first().id){respond('',`Are you REALLY gonna try and kick **YOURSELF**`, message.channel);return;}
			const ModeratorRoleID = db.fetch(`ModeratorRoleID_${message.guild.id}`)
			const checkmemberforroles = message.mentions.members.first()
			if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
			// Code hopefully works
			const channel = message.channel
			const user = message.mentions.members.first()
      let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
			var reason = reasonraw.join(' ')
			var reason = reason.replace(argarray[1], '')
			const auditreason = reason.replace(argarray[1], '')
			if(reason == ''){var reason = 'No reason provided.'}
			fs.appendFileSync('./logs/' + user + '-warnings.log', 'Kick\nReason: ' + auditreason +'\n\n');
			fs.appendFileSync('./logs/' + user + '-modwarnings.log', 'Kick issued by '+ message.author.tag +'\nReason: ' + auditreason +'\n\n');
			respond('⬅️ Kick','<@'+user+'> was kicked from the server. Goodbye and good riddance!\nReason: '+auditreason, message.channel)
			channel.send(':wave: Goodbye and good riddance!');
			respond('⬅️ Kick','You have been kicked from the server. You may rejoin at anytime.\n\nReason for kick: '+auditreason, user)
	const ModReportEmbed = new Discord.MessageEmbed()
		ModReportEmbed.setColor('#2859B8')
		ModReportEmbed.setTitle('Kick')
		ModReportEmbed.setDescription(`Gives the specified member the boot from the server.`)
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
			user.kick({reason: `${message.author.tag} | ${auditreason}`})
		}catch(error) {
			respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
			errorlog(error)
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
			}
		
}
};