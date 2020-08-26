module.exports = {
    name: 'admittoward',
    aliases: ['admit'],
    description: 'Admits patient to ward.',
    usage: '*admittoward [ward]',
    cooldown: 0,
    mod:true,
      execute: async (message, args, client) => {
        const Discord = require('discord.js');
        const db = require('quick.db');
        if(message.guild.id !== '741839101598367856') return message.channel.send('You need to be in the **fishy hospital** Discord server to run this command.')
        if(!args[0]) return message.channel.send('Which patient?')
        if(!args[1]) return message.channel.send('Which dept do I admit this patient to?')
        if(args[1] == 'COVID-19-Ward') {
          const covid19role = message.guild.roles.cache.get('741852381926522902')
          const member = message.mentions.members.first()
          db.add(`NumberOfTicketsPatients`, 1)
          const ticketnumber = db.fetch(`NumberOfTicketsPatients`)
          db.set(`Ticket${ticketnumber}`, member.id)
          db.set(`STATUSTicket${ticketnumber}`, 'OPEN')
          db.set(`WardTicket${ticketnumber}`, 'COVID-19 Ward')
          db.set(`CreatedByTicket${ticketnumber}`, message.author.id)
          message.channel.send('What are the symptoms?')
          const awaitsymptoms = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
            if(!awaitsymptoms) return message.channel.send('You didn\'t answer in time, what the heck?')
            db.set(`SYMPTOMSTicket${ticketnumber}`, collected.first().content)
              message.channel.send('Any notes? If none type `-`')
              const awaitnotes = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
                if(!awaitnotes) return message.channel.send('You didn\'t answer in time, what the heck?')
                db.set(`NOTESTicket${ticketnumber}`, collected.first().content)
                member.roles.add(covid19role)
                message.channel.send(`✅ Admitted <@${message.mentions.members.first().id}> to the COVID-19 ward. Ticket number: ${ticketnumber}`)
              })
          })
        }
        if(args[1] == 'COVID-19-Quarantine') {
          const covid19isolationrole = message.guild.roles.cache.get('741853295647391774')
          const member = message.mentions.members.first()
          db.add(`NumberOfTicketsPatients`, 1)
          const ticketnumber = db.fetch(`NumberOfTicketsPatients`)
          db.set(`Ticket${ticketnumber}`, member.id)
          db.set(`STATUSTicket${ticketnumber}`, 'OPEN')
          db.set(`WardTicket${ticketnumber}`, 'COVID-19 Quarantine')
          db.set(`CreatedByTicket${ticketnumber}`, message.author.id)
          message.channel.send('What are the symptoms?')
          const awaitsymptomsquarantine = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
            if(!awaitsymptomsquarantine) return message.channel.send('You didn\'t answer in time, what the heck?')
            db.set(`SYMPTOMSTicket${ticketnumber}`, collected.first().content)
              message.channel.send('Any notes? If none type `-`')
              const awaitnotes = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
                if(!awaitnotes) return message.channel.send('You didn\'t answer in time, what the heck?')
                db.set(`NOTESTicket${ticketnumber}`, collected.first().content)
                member.roles.add(covid19isolationrole)
                message.channel.send(`✅ Admitted <@${message.mentions.members.first().id}> to the COVID-19 Quarantine room. Ticket number: ${ticketnumber}`)
              })
            })
        }
        if(args[1] == 'COVID-19-Consultation') {
          const covid19consultationrole = message.guild.roles.cache.get('741861823766200361')
          const member = message.mentions.members.first()
          db.add(`NumberOfTicketsPatients`, 1)
          const ticketnumber = db.fetch(`NumberOfTicketsPatients`)
          db.set(`STATUSTicket${ticketnumber}`, 'OPEN')
          db.set(`WardTicket${ticketnumber}`, 'COVID-19 Consultation')
          db.set(`CreatedByTicket${ticketnumber}`, message.author.id)
          db.set(`Ticket${ticketnumber}`, member.id)
          message.channel.send('What are the symptoms?')
          const awaitsymptoms = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
            if(!awaitsymptoms) return message.channel.send('You didn\'t answer in time, what the heck?')
            db.set(`SYMPTOMSTicket${ticketnumber}`, collected.first().content)
              message.channel.send('Any notes? If none type `-`')
              const awaitnotes = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
                if(!awaitnotes) return message.channel.send('You didn\'t answer in time, what the heck?')
                db.set(`NOTESTicket${ticketnumber}`, collected.first().content)
                member.roles.add(covid19consultationrole)
                message.channel.send(`✅ Admitted <@${message.mentions.members.first().id}> to the COVID-19 Consultation room. Ticket number: ${ticketnumber}`)
              })
          })
        }
        if(args[1] == 'Radiology') {
          const radiologyrole = message.guild.roles.cache.get('741852383109316679')
          const member = message.mentions.members.first()
          db.add(`NumberOfTicketsPatients`, 1)
          const ticketnumber = db.fetch(`NumberOfTicketsPatients`)
          db.set(`STATUSTicket${ticketnumber}`, 'OPEN')
          db.set(`WardTicket${ticketnumber}`, 'Radiology')
          db.set(`CreatedByTicket${ticketnumber}`, message.author.id)
          db.set(`Ticket${ticketnumber}`, member.id)
          message.channel.send('What are the symptoms?')
          const awaitsymptoms = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
            if(!awaitsymptoms) return message.channel.send('You didn\'t answer in time, what the heck?')
            db.set(`SYMPTOMSTicket${ticketnumber}`, collected.first().content)
              message.channel.send('Any notes? If none type `-`')
              const awaitnotes = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
                if(!awaitnotes) return message.channel.send('You didn\'t answer in time, what the heck?')
                db.set(`NOTESTicket${ticketnumber}`, collected.first().content)
                member.roles.add(radiologyrole)
                message.channel.send(`✅ Admitted <@${message.mentions.members.first().id}> to the Radiology theatre. Ticket number: ${ticketnumber}`)
              })
          })
        }
        if(args[1] == 'Biopsy') {
          const biopsyrole = message.guild.roles.cache.get('741852938858791005')
          const member = message.mentions.members.first()
          db.add(`NumberOfTicketsPatients`, 1)
          const ticketnumber = db.fetch(`NumberOfTicketsPatients`)
          db.set(`STATUSTicket${ticketnumber}`, 'OPEN')
          db.set(`WardTicket${ticketnumber}`, 'Biopsy')
          db.set(`CreatedByTicket${ticketnumber}`, message.author.id)
          db.set(`Ticket${ticketnumber}`, member.id)
          message.channel.send('What are the symptoms?')
          const awaitsymptoms = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
            if(!awaitsymptoms) return message.channel.send('You didn\'t answer in time, what the heck?')
            db.set(`SYMPTOMSTicket${ticketnumber}`, collected.first().content)
              message.channel.send('Any notes? If none type `-`')
              const awaitnotes = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
                if(!awaitnotes) return message.channel.send('You didn\'t answer in time, what the heck?')
                db.set(`NOTESTicket${ticketnumber}`, collected.first().content)
                member.roles.add(biopsyrole)
                message.channel.send(`✅ Admitted <@${message.mentions.members.first().id}> to the Biopsy room. Ticket number: ${ticketnumber}`)
              })
          })
        }
        if(args[1] == 'Electrical-Diagnosis') {
          const electricaldiagnosisrole = message.guild.roles.cache.get('741853169482727466')
          const member = message.mentions.members.first()
          db.add(`NumberOfTicketsPatients`, 1)
          const ticketnumber = db.fetch(`NumberOfTicketsPatients`)
          db.set(`STATUSTicket${ticketnumber}`, 'OPEN')
          db.set(`WardTicket${ticketnumber}`, 'Electrical Diagnosis')
          db.set(`CreatedByTicket${ticketnumber}`, message.author.id)
          db.set(`Ticket${ticketnumber}`, member.id)
          message.channel.send('What are the symptoms?')
          const awaitsymptoms = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
            if(!awaitsymptoms) return message.channel.send('You didn\'t answer in time, what the heck?')
            db.set(`SYMPTOMSTicket${ticketnumber}`, collected.first().content)
              message.channel.send('Any notes? If none type `-`')
              const awaitnotes = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
                if(!awaitnotes) return message.channel.send('You didn\'t answer in time, what the heck?')
                db.set(`NOTESTicket${ticketnumber}`, collected.first().content)
                member.roles.add(electricaldiagnosisrole)
                message.channel.send(`✅ Admitted <@${message.mentions.members.first().id}> to the Electrical Diagnosis room. Ticket number: ${ticketnumber}`)
              })
          })
        }
        if(args[1] == 'Psychology' || args[1] == 'IMH') {
          const psychologyrole = message.guild.roles.cache.get('741877879863902279')
          const member = message.mentions.members.first()
          db.add(`NumberOfTicketsPatients`, 1)
          const ticketnumber = db.fetch(`NumberOfTicketsPatients`)
          db.set(`STATUSTicket${ticketnumber}`, 'OPEN')
          db.set(`WardTicket${ticketnumber}`, 'Psychology')
          db.set(`CreatedByTicket${ticketnumber}`, message.author.id)
          db.set(`Ticket${ticketnumber}`, member.id)
          message.channel.send('What are the symptoms?')
          const awaitsymptoms = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
            if(!awaitsymptoms) return message.channel.send('You didn\'t answer in time, what the heck?')
            db.set(`SYMPTOMSTicket${ticketnumber}`, collected.first().content)
              message.channel.send('Any notes? If none type `-`')
              const awaitnotes = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
                if(!awaitnotes) return message.channel.send('You didn\'t answer in time, what the heck?')
                db.set(`NOTESTicket${ticketnumber}`, collected.first().content)
                member.roles.add(psychologyrole)
                message.channel.send(`✅ Admitted <@${message.mentions.members.first().id}> to the Psychology ward. Ticket number: ${ticketnumber}`)
              })
          })
        }
        if(args[1] == 'Consultation' || args[1] == 'Outpatient') {
          const consultationrole = message.guild.roles.cache.get('741855100573843558')
          const member = message.mentions.members.first()
          db.add(`NumberOfTicketsPatients`, 1)
          const ticketnumber = db.fetch(`NumberOfTicketsPatients`)
          db.set(`STATUSTicket${ticketnumber}`, 'OPEN')
          db.set(`WardTicket${ticketnumber}`, 'Consultation')
          db.set(`CreatedByTicket${ticketnumber}`, message.author.id)
          db.set(`Ticket${ticketnumber}`, member.id)
          message.channel.send('What are the symptoms?')
          const awaitsymptoms = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
            if(!awaitsymptoms) return message.channel.send('You didn\'t answer in time, what the heck?')
            db.set(`SYMPTOMSTicket${ticketnumber}`, collected.first().content)
              message.channel.send('Any notes? If none type `-`')
              const awaitnotes = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
                if(!awaitnotes) return message.channel.send('You didn\'t answer in time, what the heck?')
                db.set(`NOTESTicket${ticketnumber}`, collected.first().content)
                member.roles.add(consultationrole)
                message.channel.send(`✅ Admitted <@${message.mentions.members.first().id}> to the Consultation room. Ticket number: ${ticketnumber}`)
              })
          })
        }
        if(args[1] == 'ICU') {
          const icurole = message.guild.roles.cache.get('741881105313169448')
          const member = message.mentions.members.first()
          db.add(`NumberOfTicketsPatients`, 1)
          const ticketnumber = db.fetch(`NumberOfTicketsPatients`)
          db.set(`STATUSTicket${ticketnumber}`, 'OPEN')
          db.set(`WardTicket${ticketnumber}`, 'ICU')
          db.set(`CreatedByTicket${ticketnumber}`, message.author.id)
          db.set(`Ticket${ticketnumber}`, member.id)
          message.channel.send('What are the symptoms?')
          const awaitsymptoms = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
            if(!awaitsymptoms) return message.channel.send('You didn\'t answer in time, what the heck?')
            db.set(`SYMPTOMSTicket${ticketnumber}`, collected.first().content)
              message.channel.send('Any notes? If none type `-`')
              const awaitnotes = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
                if(!awaitnotes) return message.channel.send('You didn\'t answer in time, what the heck?')
                db.set(`NOTESTicket${ticketnumber}`, collected.first().content)
                member.roles.add(icurole)
                message.channel.send(`✅ Admitted <@${message.mentions.members.first().id}> to the ICU ward. Ticket number: ${ticketnumber}`)
              })
          })
        }
        if(args[1] == 'Blood-Test') {
          const bloodtestrole = message.guild.roles.cache.get('741885445297930300')
          const member = message.mentions.members.first()
          db.add(`NumberOfTicketsPatients`, 1)
          const ticketnumber = db.fetch(`NumberOfTicketsPatients`)
          db.set(`STATUSTicket${ticketnumber}`, 'OPEN')
          db.set(`WardTicket${ticketnumber}`, 'Blood Test')
          db.set(`CreatedByTicket${ticketnumber}`, message.author.id)
          db.set(`Ticket${ticketnumber}`, member.id)
          message.channel.send('What are the symptoms?')
          const awaitsymptoms = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
            if(!awaitsymptoms) return message.channel.send('You didn\'t answer in time, what the heck?')
            db.set(`SYMPTOMSTicket${ticketnumber}`, collected.first().content)
              message.channel.send('Any notes? If none type `-`')
              const awaitnotes = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
                if(!awaitnotes) return message.channel.send('You didn\'t answer in time, what the heck?')
                db.set(`NOTESTicket${ticketnumber}`, collected.first().content)
                member.roles.add(bloodtestrole)
                message.channel.send(`✅ Admitted <@${message.mentions.members.first().id}> to the Blood Test room. Ticket number: ${ticketnumber}`)
              })
          })
        }
        if(args[1] == 'General-Operation') {
          const operationrole = message.guild.roles.cache.get('741968455015596052')
          const member = message.mentions.members.first()
          db.add(`NumberOfTicketsPatients`, 1)
          const ticketnumber = db.fetch(`NumberOfTicketsPatients`)
          db.set(`STATUSTicket${ticketnumber}`, 'OPEN')
          db.set(`WardTicket${ticketnumber}`, 'General Operation')
          db.set(`CreatedByTicket${ticketnumber}`, message.author.id)
          db.set(`Ticket${ticketnumber}`, member.id)
          message.channel.send('What are the symptoms?')
          const awaitsymptoms = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
            if(!awaitsymptoms) return message.channel.send('You didn\'t answer in time, what the heck?')
            db.set(`SYMPTOMSTicket${ticketnumber}`, collected.first().content)
              message.channel.send('Any notes? If none type `-`')
              const awaitnotes = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
                if(!awaitnotes) return message.channel.send('You didn\'t answer in time, what the heck?')
                db.set(`NOTESTicket${ticketnumber}`, collected.first().content)
                member.roles.add(operationrole)
                message.channel.send(`�✅ Admitted <@${message.mentions.members.first().id}> to the General Operating Theatre. Ticket number: ${ticketnumber}`)
              })
          })
        }
	if(args[1] == 'Therapy') {
          const radiologyrole = message.guild.roles.cache.get('742697672867315712')
          const member = message.mentions.members.first()
          db.add(`NumberOfTicketsPatients`, 1)
          const ticketnumber = db.fetch(`NumberOfTicketsPatients`)
          db.set(`STATUSTicket${ticketnumber}`, 'OPEN')
          db.set(`WardTicket${ticketnumber}`, 'Therapy')
          db.set(`CreatedByTicket${ticketnumber}`, message.author.id)
          db.set(`Ticket${ticketnumber}`, member.id)
          message.channel.send('What are the symptoms?')
          const awaitsymptoms = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
            if(!awaitsymptoms) return message.channel.send('You didn\'t answer in time, what the heck?')
            db.set(`SYMPTOMSTicket${ticketnumber}`, collected.first().content)
              message.channel.send('Any notes? If none type `-`')
              const awaitnotes = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
                if(!awaitnotes) return message.channel.send('You didn\'t answer in time, what the heck?')
                db.set(`NOTESTicket${ticketnumber}`, collected.first().content)
                member.roles.add(radiologyrole)
                message.channel.send(` ✅ Admitted <@${message.mentions.members.first().id}> to the Therapist's office. Ticket number: ${ticketnumber}`)
              })
          })
        }
        if(args[1] == 'Ward' || args[1] == 'Inpatient') {
          if(!args[2]) return message.channel.send('Which ward? (1-5)')


          if(args[2] == '1') {
            const ward1role = message.guild.roles.cache.get('741881020818915448')
            const member = message.mentions.members.first()
            db.add(`NumberOfTicketsPatients`, 1)
            const ticketnumber = db.fetch(`NumberOfTicketsPatients`)
            db.set(`STATUSTicket${ticketnumber}`, 'OPEN')
            db.set(`WardTicket${ticketnumber}`, 'Ward 1')
          db.set(`CreatedByTicket${ticketnumber}`, message.author.id)
          db.set(`Ticket${ticketnumber}`, member.id)
           message.channel.send('What are the symptoms?')
          const awaitsymptoms = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
            if(!awaitsymptoms) return message.channel.send('You didn\'t answer in time, what the heck?')
            db.set(`SYMPTOMSTicket${ticketnumber}`, collected.first().content)
              message.channel.send('Any notes? If none type `-`')
              const awaitnotes = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
                if(!awaitnotes) return message.channel.send('You didn\'t answer in time, what the heck?')
                db.set(`NOTESTicket${ticketnumber}`, collected.first().content)
                member.roles.add(ward1role)
                message.channel.send(`✅ Admitted <@${message.mentions.members.first().id}> to Ward 1. Ticket number: ${ticketnumber}`)
              })
          })
          }
          if(args[2] == '2') {
            const ward2role = message.guild.roles.cache.get('741881053039427714')
            const member = message.mentions.members.first()
            db.add(`NumberOfTicketsPatients`, 1)
            const ticketnumber = db.fetch(`NumberOfTicketsPatients`)
            db.set(`STATUSTicket${ticketnumber}`, 'OPEN')
            db.set(`WardTicket${ticketnumber}`, 'Ward 2')
          db.set(`CreatedByTicket${ticketnumber}`, message.author.id)
          db.set(`Ticket${ticketnumber}`, member.id)
            message.channel.send('What are the symptoms?')
          const awaitsymptoms = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
            if(!awaitsymptoms) return message.channel.send('You didn\'t answer in time, what the heck?')
            db.set(`SYMPTOMSTicket${ticketnumber}`, collected.first().content)
              message.channel.send('Any notes? If none type `-`')
              const awaitnotes = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
                if(!awaitnotes) return message.channel.send('You didn\'t answer in time, what the heck?')
                db.set(`NOTESTicket${ticketnumber}`, collected.first().content)
                member.roles.add(ward2role)
                message.channel.send(`✅ Admitted <@${message.mentions.members.first().id}> to Ward 2. Ticket number: ${ticketnumber}`)
              })
          })
          }
          if(args[2] == '3') {
            const ward3role = message.guild.roles.cache.get('741881066066935911')
            const member = message.mentions.members.first()
            db.add(`NumberOfTicketsPatients`, 1)
            const ticketnumber = db.fetch(`NumberOfTicketsPatients`)
            db.set(`STATUSTicket${ticketnumber}`, 'OPEN')
            db.set(`WardTicket${ticketnumber}`, 'Ward 3')
          db.set(`CreatedByTicket${ticketnumber}`, message.author.id)
          db.set(`Ticket${ticketnumber}`, member.id)
            message.channel.send('What are the symptoms?')
          const awaitsymptoms = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
            if(!awaitsymptoms) return message.channel.send('You didn\'t answer in time, what the heck?')
            db.set(`SYMPTOMSTicket${ticketnumber}`, collected.first().content)
              message.channel.send('Any notes? If none type `-`')
              const awaitnotes = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
                if(!awaitnotes) return message.channel.send('You didn\'t answer in time, what the heck?')
                db.set(`NOTESTicket${ticketnumber}`, collected.first().content)
                member.roles.add(ward3role)
                message.channel.send(`✅ Admitted <@${message.mentions.members.first().id}> to Ward 3. Ticket number: ${ticketnumber}`)
              })
          })
          }
          if(args[2] == '4') {
            const ward4role = message.guild.roles.cache.get('741881090733768705')
            const member = message.mentions.members.first()
            db.add(`NumberOfTicketsPatients`, 1)
            const ticketnumber = db.fetch(`NumberOfTicketsPatients`)
            db.set(`STATUSTicket${ticketnumber}`, 'OPEN')
            db.set(`WardTicket${ticketnumber}`, 'Ward 4')
          db.set(`CreatedByTicket${ticketnumber}`, message.author.id)
          db.set(`Ticket${ticketnumber}`, member.id)
            message.channel.send('What are the symptoms?')
          const awaitsymptoms = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
            if(!awaitsymptoms) return message.channel.send('You didn\'t answer in time, what the heck?')
            db.set(`SYMPTOMSTicket${ticketnumber}`, collected.first().content)
              message.channel.send('Any notes? If none type `-`')
              const awaitnotes = message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: '30000'}).then(collected => {
                if(!awaitnotes) return message.channel.send('You didn\'t answer in time, what the heck?')
                db.set(`NOTESTicket${ticketnumber}`, collected.first().content)
                member.roles.add(ward4role)
                message.channel.send(`✅ Admitted <@${message.mentions.members.first().id}> to Ward 4. Ticket number: ${ticketnumber}`)
              })
          })
          }
          if(!args[2] == '1' && !args[2] == '2' && !args[2] == '3' && !args[2] == '4') return message.channel.send('That\'s not a valid ward my friend')
        }
        if(args[1] !== 'COVID-19-Quarantine' && args[1] !== 'COVID-19-Ward' && args[1] !== 'COVID-19-Consultation' && args[1] !== 'Radiology' && args[1] !== 'Biopsy' && args[1] !== 'Electrical-Diagnosis' && args[1] !== 'Psychology' && args[1] !== 'Inpatient' && args[1] !== 'ICU' && args[1] !== 'Blood-Test' && !args[1].includes('Ward') && args[1] !== 'General-Operation' && args[1] !== 'Therapy') return message.channel.send('That\'s not a valid ward name my friend')
      }
}
