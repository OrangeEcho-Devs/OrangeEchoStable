module.exports = {
	name: 'deactivate',
	aliases: [''],
	description: 'Deactivates a guild from OrangeEcho.',
	botmanager:true,
	mod:true,
	async execute (message, args, client) {
        const Discord = require('discord.js')
        const db = require('quick.db')
        if(!args[0]) {
            const guild = message.guild.id
            const guildname = message.guild.name
            db.delete(`ModeratorRoleID_${guild}`)
            db.delete(`MemberRoleID_${guild}`)
            db.delete(`MuteRoleID_${guild}`)
            db.delete(`ModlogID_${guild}`)
            db.delete(`MessageLogID_${guild}`)
            db.delete(`UserlogID_${guild}`)
            message.channel.send(':white_check_mark: The copy of OrangeEcho was deactivated in the server "'+guildname+'" ('+guild+'). They\'ll have to run `*setup` to reactivate OrangeEcho again.')
        } else {
            const guildfind = client.guilds.cache.get(args[0])
            const guild = guildfind.id
            const guildname = guildfind.name
            db.delete(`ModeratorRoleID_${guild}`)
            db.delete(`MemberRoleID_${guild}`)
            db.delete(`MuteRoleID_${guild}`)
            db.delete(`ModlogID_${guild}`)
            db.delete(`MessageLogID_${guild}`)
            db.delete(`UserlogID_${guild}`)
            message.channel.send(':white_check_mark: The copy of OrangeEcho was deactivated in the server "'+guildname+'" ('+guild+'). They\'ll have to run `*setup` to reactivate OrangeEcho again.')
        }
    }
}