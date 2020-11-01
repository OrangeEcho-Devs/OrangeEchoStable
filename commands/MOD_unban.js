module.exports = {
    name: 'unban',
    description: 'Bans a user.',
    aliases: ['unbanish'],
	usage: '<user> <reason>',
	cooldown: 0,
	mod:true,
    execute(message, args, client) {
		const {prefix} = require('../config.json')
		const user = client.users.cache.get(args[0])
		const argarray = args
      const db = require('quick.db')
        try {
			var reason = args.join(' ')
			let userID = argarray[0]
			var reason = reason.replace(argarray[0], '')
			if (message.author.id == argarray[0]){
				respond('',`Since you're here, you aren't banned isn't that obvious??`, message.channel);
				return;
			}
			const ModeratorRoleID = db.fetch(`ModeratorRoleID_${message.guild.id}`)
			const checkmemberforroles = message.guild.members.cache.get(argarray[0])
			//if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){
				//respond('',`You can't perform that action on this user.`, message.channel);
				//return;
			//}
			if(reason == ''){
				var reason = 'No reason provided.'
			}
			fs.appendFileSync('./logs/' + userID + '-warnings.log', 'Unban\nServer: '+message.guild.name+' ('+message.guild.id+')\nReason: ' + reason +'\n\n');
      		fs.appendFileSync('./logs/' + userID + '-modwarnings.log',`Unban issued by ${authorusername} in ${message.guild.name} (${message.guild.id}) \nReason: ${reason}\n\n`);
			   
			respond('Unban',userID+' was unbanned.\nReason: '+reason, message.channel)
			message.channel.send(':warning: This is pretty buggy, please double check that the user has been unbanned correctly. The bot may not throw an error if unsuccessful.')
	const ModReportEmbed = new Discord.MessageEmbed()
		ModReportEmbed.setColor('#10C891')
		ModReportEmbed.setTitle('Unban')
		ModReportEmbed.setDescription(`Unbans a user`)
		ModReportEmbed.addFields(
			{ name: 'Offender', value: `${args[0]}`, inline: false },
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
			message.guild.members.unban(userID)
        	}catch(error) {
				respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
				errorlog(error)
				// Your code broke (Leave untouched in most cases)
				console.error('an error has occured', error);
				}
    },
};
