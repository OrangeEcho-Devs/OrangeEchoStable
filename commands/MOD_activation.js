module.exports = {
    name: 'activation',
    aliases: [''],
    description: 'Shows activation status.',
    usage: '*activation',
    cooldown: 0,
    mod:true,
      execute: async (message, args, client) => {
          const Discord = require('discord.js')
          const db = require('quick.db')
          const activationembed = new Discord.MessageEmbed()
          .setTitle('Activation status')
          const result = db.fetch(`ModeratorRoleID_${message.guild.id}`)
          if(result == null) {
              activationembed.setDescription(':x: OrangeEcho is not activated in this guild. To activate, run `*setup`')
              message.channel.send(activationembed)
          } else {
              activationembed.setDescription(':white_check_mark: OrangeEcho is activated.')
              message.channel.send(activationembed)
          }
      }
    }