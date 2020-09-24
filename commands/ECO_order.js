module.exports = {
    name: 'order',
    aliases: [''],
    description: 'Buy some food to eat!',
    usage: '*order [item name]',
    cooldown: 0,
    mod:false,
      async execute(message, args, client) {
        const Discord = require('discord.js');
        const fs = require('fs');
        const toOrder = args.join(' ');
        const db = require('quick.db');
        const mainguild = client.guilds.cache.get('666122742965207060')
        if(!args[0]) return message.channel.send('You can\'t send a blank order dummy, order something')
        message.channel.send(`Do you really want to order "${toOrder}"? (y/n)`)
        message.channel.awaitMessages(m => m.author.id === message.author.id, {max: '1', time: '15000'}).then(collected => {
          if(collected.first().content.toLowerCase() == collected.first().content.toLowerCase()) {
            if(collected.first().content.toLowerCase() == 'y') {
              db.add(`NumberOfOrders`, 1)
              const ordernumber = db.fetch(`NumberOfOrders`)
              db.set(`Order_${ordernumber}`, toOrder)
              db.set(`MadeOrder${ordernumber}`, message.author.id)
              const madeorder = db.fetch(`MadeOrder${ordernumber}`)
              message.channel.send('✅Order sent successfully! Please wait while your order is accepted and prepared.')
              mainguild.channels.create(`UNCLAIMED-Order${ordernumber}`)
              .then(channel => {
                let category = mainguild.channels.cache.find(c => c.name == 'Order food' && c.type == 'category')
                const modrole2 = mainguild.roles.cache.find(role => role.name == 'Level 2 Mod')
                const modrole3 = mainguild.roles.cache.find(role => role.name == 'Level 3 Senior Mod')
                channel.setParent('743062184438923264')
                db.set(`ChannelOrder${ordernumber}`, channel.id)
                channel.updateOverwrite(channel.guild.roles.everyone, { VIEW_CHANNEL: false });
                channel.updateOverwrite(modrole2, {VIEW_CHANNEL: true, SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true});
                channel.updateOverwrite(modrole3, {VIEW_CHANNEL: true, SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true});
              const orderreceivechannel = client.channels.cache.get(channel.id)
              const orderreceiveembed = new Discord.MessageEmbed()
                .setColor('#FFA500')
                .setTitle('Order received')
                .setDescription(`An order was received.`)
                .addField('Order number:', db.fetch(`NumberOfOrders`) ,false)
                .addField('Ordered by:', `<@${madeorder}>`, false)
                .addField('Order', toOrder, false)
                .addField('Accepting orders', 'To accept orders, use `*acceptorder [order number]`\nTo decline orders, use `*declineorder [ordernumber]`', false)
                .setFooter(footertext)
              orderreceivechannel.send(orderreceiveembed);
              })
            } else if (collected.first().content.toLowerCase() == 'n') {
              message.channel.send('❌You cancelled the order. Sad.')
            }
          }
        })
    }
}