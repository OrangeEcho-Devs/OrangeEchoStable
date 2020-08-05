module.exports = {
    name: 'setup',
    aliases: ['init'],
    description: 'Sets the bot up.',
    usage: '*setup',
    cooldown: 0,
    mod:false,
      execute: async (message, args, client) => {
        const Discord = require('discord.js')
        if (!message.member.hasPermission('MANAGE_SERVER')) {
          message.channel.send('Heck, you\'re missing perms. Make sure you have the `Manage Server` permissions.')
        } else {
          const setupembed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Welcome to the setup')
            .setDescription('Thanks for adding OrangeEcho Stable to the server! \nTo start, we need to run the initial setup to configure the bot so it suits the server well. \nYou can type `exit` anytime to cancel the setup.')
          message.channel.send(setupembed);
          const step1embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Step 1: Configuring the Moderator role')
            .setDescription('Please enter the role ID of a role meant for moderators. This role will allow people who have it to moderate the bot eg banning, warning, muting etc. \nPlease enter the moderator role ID now or type `exit` anytime to cancel the setup. ')
          message.channel.send(step1embed);
            let prompt = message.channel.awaitMessages(message.channel.id, 30e3);
          if (!prompt){
            message.channel.send('You didn\'t answer in time, what the heck?')
          } else {
            //Server config database
            const Sequelize = require('sequelize')
            const sequelize = new Sequelize('serverconfigdatabase', 'null', 'null',{
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            storage: 'serverconfig.sqlite'
          });
          const serverconfigdb = sequelize.define('ServerConfig', {
	          ServerID: {
		        type: Sequelize.STRING,
		        unique: true,
	        },
          ModlogChannelID: Sequelize.STRING,
          UserlogChannelID: Sequelize.STRING,
          BotManagerRoleID: Sequelize.STRING,
          ModeratorRoleID: Sequelize.STRING,
          MuteRoleID: Sequelize.STRING,
          MemberRoleID: Sequelize.STRING,
          BotlogChannelID: Sequelize.STRING,
          MessageLogChannelID: Sequelize.STRING,
          });
          serverconfigdb.sync()
            var moderatorroleid = prompt
            await serverconfigdb.update({ description: moderatorroleid }, { where: { name: 'ModeratorRoleID' } });
          const step2embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Step 2: Configuring the default members role')
            .setDescription('Sweet! Now, please enter the role ID meant for the default member. If you don\'t have one, simply copy the ID of the everyone role. \nPlease enter the member role ID or type `exit` anytime to cancel the setup.')
          message.channel.send(step2embed);
            let promptstep2 = message.channel.awaitMessages(message.channel.id, 30e3);
          if (!promptstep2){
            message.channel.send('You didn\'t answer in time, what the heck?')
          } else {
            //Server config database
            const Sequelize = require('sequelize')
            const sequelize = new Sequelize('serverconfigdatabase', 'null', 'null',{
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            storage: 'serverconfig.sqlite'
          });
          const serverconfigdb = sequelize.define('ServerConfig', {
	          ServerID: {
		        type: Sequelize.STRING,
		        unique: true,
	        },
          ModlogChannelID: Sequelize.STRING,
          UserlogChannelID: Sequelize.STRING,
          BotManagerRoleID: Sequelize.STRING,
          ModeratorRoleID: Sequelize.STRING,
          MuteRoleID: Sequelize.STRING,
          MemberRoleID: Sequelize.STRING,
          BotlogChannelID: Sequelize.STRING,
          MessageLogChannelID: Sequelize.STRING,
          });
          serverconfigdb.sync()
            var memberroleid = promptstep2
            await serverconfigdb.update({ description: memberroleid}, { where: { name: 'MemberRoleID' } });
          const step3embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Step 3: Configuring the mute role') 
            .setDescription('Great! Now, please enter the ID of the mute role in this server. This is important in order for muting to work. If you do not have a role, please create one and deny the `SEND MESSAGES` permission for that role, drag the role ABOVE the members role and then paste the ID here. \nFun Fact! Do you know how muting works? It is when the bot gives the member the mute role which does not allow the send messages permission, thus muting them.')
          message.channel.send(step3embed);
          let promptstep3 = message.channel.awaitMessages(message.channel.id, 30e3);
            if (!promptstep3){
              message.channel.send('You didn\'t answer in time, what the heck?')
            } else {
              //Server config database
            const Sequelize = require('sequelize')
            const sequelize = new Sequelize('serverconfigdatabase', 'null', 'null',{
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            storage: 'serverconfig.sqlite'
          });
          const serverconfigdb = sequelize.define('ServerConfig', {
	          ServerID: {
		        type: Sequelize.STRING,
		        unique: true,
	        },
          ModlogChannelID: Sequelize.STRING,
          UserlogChannelID: Sequelize.STRING,
          BotManagerRoleID: Sequelize.STRING,
          ModeratorRoleID: Sequelize.STRING,
          MuteRoleID: Sequelize.STRING,
          MemberRoleID: Sequelize.STRING,
          BotlogChannelID: Sequelize.STRING,
          MessageLogChannelID: Sequelize.STRING,
          });
          serverconfigdb.sync()
            var muteroleid = promptstep3
            await serverconfigdb.update({
              MuteRoleID: muteroleid
            })
          const step4embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Step 4: Configuring the modlog channel')
            .setDescription('Perfect! Now, please enter the ID for the modlog channel. This channel will log mod actions such as warnings, mutes, bans etc. You can choose to allow members to see the channel or keep it private to mods only. Your choice. But please give me the modlog channel ID now.')
          message.channel.send(step4embed);
          let promptstep4 = message.channel.awaitMessages(message.channel.id, 30e3);
              if (!promptstep4) {
                message.channel.send('You didn\'t answer in time, what the heck?')
              } else {
                //Server config database
            const Sequelize = require('sequelize')
            const sequelize = new Sequelize('serverconfigdatabase', 'null', 'null',{
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            storage: 'serverconfig.sqlite'
          });
          const serverconfigdb = sequelize.define('ServerConfig', {
	          ServerID: {
		        type: Sequelize.STRING,
		        unique: true,
	        },
          ModlogChannelID: Sequelize.STRING,
          UserlogChannelID: Sequelize.STRING,
          BotManagerRoleID: Sequelize.STRING,
          ModeratorRoleID: Sequelize.STRING,
          MuteRoleID: Sequelize.STRING,
          MemberRoleID: Sequelize.STRING,
          BotlogChannelID: Sequelize.STRING,
          MessageLogChannelID: Sequelize.STRING,
          });
          serverconfigdb.sync()
            var modlogchannelid = promptstep4
            await serverconfigdb.update({
              ModlogChannelID: modlogchannelid
            })
          const step5embed = new Discord.MessageEmbed()
            .setTitle('Step 5: Configuring the Messagelog channel for modmail')
            .setDescription('Superb! Now let\'s configure the Messagelog channel. All modmail messages received will go to that channel.')
          message.channel.send(step5embed);
          let promptstep5 = message.channel.awaitMessages(message.channel.id, 30e3);
                if (!promptstep5) {
                  message.channel.send('You didn\'t answer in time, what the heck?')
                } else {
                  //Server config database
            const Sequelize = require('sequelize')
            const sequelize = new Sequelize('serverconfigdatabase', 'null', 'null',{
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            storage: 'serverconfig.sqlite'
          });
          const serverconfigdb = sequelize.define('ServerConfig', {
	          ServerID: {
		        type: Sequelize.STRING,
		        unique: true,
	        },
          ModlogChannelID: Sequelize.STRING,
          UserlogChannelID: Sequelize.STRING,
          BotManagerRoleID: Sequelize.STRING,
          ModeratorRoleID: Sequelize.STRING,
          MuteRoleID: Sequelize.STRING,
          MemberRoleID: Sequelize.STRING,
          BotlogChannelID: Sequelize.STRING,
          MessageLogChannelID: Sequelize.STRING,
          });
          serverconfigdb.sync()
            var messagelogchannelid = promptstep5
            await serverconfigdb.update({
              MessageLogChannelID: messagelogchannelid
            })
                }
              }
            }
          }
          }
        }
      }
}