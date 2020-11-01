module.exports = {
  name: 'aboutme',
  aliases: ['myinfo'],
  description: 'Gets info about you',
	execute(message, args, client) {
    const Discord = require('discord.js');
    const fs = require('fs');
    const db = require('quick.db')
    try {
      const taggeduser = message.author.id
      const taggeduserobject = message.author
      fs.readFile('./logs/'+taggeduser+'-warnings.log', (err, data) => {
        if (err) {
          console.error(err)
          const memberinfoembed = new Discord.MessageEmbed()
          .setColor('#00FF00')
          .addFields(
            { name: 'Punishment Log', value: 'No punishment information found. Yay!', inline: false },
          )
          .setTimestamp()
          if(message.author.id == '475149822366580744') {
            memberinfoembed.setDescription(`<:developer:753796559514239076> OrangeEcho Developer\n`)
            db.set(`TempAboutMe`, `<:developer:753796559514239076> OrangeEcho Developer\n`)
          }
          if(contributor == true) {
            const result = db.fetch(`TempAboutMe`)
            if(result == null) {
              memberinfoembed.setDescription(`<:contributor:753796468829192232> Contributor/Bug Tester\n`)
              db.set(`TempAboutMe`, `<:contributor:753796468829192232> Contributor/Bug Tester\n`)
            } else {
              memberinfoembed.setDescription(result+`<:contributor:753796468829192232> Contributor/Bug Tester\n`)
              db.set(`TempAboutMe`, result+`<:contributor:753796468829192232> Contributor/Bug Tester\n`)
            }
          }
          if(premium == true) {
            const result = db.fetch(`TempAboutMe`)
            if(result == null) {
              memberinfoembed.setDescription(`<:premium:753796508150923275> Premium User\n`)
              db.set(`TempAboutMe`, `<:premium:753796508150923275> Premium User\n`)
            } else {
              memberinfoembed.setDescription(result+`<:premium:753796508150923275> Premium User\n`)
              db.set(`TempAboutMe`, result+`<:premium:753796508150923275> Premium User\n`)
            }
          }
          if(partner == true) {
            const result = db.fetch(`TempAboutMe`)
            if(result == null) {
              memberinfoembed.setDescription(`<:partner:753796496352083988> OrangeEcho Partner\n`)
              db.set(`TempAboutMe`, `<:partner:753796496352083988> OrangeEcho Partner\n`)
            } else {
              memberinfoembed.setDescription(result+`<:partner:753796496352083988> OrangeEcho Partner\n`)
              db.set(`TempAboutMe`, result+`<:partner:753796496352083988> OrangeEcho Partner\n`)
            }
          }
          if(verified == true) {
            const result = db.fetch(`TempAboutMe`)
            if(result == null) {
              memberinfoembed.setDescription(`<:verified:753796668255633418> Verified\n`)
              db.set(`TempAboutMe`, `<:verified:753796668255633418> Verified\n`)
            } else {
              memberinfoembed.setDescription(result+`<:verified:753796668255633418> Verified\n`)
              db.set(`TempAboutMe`, result+`<:verified:753796668255633418> Verified\n`)
            }
          }
          
          message.channel.send(memberinfoembed)
          db.delete(`TempAboutMe`)
  
          return;
        }else{
          if(data.length > 1024){
            var data = 'Uh oh, punishment information is too long to send. Please contact a moderator for access to your punishment information.';embed()
          }else{var data= data;embed()}
          function embed(){
            const memberinfoembed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Member Information')
            .setAuthor(taggeduserobject.username)
            .addFields(
              { name: 'Punishment Log', value: data, inline: false },
            )
            if(message.author.id == '475149822366580744') {
              memberinfoembed.setDescription(`<:developer:753796559514239076> OrangeEcho Developer\n`)
              db.set(`TempAboutMe`, `<:developer:753796559514239076> OrangeEcho Developer\n`)
            }
            if(contributor == true) {
              const result = db.fetch(`TempAboutMe`)
              if(result == null) {
                memberinfoembed.setDescription(`<:contributor:753796468829192232> Contributor/Bug Tester\n`)
                db.set(`TempAboutMe`, `<:contributor:753796468829192232> Contributor/Bug Tester\n`)
              } else {
                memberinfoembed.setDescription(result+`<:contributor:753796468829192232> Contributor/Bug Tester\n`)
                db.set(`TempAboutMe`, result+`<:contributor:753796468829192232> Contributor/Bug Tester\n`)
              }
            }
            if(premium == true) {
              const result = db.fetch(`TempAboutMe`)
              if(result == null) {
                memberinfoembed.setDescription(`<:premium:753796508150923275> Premium User\n`)
                db.set(`TempAboutMe`, `<:premium:753796508150923275> Premium User\n`)
              } else {
                memberinfoembed.setDescription(result+`<:premium:753796508150923275> Premium User\n`)
                db.set(`TempAboutMe`, result+`<:premium:753796508150923275> Premium User\n`)
              }
            }
            if(partner == true) {
              const result = db.fetch(`TempAboutMe`)
              if(result == null) {
                memberinfoembed.setDescription(`<:partner:753796496352083988> OrangeEcho Partner\n`)
                db.set(`TempAboutMe`, `<:partner:753796496352083988> OrangeEcho Partner\n`)
              } else {
                memberinfoembed.setDescription(result+`<:partner:753796496352083988> OrangeEcho Partner\n`)
                db.set(`TempAboutMe`, result+`<:partner:753796496352083988> OrangeEcho Partner\n`)
              }
            }
            if(verified == true) {
              const result = db.fetch(`TempAboutMe`)
              if(result == null) {
                memberinfoembed.setDescription(`<:verified:753796668255633418> Verified\n`)
                db.set(`TempAboutMe`, `<:verified:753796668255633418> Verified\n`)
              } else {
                memberinfoembed.setDescription(result+`<:verified:753796668255633418> Verified\n`)
                db.set(`TempAboutMe`, result+`<:verified:753796668255633418> Verified\n`)
              }
            }
            memberinfoembed.setTimestamp()
            message.channel.send(memberinfoembed)
            db.delete(`TempAboutMe`)
          }
        }
  });
}catch(error) {
  respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
  errorlog(error)
  // Your code broke (Leave untouched in most cases)
  console.error('an error has occured', error);
  }
  }}