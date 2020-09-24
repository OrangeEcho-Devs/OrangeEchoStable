module.exports = {
  name: 'warn',
  aliases: ['punish'],
  description: 'Logs a warning.',
  usage: '<user> <reason>',
  cooldown: 0,
  mod:true,
  nodelay:true,
	execute(message, args, client) {
    const Discord = require('discord.js');
    const fs = require('fs');
    const prefix = '*'
    const argarray = message.content.slice(prefix.length).trim().split(/ +/g);
    const db = require('quick.db')
    try {
      if(!message.mentions.members.first()) {
        const user1 = args[0]
        //Mod check
      if (message.author.id == user1){respond('',`Are you REALLY gonna try and warn **YOURSELF**`, message.channel);return;}
      const ModeratorRoleID = db.fetch(`ModeratorRoleID_${message.guild.id}`)
			const checkmemberforroles = message.guild.members.cache.get(user1)
			if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
      
      //Prepares the reason
      const userid = user1
      const mentionedmember = '<@'+user1+'>'
      const reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
      var reason = reasonraw.join(' ')
      var reason = reason.replace(argarray[1], '')
      const authorusername = message.author.username +'#' +message.author.discriminator + ` (${message.author.id}) `
      if(reason == ''){var reason = 'No reason provided.'}
      
      //Writes reason to files
      fs.appendFileSync('./logs/' + userid + '-warnings.log', 'Warning\nReason: ' + reason +'\n\n');
      fs.appendFileSync('./logs/' + userid + '-modwarnings.log',`Warning issued by ${authorusername}: \nReason: ${reason}\n\n`);
      
      //Notifies of the warn
      respond('⚠️',mentionedmember + ' had a warning logged.\nReason: '+reason, message.channel)
      const warnedperson = user1
      const user = client.users.cache.get(warnedperson);
      respond('⚠️','You have been warned due to: '+ reason, client.users.cache.get(warnedperson))
      
      //Mod action event
	const ModReportEmbed = new Discord.MessageEmbed()
		ModReportEmbed.setColor('#FFFF00')
		ModReportEmbed.setTitle('Warn')
		ModReportEmbed.setDescription(`Warns a user`)
		ModReportEmbed.addFields(
			{ name: 'Offender', value: `${checkmemberforroles}`, inline: false },
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
      //Mod check
      if (message.author.id == message.mentions.members.first().id){respond('',`Are you REALLY gonna try and warn **YOURSELF**`, message.channel);return;}
      const {ModeratorRoleID} = db.fetch(`ModeratorRoleID_${message.guild.id}`)
			const checkmemberforroles = message.mentions.members.first()
			if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
      
      //Prepares the reason
      const userid = message.mentions.users.first().id
      const mentionedmember = '<@'+message.mentions.users.first().id+'>'
      const reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
      var reason = reasonraw.join(' ')
      const authorusername = message.author.username +'#' +message.author.discriminator + ` (${message.author.id}) `
      if(reason == ''){var reason = 'No reason provided.'}
      
      //Writes reason to files
      fs.appendFileSync('./logs/' + userid + '-warnings.log', 'Warning\nReason: ' + reason +'\n\n');
      fs.appendFileSync('./logs/' + userid + '-modwarnings.log',`Warning issued by ${authorusername}: \nReason: ${reason}\n\n`);
      
      //Notifies of the warn
      respond('⚠️',mentionedmember + ' had a warning logged.\nReason: '+reason, message.channel)
      const warnedperson = message.mentions.users.first()
      const user = client.users.cache.get(warnedperson);
      respond('⚠️','You have been warned due to: '+ reason, warnedperson)
      
      //Mod action event
	const ModReportEmbed = new Discord.MessageEmbed()
		ModReportEmbed.setColor('#FFFF00')
		ModReportEmbed.setTitle('Warn')
		ModReportEmbed.setDescription(`Warns a user`)
		ModReportEmbed.addFields(
			{ name: 'Offender', value: `${checkmemberforroles}`, inline: false },
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