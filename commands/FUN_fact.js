module.exports = {
    name: 'fact',
    aliases: ['funfact'],
    description: 'Generates a random fun fact.',
    usage: '*fact',
    cooldown: 0,
    mod:false,
    nodelay:true,
      async execute(message, args, client) {	
        const Discord = require('discord.js');
        const fetch = require('node-fetch')
        const db = require('quick.db');
        fetch('https://uselessfacts.jsph.pl/random.json?language=en').then(response => response.json()).then(data => {
            let fact = data.text
            let username = message.guild.member(message.author);
            let nickname = username ? username.displayName : null;
            message.channel.send(`**${nickname}'s random fact** \n${fact}`);
        })
      }
    }