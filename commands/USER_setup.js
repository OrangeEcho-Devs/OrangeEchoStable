module.exports = {
  name: "setup",
  aliases: ["init"],
  description: "Sets the bot up.",
  usage: "*setup",
  cooldown: 0,
  mod: false,
  execute: async (message, args, client) => {
    const Discord = require("discord.js");
    const db = require("quick.db");
    var step1done = 'false'
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      message.channel.send(
        "Heck, you're missing perms. Make sure you have the `Manage Server` permissions."
      );
    } else {
      const setupembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Welcome to the setup")
        .setDescription(
          "Thanks for adding OrangeEcho Stable to the server! \nTo start, we need to run the initial setup to configure the bot so it suits the server well. \nYou can type `exit` anytime to cancel the setup."
        );
      message.channel.send(setupembed);
      const step1embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Step 1: Configuring the Moderator role")
        .setDescription(
          "Please enter the role ID of a role meant for moderators. This role will allow people who have it to moderate the bot eg banning, warning, muting etc. \nPlease enter the moderator role ID now or type `exit` anytime to cancel the setup. "
        );
      const step2embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Step 2: Configuring the default members role")
        .setDescription(
          "Sweet! Now, please enter the role ID meant for the default member. If you don't have one, simply copy the ID of the everyone role. \nPlease enter the member role ID or type `exit` anytime to cancel the setup."
        );
      const step3embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Step 3: Configuring the mute role")
        .setDescription(
          "Great! Now, please enter the ID of the mute role in this server. This is important in order for muting to work. If you do not have a role, please create one and deny the `SEND MESSAGES` permission for that role, drag the role ABOVE the members role and then paste the ID here. \nFun Fact! Do you know how muting works? It is when the bot gives the member the mute role which does not allow the send messages permission, thus muting them."
        );
      const step4embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Step 4: Configuring the modlog channel")
          .setDescription(
            "Perfect! Now, please enter the ID for the modlog channel. This channel will log mod actions such as warnings, mutes, bans etc. You can choose to allow members to see the channel or keep it private to mods only. Your choice. But please give me the modlog channel ID now."
          );
      const step5embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Step 5: Configuring the Messagelog channel for modmail")
            .setDescription(
              "Superb! Now let's configure the Messagelog channel. All modmail messages received will go to that channel."
            );
      const step6embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Step 6: Configuring the Userlog channel")
            .setDescription(":thumbsup: Now let's configure the Userlog channel. Member joins and leaves will be recorded there.")
      const doneembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Done!")
        .setDescription("Done! We have finished setting up the bot. Have fun!")
      message.channel.send(step1embed);
      message.channel.awaitMessages(m => m.author.id == message.author.id,
                            {max: 1, time: 30000}).then(collected => {
        if (collected.first().content.toLowerCase() == collected.first().content.toLowerCase()) {
          if (collected.first().content.toLowerCase() == 'exit') {
            return message.channel.send('Operation cancelled. \nOnce you are ready, please restart the setup as the setup is very important in order to properly customise this bot for your server.')
          } else if (collected.first().content.toLowerCase() == 'undefined') {
            return message.channel.send('You didn\'t answer in time, what the heck???')
          } else {
          var responsestep1 = collected.first().content.toLowerCase()
          db.set(`ModeratorRoleID_${message.guild.id}`, responsestep1)
        const step2embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Step 2: Configuring the default members role")
        .setDescription(
          "Sweet! Now, please enter the role ID meant for the default member. If you don't have one, simply copy the ID of the everyone role. \nPlease enter the member role ID or type `exit` anytime to cancel the setup."
        );
        message.channel.send(step2embed).then(message.channel.awaitMessages(m => m.author.id == message.author.id,
                                   {max: 1, time: 30000}).then(collected => {
          if (collected.first().content.toLowerCase() == collected.first().content.toLowerCase()) {
            if (collected.first().content.toLowerCase() == 'exit') {
              return message.channel.send('Operation cancelled. \nOnce you are ready, please restart the setup as the setup is very important in order to properly customise this bot for your server.')
            } else if (collected.first().content.toLowerCase() == 'undefined') {
              return message.channel.send('You didn\'t answer in time, what the heck???')
            } else {
            var responsestep2 = collected.first().content.toLowerCase()
            db.set(`MemberRoleID_${message.guild.id}`, responsestep2)
            message.channel.send(step3embed).then(message.channel.awaitMessages(m => m.author.id == message.author.id,
                                   {max: 1, time: 30000}).then(collected => {
              if (collected.first().content.toLowerCase() == collected.first().content.toLowerCase()) {
                if (collected.first().content.toLowerCase() == 'exit') {
                  return message.channel.send('Operation cancelled. \nOnce you are ready, please restart the setup as the setup is very important in order to properly customise this bot for your server.')
                } else if (collected.first().content.toLowerCase() == 'undefined') {
                  return message.channel.send('You didn\'t answer in time, what the heck???')
                } else {
                var responsestep3 = collected.first().content.toLowerCase()
                db.set(`MuteRoleID_${message.guild.id}`, responsestep3)
            message.channel.send(step4embed).then(message.channel.awaitMessages(m => m.author.id == message.author.id,
                                   {max: 1, time: 30000}).then(collected => {
              if (collected.first().content.toLowerCase() == collected.first().content.toLowerCase()) {
                if (collected.first().content.toLowerCase() == 'exit') {
                  return message.channel.send('Operation cancelled. \nOnce you are ready, please restart the setup as the setup is very important in order to properly customise this bot for your server.')
                } else if (collected.first().content.toLowerCase() == 'undefined') {
                  return message.channel.send('You didn\'t answer in time, what the heck???')
                }
                var responsestep4 = collected.first().content.toLowerCase()
                db.set(`ModlogID_${message.guild.id}`, responsestep4)
            message.channel.send(step5embed).then(message.channel.awaitMessages(m => m.author.id == message.author.id,
                                   {max: 1, time: 30000}).then(collected => {
              if (collected.first().content.toLowerCase() == collected.first().content.toLowerCase()) {
                if (collected.first().content.toLowerCase() == 'exit') {
                  return message.channel.send('Operation cancelled. \nOnce you are ready, please restart the setup as the setup is very important in order to properly customise this bot for your server.')
                } else if (collected.first().content.toLowerCase() == 'undefined') {
                  return message.channel.send('You didn\'t answer in time, what the heck???')
                } else {
                var responsestep5 = collected.first().content.toLowerCase()
                db.set(`MessageLogID_${message.guild.id}`, responsestep5)
                message.channel.send(step6embed).then(message.channel.awaitMessages(m => m.author.id == message.author.id,
                                   {max: 1, time: 30000}).then(collected => {
                  if (collected.first().content.toLowerCase() == collected.first().content.toLowerCase()) {
                    if (collected.first().content.toLowerCase() == 'exit') {
                      return message.channel.send('Operation cancelled. \nOnce you are ready, please restart the setup as the setup is very important in order to properly customise this bot for your server.')
                    } else if(collected.first().content.toLowerCase() == 'undefined') {
                      return message.channel.send('You didn\'t answer in time, what the heck???')
                    } else {
                      var responsestep6 = collected.first().content.toLowerCase()
                      db.set(`UserlogID_${message.guild.id}`, responsestep6)
                      message.channel.send(doneembed);
                    }
                  }
                }))
                }
              }
              }
              
          
        
      ))
          }
          }
          
      ))
        }
      }
      
    
    }))

        
          
        
        
                                                               
                                                               
                                              
        
            }    
          }
        }))
          }
        }
      })
    }
  }
} 
                                                               