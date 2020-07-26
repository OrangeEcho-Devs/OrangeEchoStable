module.exports = {
    name: 'play',
    aliases: ['music'],
    description: 'Plays some music',
    usage: '*play [music]',
    cooldown: 0,
    mod:false,
    nodelay:true,
    execute: async (client, message, args) => { 
      const Discord = require('discord.js');
      const ytdl = require('ytdl-core');
      const search = require('yt-search')
      if (!args[0]) {
        return message.channel.send('Tell me a video to search for smol brain')
      } else {
      search(args.join(' '), function(err, res) {
        if(err) return message.channel.send('Oopsie doopsie, something went wrong. If this persists, contact the bot owner Orange Group#5362')
        let videos = res.videos.slice(0, 10);
        let resp = '';
        for (var i in videos) {
          resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`;
        }
        resp += `\n**Choose a number between \`1-${videos.length}\``;
        message.channel.send(resp)
        const filter = m => isNaN(m.content) && m.content < videos.length+1 && m.content > 0;
        const collector = message.channel.createMessageCollector(filter);
        collector.videos = videos;
        collector.once('collect', function(m){
          let commandFile = require('./USER_play.js')
        commandFile.run(client, message, [this.videos[parseInt(m.content)-1].url])
        });
      });
      }
    }
}