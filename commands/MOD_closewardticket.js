module.exports = {
    name: 'closewardticket',
    aliases: [''],
    description: 'Closes a ward ticket.',
    usage: '*closewardticket [ticket]',
    cooldown: 0,
    mod:true,
      execute: async (message, args, client) => {
        const Discord = require('discord.js');
        const db = require('quick.db');
        if(message.guild.id !== '741839101598367856') return message.channel.send('You need to be in the **fishy hospital** Discord server to run this command.')
        const isolationrole = message.guild.roles.cache.get('741853295647391774')
        const covid19role = message.guild.roles.cache.get('741852381926522902')
        const covid19consultation = message.guild.roles.cache.get('741861823766200361')
        const radiology = message.guild.roles.cache.get('741852383109316679')
        const biopsy = message.guild.roles.cache.get('741852938858791005')
        const electricaldiagnosis = message.guild.roles.cache.get('741853169482727466')
        const psychology = message.guild.roles.cache.get('741877879863902279')
        const bloodtest = message.guild.roles.cache.get('741885445297930300')
        const outpatient = message.guild.roles.cache.get('741855100573843558')
        const generaloperation = message.guild.roles.cache.get('741968455015596052')
        const ward1 = message.guild.roles.cache.get('741881020818915448')
        const ward2 = message.guild.roles.cache.get('741881053039427714')
        const ward3 = message.guild.roles.cache.get('741881066066935911')
        const ward4 = message.guild.roles.cache.get('741881090733768705')
        const icu = message.guild.roles.cache.get('741881105313169448')
        const ticketnumber = args[0]
        const member = message.guild.members.cache.get(db.fetch(`Ticket${ticketnumber}`))
        if(db.fetch(`STATUSTicket${ticketnumber}`) == 'CLOSED') return message.channel.send('This ticket is already closed, what are you doing??')
        const whichward = db.fetch(`WardTicket${ticketnumber}`)
        if(whichward == 'COVID-19 Consultation') {
          member.roles.remove(covid19consultation)
          db.set(`STATUSTicket${ticketnumber}`, 'CLOSED')
          message.channel.send('✅ Ticket closed successfully.')
        }
        if(whichward == 'COVID-19 Ward') {
          member.roles.remove(covid19role)
          db.set(`STATUSTicket${ticketnumber}`, 'CLOSED')
          message.channel.send('✅ Ticket closed successfully.')
        }
        if(whichward == 'General Operation') {
          member.roles.remove(generaloperation)
          db.set(`STATUSTicket${ticketnumber}`, 'CLOSED')
          message.channel.send('✅ Ticket closed successfully.')
        }
        if(whichward == 'COVID-19 Quarantine') {
          member.roles.remove(isolationrole)
          db.set(`STATUSTicket${ticketnumber}`, 'CLOSED')
          message.channel.send('✅ Ticket closed successfully.')
        }
        if(whichward == 'Radiology') {
          member.roles.remove(radiology)
          db.set(`STATUSTicket${ticketnumber}`, 'CLOSED')
          message.channel.send('✅ Ticket closed successfully.')
        }
        if(whichward == 'Biopsy') {
          member.roles.remove(biopsy)
          db.set(`STATUSTicket${ticketnumber}`, 'CLOSED')
          message.channel.send('✅ Ticket closed successfully.')
        }
        if(whichward == 'Electrical Diagnosis') {
          member.roles.remove(electricaldiagnosis)
          db.set(`STATUSTicket${ticketnumber}`, 'CLOSED')
          message.channel.send('✅ Ticket closed successfully.')
        }
        if(whichward == 'Psychology') {
          member.roles.remove(psychology)
          db.set(`STATUSTicket${ticketnumber}`, 'CLOSED')
          message.channel.send('✅ Ticket closed successfully.')
        }
        if(whichward == 'Consultation') {
          member.roles.remove(outpatient)
          db.set(`STATUSTicket${ticketnumber}`, 'CLOSED')
          message.channel.send('✅ Ticket closed successfully.')
        }
        if(whichward == 'Ward 1') {
          member.roles.remove(ward1)
          db.set(`STATUSTicket${ticketnumber}`, 'CLOSED')
          message.channel.send('✅ Ticket closed successfully.')
        }
        if(whichward == 'Ward 2') {
          member.roles.remove(ward2)
          db.set(`STATUSTicket${ticketnumber}`, 'CLOSED')
          message.channel.send('✅ Ticket closed successfully.')
        }
        if(whichward == 'Ward 3') {
          member.roles.remove(ward3)
          db.set(`STATUSTicket${ticketnumber}`, 'CLOSED')
          message.channel.send('✅ Ticket closed successfully.')
        }
        if(whichward == 'Ward 4') {
          member.roles.remove(ward4)
          db.set(`STATUSTicket${ticketnumber}`, 'CLOSED')
          message.channel.send('✅ Ticket closed successfully.')
        }
        if(whichward == 'ICU') {
          member.roles.remove(icu)
          db.set(`STATUSTicket${ticketnumber}`, 'CLOSED')
          message.channel.send('✅ Ticket closed successfully.')
        }
        if(whichward == 'Blood Test') {
          member.roles.remove(bloodtest)
          db.set(`STATUSTicket${ticketnumber}`, 'CLOSED')
          message.channel.send('✅ Ticket closed successfully.')
        }
      }
}