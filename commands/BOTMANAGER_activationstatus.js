module.exports = {
	name: 'activationstatus',
	aliases: [''],
	description: 'Checks activation status of every guild.',
	botmanager:true,
	mod:true,
	async execute (message, args, client) {
        const Discord = require('discord.js')
        const db = require('quick.db')
        console.log('executed')
        const embed = new Discord.MessageEmbed()
            .setTitle('Activation status')
        client.guilds.cache.forEach(guild => {
            const status = db.fetch(`ModeratorRoleID_${guild.id}`)
            if(status == null) {
                const getprevious = db.fetch(`TempEmbedActivation`)
                if(getprevious == null) {
                    embed.setDescription(`:x: OrangeEcho is not activated | ${guild.name} (${guild.id}) \n`)
                    db.set(`TempEmbedActivation`, embed.description)
                } else {
                    embed.setDescription(getprevious+`:x: OrangeEcho is not activated | ${guild.name} (${guild.id}) \n`)
                    db.set(`TempEmbedActivation`, embed.description)
                }
            } else {
                const getprevious = db.fetch(`TempEmbedActivation`)
                if(getprevious == null) {
                    embed.setDescription(`:white_check_mark: OrangeEcho is activated | ${guild.name} (${guild.id})  \n`)
                    db.set(`TempEmbedActivation`, embed.description)
                } else {
                    embed.setDescription(getprevious+`:white_check_mark: OrangeEcho is activated | ${guild.name} (${guild.id})  \n`)
                    db.set(`TempEmbedActivation`, embed.description)
                }
            }
        })
        db.delete(`TempEmbedActivation`);
        message.channel.send(embed);
    }
}