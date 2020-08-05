module.exports = {
    name: 'stop',
    aliases: ['fuckoff'],
    description: 'Stops a song.',
    usage: '*stop',
    cooldown: 0,
    mod:false,
    nodelay:true,
    execute: async (message, args, client) => { 
    const ytdl = require('ytdl-core');
    const Discord = require('discord.js');
    const channel = message.member.voice.channel;
    const commando = require('discord.js-commando')
    const ffmpeg = require('ffmpeg')
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.channel.send('Join a VC dumbass');
    }
    if (!message.guild.me.voice.channel) {
      return message.channel.send('I\'m not in a VC dummy')
    }
    voiceChannel.leave()
    message.channel.send('Successfully stopped the music and disconnected.')
  }
}