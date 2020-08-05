module.exports = {
    name: 'search',
    aliases: ['find'],
    description: 'Searches for a song. For lazy people who don\'t want to give the direct link.',
    usage: '*search [query]',
    cooldown: 0,
    mod:false,
    nodelay:true,
    execute: async (message, args, client) => { 
        const search = require('youtube-node')
        const Discord = require('discord.js')
        const ytdl = require('ytdl-core')
        const voiceChannel = message.member.voice.channel
        const YouTubeAPI = require("simple-youtube-api");
        const youtube = new YouTubeAPI('NO KEY FOR U');
        /*search(args.join(' ')), function(err, res) {
            if(err) return message.channel.send('Something went wrong. Please try again or contact the bot devs.')
            let videos = res.slice(0, 10);
            let resp = '';
            for (var i in videos) {
                resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`;
            }
            resp += `\n**Choose a number between \`1-${videos.length}\``;
            message.channel.send(resp);
            const filter = m => isNaN(m.content) && m.content < videos.length+1 && m.content > 0;
            const collector = message.channel.awaitMessages(filter);
            collector.videos = videos;
            collector.once('collect', function(m) {
                let commandFile = require('./MUSIC_play.js');
                commandFile.run(client, message, [this.videos[parseInt(m.content)-1].url], ops)
            })
        }
        if(!args[0]) return message.channel.send('Give me something to search dummy');
        if(!voiceChannel) return message.channel.send('Join a VC dummy');
        const videos = await newsearch.search(args[0])
        message.channel.send(videos)
        let info = await ytdl.getInfo(args[0])
		voiceChannel.join().then(connection => {
			const stream = ytdl(videos, { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            message.channel.send(`Now playing ${info.videoDetails.title}`)
			dispatcher.on('finish', () => voiceChannel.leave());
        })*/
       if (!args.length)
       return message.channel.send(`Usage: ${message.client.prefix}${module.exports.name} <Video Name>`).catch(console.error);
     if (message.channel.activeCollector)
       return message.channel.send("A message collector is already active in this channel.");
     if (!message.member.voice.channel)
       return message.channel.send("Join a VC dummy").catch(console.error);
 
     const tosearch = args.join(" ");
 
     let resultsEmbed = new MessageEmbed()
       .setTitle(`**Reply with the song number you want to play**`)
       .setDescription(`Results for: ${tosearch}`)
       .setColor("#F8AA2A");
 
     try {
       const results = await youtube.searchVideos(tosearch, 10);
       results.map((video, index) => resultsEmbed.addField(video.shortURL, `${index + 1}. ${video.title}`));
 
       var resultsMessage = await message.channel.send(resultsEmbed);
 
       function filter(msg) {
         const pattern = /(^[1-9][0-9]{0,1}$)/g;
         return pattern.test(msg.content) && parseInt(msg.content.match(pattern)[0]) <= 10;
       }
 
       message.channel.activeCollector = true;
       const response = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] });
       const choice = resultsEmbed.fields[parseInt(response.first()) - 1].name;
       let info = await ytdl.getInfo(args[0].join(' '))
       voiceChannel.join().then(connection => {
           const stream = ytdl(videos, { filter: 'audioonly' });
           const dispatcher = connection.play(stream);
           message.channel.send(`Now playing ${info.videoDetails.title}`)
           dispatcher.on('finish', () => voiceChannel.leave());
       })
       message.channel.activeCollector = false;
       resultsMessage.delete().catch(console.error);
     } catch (error) {
       console.error(error);
       message.channel.activeCollector = false;
     }
    }
}