module.exports = {
    name: 'play',
    aliases: ['stream'],
    description: 'Plays a song from YouTube.',
    usage: '*play [song]',
    cooldown: 0,
    mod:false,
    nodelay:true,
    execute: async (message, args, client, ops) => { 
    const ytdl = require('ytdl-core');
    const Discord = require('discord.js');
    const channel = message.member.voice.channel;
    const commando = require('discord.js-commando')
    const ffmpeg = require('ffmpeg')
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.channel.send('Join a VC dumbass');
		}
    if (message.guild.me.voice.channel) {
      return message.channel.send('I\'m already playing a song in this guild, dun bother me')
    }
    let validate = await ytdl.validateURL(args[0])
    if (!validate) {
      message.channel.send('Give me a **VALID** URL dummy')
    }
    let info = await ytdl.getInfo(args[0])
		voiceChannel.join().then(connection => {
			const stream = ytdl(args[0], { filter: 'audioonly' });
      const dispatcher = connection.play(stream);
      message.channel.send(`Now playing ${info.videoDetails.title}`)
			dispatcher.on('finish', () => voiceChannel.leave());
    })
  }
}