const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: 'commands [command name]',
	cooldown: 2,
	essential:true,
	execute(message, args, client) {
		const data = [];
		const { commands } = message.client;
		const { modcommands } = message.client;
		const Discord = require('discord.js');
    const db = require('quick.db')
		const { MessageEmbed } = require('discord.js')
		const ModeratorRoleID = db.fetch(`ModeratorRoleID_${message.guild.id}`)
    const {BotManagerRoleID} = require('../config.json')
		try {
			if (fs.existsSync(`./safe_mode.flag`)){
				helpEmbedColor = 'FF0000'
			}else{
				helpEmbedColor = '0099ff'
			}
			getCommandInfo = function(commandToFind){
				var name = commandToFind

			const command = modcommands.get(name) || modcommands.find(c => c.aliases && c.aliases.includes(name));
	
			if (!command) {
				return respond('',`<@${message.author.id}>, that's not a valid command!`, message.channel);
			}
			if(command.mod)var isModOnly = ", mod only."
	
			const helpInfoEmbed = new Discord.MessageEmbed()
				helpInfoEmbed.setColor(helpEmbedColor)
				helpInfoEmbed.setTitle('Command Info')
				helpInfoEmbed.setDescription(`Here is some information about the ${command.name} command.`)
				helpInfoEmbed.addField('Command name', `${command.name}`, false)
				if(command.aliases){
					helpInfoEmbed.addField('Aliases', `${command.aliases.join(', ')}`, false)
				}
				if(command.description){
					helpInfoEmbed.addField('Description', command.description, false)
				}
				if(command.usage){
					helpInfoEmbed.addField('Usage', `${prefix}${command.name} ${command.usage}`, false)
				}
				if(command.mod){
					helpInfoEmbed.addField('This is a mod only command.', `\u200b`, false)
				}
				helpInfoEmbed.setTimestamp()
				helpInfoEmbed.setFooter(footertext);
			message.channel.send(helpInfoEmbed);
			}

			// code that might fail
			if (!args.length) {
				var modPerm = false
				var botManagerPerm = false

				if(message.member.roles.cache.some(role => role.id === ModeratorRoleID)){
					var modPerm = true
				}
				const modpermbypass = db.fetch(`DevToolsStatus_${message.author.id}`)
				if(modpermbypass == 'true') {
					var modPerm = true
					var botManagerPerm = true
				}
				if(message.member.roles.cache.some(role => role.id === `${BotManagerRoleID}`)){
					var botManagerPerm = true
				}

				const result = getCommandList(modPerm, botManagerPerm, message.author.id, true)
                data.push(result);
				data.push(`\nYou can send \`${prefix}help [category name]\` to see commands in that category.`);
				data.push(`\nYou can also send \`${prefix}help commands [command name]\` to get info\n on that command.`);
				if (fs.existsSync(`./safe_mode.flag`)){
					data.push(`\n**Safe mode is activated. Commands are limited to essential only.**`);
				}
				let targetuser = message.member.displayName
				let avatar = message.author.avatarURL()
                const helpEmbed = new Discord.MessageEmbed()
                .setColor(helpEmbedColor)
                .setTitle('Available Commands')
				.setDescription('Here are the available commands.')
				.setAuthor(targetuser, avatar)
                .addFields(
					//{ name: 'Commands', value: data, inline: true },
					{ name: 'Economy', value: '`*help economy`', inline: true},
					{ name: 'Memey', value: '`*help memey`', inline: true},
					{ name: 'Games', value: '`*help games`', inline: true },
					{ name: 'Misc', value: '`*help misc`', inline: true},
					{ name: 'Fun', value: '`*help fun`', inline: true },
					{ name: 'Config', value: '`*help config`', inline: true },
					{ name: 'Moderation', value: '`*help moderation`', inline: true},
					{ name: 'Bot Stuff', value: '`*help botstuff`', inline: true},
					{ name: 'Music', value: '`*help music`', inline: true},
                )
                .setFooter(footertext);
            
				return message.channel.send(helpEmbed)
				}
				if(args[1] && args[1].toLowerCase() == 'manager' || args[0] ){
					if(args[0].toLowerCase() == 'user'){
						message.channel.send('**"User" category in help menu is deprecated.**\nPlease use `*help` for a list of the new categories.')
						return;
					}else if(args[0].toLowerCase() == 'moderation'){
						try {
						let targetuser = message.member.displayName
						let avatar = message.author.avatarURL()
						const result = getCommandList(true, false, false, false, false, false, false, false, false, false, message.author.id, false)
						const helpInfoEmbed = new Discord.MessageEmbed()
						.setAuthor(targetuser, avatar)
						helpInfoEmbed.setColor('#0099ff')
						helpInfoEmbed.setTitle('Commands in '+args[0])
						.setDescription('`'+result+'`')
						helpInfoEmbed.setFooter(footertext);
						message.channel.send(helpInfoEmbed);
						}catch(error) {
							let targetuser = message.member.displayName
							let avatar = message.author.avatarURL()
							const emptyembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Commands in '+args[0])
							.setAuthor(targetuser, avatar)
							.setDescription('No commands were found under this category.')
							.setFooter(footertext)
							message.channel.send(emptyembed);
						}
					}else if((`${args[0]} ${args[1]}`).toLowerCase() == 'bot manager'){
						try {
						if(!message.member.roles.cache.some(role => role.id === `${BotManagerRoleID}`)){
							return message.channel.send('Go away spy, you aren\'t a bot dev')
						}
						let targetuser = message.member.displayName
						let avatar = message.author.avatarURL()
						const result = getCommandList(false, true, false, false, false, false, false, false, false, false, message.author.id, false)
						const helpInfoEmbed = new Discord.MessageEmbed()
						.setAuthor(targetuser, avatar)
						helpInfoEmbed.setColor('#0099ff')
						helpInfoEmbed.setTitle('Commands in '+args[0] +' '+ args[1])
						.setDescription('`'+result+'`')
						helpInfoEmbed.setFooter(footertext);
						message.channel.send(helpInfoEmbed);
						}catch(error) {
							let targetuser = message.member.displayName
							let avatar = message.author.avatarURL()
							const emptyembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Commands in '+args[0])
							.setAuthor(targetuser, avatar)
							.setDescription('No commands were found under this category.')
							.setFooter(footertext)
							message.channel.send(emptyembed);
						}
					}else if(args[0].toLowerCase() == 'economy') {
						try {
						const result = getCommandList(false, false, true, false, false, false, false, false, false, false, message.author.id, false)
						let targetuser = message.member.displayName
						let avatar = message.author.avatarURL()
						const helpInfoEmbed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Commands in '+args[0])
						.setAuthor(targetuser, avatar)
						.setDescription('`'+result+'`')
						.setFooter(footertext);
						message.channel.send(helpInfoEmbed);
						}catch(error) {
							let targetuser = message.member.displayName
							let avatar = message.author.avatarURL()
							const emptyembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Commands in '+args[0])
							.setAuthor(targetuser, avatar)
							.setDescription('No commands were found under this category.')
							.setFooter(footertext)
							message.channel.send(emptyembed);
						}
					}else if(args[0].toLowerCase() == 'memey') {
						try {
						let targetuser = message.member.displayName
						let avatar = message.author.avatarURL()
						const result = getCommandList(false, false, false, true, false, false, false, false, false, false, message.author.id, false)
						const helpInfoEmbed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Commands in '+args[0])
						.setAuthor(targetuser, avatar)
						.setDescription('`'+result+'`')
						.setFooter(footertext);
						message.channel.send(helpInfoEmbed);
						}catch(error) {
							let targetuser = message.member.displayName
							let avatar = message.author.avatarURL()
							const emptyembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Commands in '+args[0])
							.setAuthor(targetuser, avatar)
							.setDescription('No commands were found under this category.')
							.setFooter(footertext)
							message.channel.send(emptyembed);
						}
					}else if(args[0].toLowerCase() == 'games') {
						try {
						const result = getCommandList(false, false, false, false, true, false, false, false, false, false, message.author.id, false)
						let targetuser = message.member.displayName
						let avatar = message.author.avatarURL()
						const helpInfoEmbed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Commands in '+args[0])
						.setAuthor(targetuser, avatar)
						.setDescription('`'+result+'`')
						.setFooter(footertext);
						message.channel.send(helpInfoEmbed);
						}catch(error) {
							let targetuser = message.member.displayName
							let avatar = message.author.avatarURL()
							const emptyembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Commands in '+args[0])
							.setAuthor(targetuser, avatar)
							.setDescription('No commands were found under this category.')
							.setFooter(footertext)
							message.channel.send(emptyembed);
						}
					}else if(args[0].toLowerCase() == 'config') {
						try {
						const result = getCommandList(false, false, false, false, false, false, false, true, false, false, message.author.id, false)
						let targetuser = message.member.displayName
						let avatar = message.author.avatarURL()
						const helpInfoEmbed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Commands in '+args[0])
						.setAuthor(targetuser, avatar)
						.setDescription('`'+result+'`')
						.setFooter(footertext);
						message.channel.send(helpInfoEmbed);
						}catch(error) {
							let targetuser = message.member.displayName
							let avatar = message.author.avatarURL()
							const emptyembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Commands in '+args[0])
							.setAuthor(targetuser, avatar)
							.setDescription('No commands were found under this category.')
							.setFooter(footertext)
							message.channel.send(emptyembed);
						}
					}else if(args[0].toLowerCase() == 'fun'){
						try {
						const result = getCommandList(false, false, false, false, false, false, true, false, false, false, message.author.id, false)
						let targetuser = message.member.displayName
						let avatar = message.author.avatarURL()
						const helpInfoEmbed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Commands in '+args[0])
						.setAuthor(targetuser, avatar)
						.setDescription('`'+result+'`')
						.setFooter(footertext);
						message.channel.send(helpInfoEmbed);
						}catch(error) {
							let targetuser = message.member.displayName
							let avatar = message.author.avatarURL()
							const emptyembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Commands in '+args[0])
							.setAuthor(targetuser, avatar)
							.setDescription('No commands were found under this category.')
							.setFooter(footertext)
							message.channel.send(emptyembed);
						}
					}else if(args[0].toLowerCase() == 'misc') {
						try {
						const result = getCommandList(false, false, false, false, false, true, false, false, false, false, message.author.id, false)
						let targetuser = message.member.displayName
						let avatar = message.author.avatarURL()
						const helpInfoEmbed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Commands in '+args[0])
						.setAuthor(targetuser, avatar)
						.setDescription('`'+result+'`')
						.setFooter(footertext);
						message.channel.send(helpInfoEmbed);
						}catch(error) {
							let targetuser = message.member.displayName
							let avatar = message.author.avatarURL()
							const emptyembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Commands in '+args[0])
							.setAuthor(targetuser, avatar)
							.setDescription('No commands were found under this category.')
							.setFooter(footertext)
							message.channel.send(emptyembed);
						}
					}else if(args[0].toLowerCase() == 'botstuff') {
						try {
						const result = getCommandList(false, false, false, false, false, false, false, false, true, false, message.author.id, false)
						let targetuser = message.member.displayName
						let avatar = message.author.avatarURL()
						const helpInfoEmbed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Commands in '+args[0])
						.setAuthor(targetuser, avatar)
						.setDescription('`'+result+'`')
						.setFooter(footertext);
						message.channel.send(helpInfoEmbed);
						}catch(error) {
							let targetuser = message.member.displayName
							let avatar = message.author.avatarURL()
							const emptyembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Commands in '+args[0])
							.setAuthor(targetuser, avatar)
							.setDescription('No commands were found under this category.')
							.setFooter(footertext)
							message.channel.send(emptyembed);
						}
					}else if(args[0].toLowerCase() == 'music') {
						try {
						const result = getCommandList(false, false, false, false, false, false, false, false, false, true, message.author.id, false)
						let targetuser = message.member.displayName
						let avatar = message.author.avatarURL()
						const helpInfoEmbed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Commands in '+args[0])
						.setAuthor(targetuser, avatar)
						.setDescription('`'+result+'`')
						.setFooter(footertext);
						message.channel.send(helpInfoEmbed);
						}catch(error) {
							let targetuser = message.member.displayName
							let avatar = message.author.avatarURL()
							const emptyembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Commands in '+args[0])
							.setAuthor(targetuser, avatar)
							.setDescription('No commands were found under this category.')
							.setFooter(footertext)
							message.channel.send(emptyembed);
						}
					}else{
						respond('', '❗ Something went wrong.', message.channel)
						return;
					}
				}
			
		}catch(error) {
			respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
			errorlog(error)
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occurred', error);
			}
		
	},
};