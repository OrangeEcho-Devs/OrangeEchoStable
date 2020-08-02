module.exports = {
    name: 'deliverorder',
    aliases: ['deliver'],
    description: 'Deliver an order.',
    usage: '*deliverorder [order number]',
    cooldown: 0,
    mod:false,
    hidden:true,
      async execute(message, args, client) {
        const Discord = require('discord.js')
        const db = require('quick.db')
        const ordernumbertodeliver = args[0]
        const order = db.fetch(`Order_${ordernumbertodeliver}`)
        const orderedby = db.fetch(`MadeOrder${ordernumbertodeliver}`)
        const deliveryman = message.author.id
        const acceptedorderstatus = db.fetch(`AcceptedOrder${ordernumbertodeliver}`);
        const channelid = db.fetch(`ChannelOrder${ordernumbertodeliver}`)
        const eco = require('discord-economy')
        if(!args[0]) return message.channel.send('Please specify the order number to deliver the food to.')
        if(acceptedorderstatus !== 'true') return message.channel.send('The order wasn\'t even accepted and prepared, what are you doing???')
        message.channel.send('Do you want to include a note for the person who ordered the food? If no, type "-')
        message.channel.awaitMessages(m => m.author.id === message.author.id, {max: '1', time: '30000'}).then(collected => {
            if(collected.first().content == collected.first().content) {
                const note = collected.first().content
                db.set(`NoteOrder${ordernumbertodeliver}`, note)
                message.channel.send('Next, please choose an image to send and send an **EXTERNAL** link to the image. **__DO NOT__** upload your own image.').then(message.channel.awaitMessages(m => m.author.id === message.author.id, {max: '1', time: '30000'}).then(collected => {
                    var image = collected.first().content
                    db.set(`ImageOrder${ordernumbertodeliver}`, image)
                    const channeltorename = client.channels.cache.get(channelid)
        channeltorename.setName(`DELIVERED-Order${ordernumbertodeliver}`)
        const orderreceivechannel = client.channels.cache.get(channelid)
        const notefordelivery = db.fetch(`NoteOrder${ordernumbertodeliver}`)
        const imagefordelivery = db.fetch(`ImageOrder${ordernumbertodeliver}`)
        const previewembed = new Discord.MessageEmbed()
            .setColor('#008000')
            .setTitle('Order delivered')
            .setDescription(`Order number ${ordernumbertodeliver} has been delivered!`)
            .addField('Order', order, false)
            .addField('Order number', ordernumbertodeliver, false)
            .addField('Ordered by', `<@${orderedby}>`, false)
            .addField('Delivery man', `<@${deliveryman}>`, false)
            .addField('Note', notefordelivery, false)
            .addField('----------------------------------------------------------------------', '⠀', false)
            .setImage(imagefordelivery)
        orderreceivechannel.send(previewembed);
        eco.AddToBalance(deliveryman, 100)
        orderreceivechannel.send(`Hey <@${deliveryman}>, thanks for completing the order! You just earned **100** coins!`)
        const todm = client.users.cache.get(orderedby)
        todm.send(`Hello <@${orderedby}>, your order **${ordernumbertodeliver}** has just been delivered! Enjoy your meal!`)
        const deliveryembed = new Discord.MessageEmbed()
            .setColor('#008000')
            .setTitle('Order delivered')
            .setDescription(`Order number ${ordernumbertodeliver} has just been delivered!`)
            .addField('Order', order, false)
            .addField('Order number', ordernumbertodeliver, false)
            .addField('Delivery man', `<@${deliveryman}>`, false)
            .addField('Note', notefordelivery, false)
            .addField('----------------------------------------------------------------------', '⠀', false)
            .setImage(imagefordelivery)
        todm.send(deliveryembed);
                }))
            }
        })
      }
    }