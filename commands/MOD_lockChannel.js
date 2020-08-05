module.exports = {
  name: 'lock',
  aliases: ['lockout'],
  description: 'Locks the channel the command is ran in.',
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
  const roletolock = message.guild.roles.cache.get(MemberRoleID)
  console.log(db.fetch(`MemberRoleID_${message.guild.id}`))
    try {
		channel.updateOverwrite(MemberRoleID, { SEND_MESSAGES: false });
		if(args != ''){respond('🔒','<#'+message.channel+'> was locked.\nReason: '+reason, message.channel)}
		else{respond('🔒','<#'+message.channel+'> was locked.\n', message.channel)}
		lockchannelaction(message.author.tag, message.channel.name)
	}catch(error) {
		respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
		errorlog(error)
		// Your code broke (Leave untouched in most cases)
		console.error('an error has occured', error);
		}
		  
  }}