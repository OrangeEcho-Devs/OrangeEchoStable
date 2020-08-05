module.exports = {
    name: 'acceptorder',
    aliases: [''],
    description: 'Accept an order.',
    usage: '*acceptorder [order number]',
    cooldown: 0,
    mod:false,
      async execute(message, args, client) {
        const Discord = require('discord.js')
        const fs = require('fs');
        const ordernumbertoclaim = args[0]
        const db = require('quick.db');
        const ordernumber = db.fetch(`NumberOfOrders`)
        if(!args[0]) return message.channel.send('Please specify an order number.')
        const order = db.fetch(`Order_${ordernumbertoclaim}`)
        const orderedby = db.fetch(`MadeOrder${ordernumbertoclaim}`);
        const deliveryman = message.author.id
        db.set(`AcceptedOrder${ordernumbertoclaim}`, 'true')
        const channelid = db.fetch(`ChannelOrder${ordernumbertoclaim}`)
        const channeltorename = client.channels.cache.get(channelid)
        channeltorename.setName(`ACCEPTED-Order${ordernumber}`)
        const orderreceivechannel = client.channels.cache.get(channelid)
        const orderdm = client.users.cache.get(orderedby)
        const acceptedorder = new Discord.MessageEmbed()
          .setColor('#FFFF00')
          .setTitle('Order accepted')
          .setDescription('An order was accepted.')
          .addField('Order number', ordernumbertoclaim, false)
          .addField('Ordered by', `<@${orderedby}>`, false)
          .addField('Order', order, false)
          .addField('Deliverer', `<@${deliveryman}>`, false)
          .addField('Delivering orders', 'To deliver orders, use `*deliverorder [order number]`')
          .setFooter(footertext)
        orderreceivechannel.send(acceptedorder);
        orderdm.send(`Hello <@${orderedby}>, your order number **${ordernumbertoclaim}** has just been accepted!`)
        const orderedbyembed = new Discord.MessageEmbed()
          .setColor('#FFFF00')
          .setTitle('Order accepted')
          .setDescription(`Your order number ${ordernumbertoclaim} has just been accepted!`)
          .addField('Order', order, false)
          .addField('Order number', ordernumbertoclaim, false)
          .addField('Deliverer', `<@${deliveryman}>`, false)
          .addField('When will my food be delivered?', 'It is currently preparing now, please wait while they\'re done with the cooking.', false)
          .setFooter(footertext)
        orderdm.send(orderedbyembed);
      }
    }
