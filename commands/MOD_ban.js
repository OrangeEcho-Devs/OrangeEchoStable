module.exports = {
    name: 'ban',
    description: 'Bans a user.',
    aliases: ['banish'],
	usage: '<user> <reason>',
	cooldown: 0,
	mod:true,
    execute(message, args, client) {
        try {
		  const db = require('quick.db')
		  let user = message.mentions.members.first();
			if(!message.mentions.members.first()) {
				if(!args[0]) return message.channel.send('You need to tell me who to ban lmaoo')
				let user = args[0]
				if (message.author.id == user){respond('',`Are you REALLY gonna try and ban **YOURSELF**`, message.channel);return;}
			if (user == client.user.id){respond(`Not gonna ban myself, thanks`, message.channel);return;}
			const ModeratorRoleID = db.fetch(`ModeratorRoleID_${message.guild.id}`)
			const checkmemberforroles = message.guild.members.cache.get(user)
			if (checkmemberforroles.roles.cache.some(role => role.id == ModeratorRoleID)) return message.channel.send(':x: Hey hey hey, no banning of mods my dear')
			const userToBan = message.guild.members.cache.get(user)
			const userid = user
			const guild = message.guild
      		const PREFIX = '*'
      		const argarray = message.content.slice(PREFIX.length).trim().split(/ +/g);
			const authorusername = message.author.username +'#' +message.author.discriminator
      		const Discord = require('discord.js')
			let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
			var reason = reasonraw.join(' ')
			var reason = reason.replace(argarray[1], '')
			if(reason == ''){var reason = 'No reason provided.'}
			fs.appendFileSync('./logs/' + userid + '-warnings.log', 'Ban\nReason: ' + reason +'\n\n');
   			fs.appendFileSync('./logs/' + userid + '-modwarnings.log', 'Ban issued by '+ authorusername +'\nReason: ' + reason +'\n\n');
			respond('<:banhammer:713690855818657852> Ban','<@'+userid+'> was banned.\nReason: '+reason, message.channel)
			message.channel.send('Banned. No more idiots fooling around in the server.')
			message.channel.send('https://imgur.com/gallery/O3DHIA5')
			respond('Banned',`You were banned from the ${message.guild.name} server due to: `+ reason+'\n\nThis ban does not expire. ', client.users.cache.get(user))
			userToBan.ban({reason: `Ban requested by ${message.author.tag}. Reason: ${reason}`})
	const ModReportEmbed = new Discord.MessageEmbed()
		ModReportEmbed.setColor('#F01A1A')
		ModReportEmbed.setTitle('Ban')
		ModReportEmbed.setDescription(`Bans someone from the server`)
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
			if (message.author.id == message.mentions.members.first().id){respond('',`Are you REALLY gonna try and ban **YOURSELF**`, message.channel);return;}
			if (message.mentions.members.first().id == client.user.id){respond(`Not gonna ban myself, thanks`, message.channel);return;}
			const ModeratorRoleID = db.fetch(`ModeratorRoleID_${message.guild.id}`)
			const checkmemberforroles = message.mentions.members.first()
			if (checkmemberforroles.roles.cache.some(role => role.id == ModeratorRoleID)) return message.channel.send(':x: Hey hey hey, no banning of mods my dear')
			const userToBan = message.mentions.members.first()
			const userid = message.mentions.members.first().id
			const guild = message.guild
      		const PREFIX = '*'
      		const argarray = message.content.slice(PREFIX.length).trim().split(/ +/g);
			const authorusername = message.author.username +'#' +message.author.discriminator
      		const Discord = require('discord.js')
			let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
			var reason = reasonraw.join(' ')
			var reason = reason.replace(argarray[1], '')
			if(reason == ''){var reason = 'No reason provided.'}
			fs.appendFileSync('./logs/' + userid + '-warnings.log', 'Ban\nReason: ' + reason +'\n\n');
   			fs.appendFileSync('./logs/' + userid + '-modwarnings.log', 'Ban issued by '+ authorusername +'\nReason: ' + reason +'\n\n');
			respond('<:banhammer:713690855818657852> Ban','<@'+userid+'> was banned.\nReason: '+reason, message.channel)
			message.channel.send('Banned. No more idiots fooling around in the server.')
			message.channel.send('https://imgur.com/gallery/O3DHIA5')
			respond('Banned',`You were banned from the ${message.guild.name} server due to: `+ reason+'\n\nThis ban does not expire. ', user)
			user.ban({reason: `Ban requested by ${message.author.tag}. Reason: ${reason}`})
	const ModReportEmbed = new Discord.MessageEmbed()
		ModReportEmbed.setColor('#F01A1A')
		ModReportEmbed.setTitle('Ban')
		ModReportEmbed.setDescription(`Bans someone from the server`)
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
        	}catch(error) {
				respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
				errorlog(error)
				message.channel.send('This is most likely an error with the Discord hierachy system, please try moving my role up to the top above the rest')
				// Your code broke (Leave untouched in most cases)
				console.error('an error has occured', error);
				}
    },
};
