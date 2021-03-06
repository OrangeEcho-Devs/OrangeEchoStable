module.exports = {
    name: 'urban',
    aliases: ['urbandic', 'urbandictionary'],
    description: 'Searches a word in Urban Dictionary',
    usage: '',
    cooldown: 0,
    mod:false,
      execute: async (message, args, client) => {
      const Discord = require('discord.js');
      const urban = require('relevant-urban');
      const fs = require('fs');  
        if (!args[0]) return message.channel.send(`You need to specify a word for me to search dumbass`)
        let res = await urban(args.join(' ')).catch(e => {
                return message.channel.send('This word/phrase wasn\'t found. Sad.');
        });
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(res.word)
            .setURL(res.urbanURL)
            .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`)
            .addField('Author', res.author, true)
            .addField('Rating', `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`)
            .setFooter('May contain profanities \nUrban dictionary is not an alternative from a regular English dictionary, do not use it for formal stuff \n'+footertext)

        if (res.tags.length > 0 && res.tags.join(' ').length < 1024) {
            embed.addField('Tags', res.tags.join(', '), true)
        }
        message.channel.send(embed);
    
    }
}