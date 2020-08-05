module.exports = {
    name: 'declineorder',
    aliases: [''],
    description: 'Decline an order.',
    usage: '*declineorder [order number]',
    cooldown: 0,
    mod:false,
    hidden:true,
      async execute(message, args, client) {
        const Discord = require('discord.js');
        const db = require('quick.db');
        const ordernumbertoclaim = args[0]
        if(!args[0]) return message.channel.send('Please specify an order number to decline the order.')
        const order = db.fetch(`Order_${ordernumbertoclaim}`)
        const orderedby = db.fetch(`MadeOrder${ordernumbertoclaim}`)
        const deliveryman = message.author.id
        db.set(`DeclinedOrder${ordernumbertoclaim}`, 'true')
        const channelid = db.fetch(`ChannelOrder${ordernumbertoclaim}`)
        const channeltorename = client.channels.cache.get(channelid);
        channeltorename.setName(`DECLINED-Order${ordernumbertoclaim}`)
        const orderreceivechannel = client.channels.cache.get(channelid)
        const orderdm = client.users.cache.get(orderedby)
        const mainguild = client.guilds.cache.get('666122742965207060')
        const declinedorder = new Discord.MessageEmbed()
          .setColor('#FF0000')
          .setTitle('Order declined')
          .setDescription('An order was declined.')
          .addField('Order number', ordernumbertoclaim, false)
          .addField('Ordered by', `<@${orderedby}>`, false)
          .addField('Order', order, false)
          .addField('Deliverer', `<@${deliveryman}>`, false)
          .setFooter(footertext)
        orderreceivechannel.send(declinedorder);
        orderdm.send(`Hello <@${orderedby}>, your order ${ordernumbertoclaim} was just declined.`)
        const dmembed = new Discord.MessageEmbed()
          .setColor('#FF0000')
          .setTitle('Order declined')
          .setDescription('Your order was declined.')
          .addField('Order number', ordernumbertoclaim, false)
          .addField('Order', order, false)
          .addField('Deliverer', `<@${deliveryman}>`, false)
          .setFooter(footertext)
        orderdm.send(dmembed);
      }
}