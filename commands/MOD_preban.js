module.exports = {
    name: 'preban',
    description: 'Bans a user by ID when they join the server.',
	usage: '<user id> <reason>',
	cooldown: 0,
	mod:true,
    execute(message, args, client) {
		const {prefix} = require('../config.json')
		const argarray = message.content.slice(prefix.length).trim().split(/ +/g);
		const fs = require('fs')
		const userToPreBan = message.mentions.members.first()
    const db = require('quick.db')
        try {
			if(message.mentions.members.first()){
				respond('',`Please use the \`ban\` command instead.`, message.channel);
				return;
			}

			const idToBan = argarray[1]
			if (message.author.id == idToBan){
				respond('',`Are you REALLY gonna try and preban **YOURSELF**`, message.channel);
				return;
			}
			const {ModeratorRoleID} = db.fetch(`ModeratorRoleID_${message.guild.id}`)
			if(message.guild.members.cache.get(idToBan)){
				const checkmemberforroles = message.guild.members.cache.get(idToBan)

			if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){
				respond('',`You can't perform that action on this user.`, message.channel);
				return;
			}
			}
			

			fs.readFile(`./logs/SVRBAN_${message.guild.id}idbanlist.txt`, function(err, data){
				if(err)console.log(err);
				if(data.toString().includes(idToBan)){
					respond('Error', 'User is already on the pre-ban list. What are you doing??', message.channel)
					return;
				}else{
					const userid = argarray[1]
					const authorusername = message.author.username +'#' +message.author.discriminator
					let reasonraw = args.join(' ')
					var reason = reasonraw.replace(`${argarray[1]}`, '');
					if(reason == ''){
						var reason = 'No reason provided.'
					}
					fs.appendFileSync(`./logs/SVRBAN_${message.guild.id}idbanlist.txt`, `${userid}\n`);
					fs.appendFileSync('./logs/' + userid + '-warnings.log', 'Ban\nReason: ' + reason +'\n\n');
					fs.appendFileSync('./logs/' + userid + '-modwarnings.log', 'Ban issued by '+ authorusername +'\nReason: ' + reason +'\n\n');
					respond('Preban',argarray[1]+' was prebanned.\nReason: '+reason, message.channel)
	const ModReportEmbed = new Discord.MessageEmbed()
		ModReportEmbed.setColor('#F20B8E')
		ModReportEmbed.setTitle('Preban')
		ModReportEmbed.setDescription(`Bans the user when they enter the server`)
		ModReportEmbed.addFields(
			{ name: 'Offender', value: `${userToPreBan}`, inline: false },
			{ name: 'Responsible Moderator', value: `${RanBy}`, inline: false },
			{ name: 'Reason', value: `${reason}`, inline: false }
		)
		ModReportEmbed.setTimestamp()
    const ModLog = db.fetch(`ModlogID_${message.guild.id}`)
		const modlogchannel = client.channels.cache.get(`${ModLog}`);
		modlogchannel.send(ModReportEmbed)


				}
			})
			
			
        	}catch(error) {
				respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
				errorlog(error)
				// Your code broke (Leave untouched in most cases)
				console.error('an error has occured', error);
				}
    },
};
