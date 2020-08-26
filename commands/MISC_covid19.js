module.exports = {
    name: 'covid19',
    aliases: ['covid'],
    description: 'Check the number of COVID-19 cases there are in a specific country.',
    usage: '*covid19 [country]',
    cooldown: 0,
    mod:false,
      execute: async (message, args, client) => {
        const fetch = require('node-fetch')
        const Discord = require('discord.js')
        let countries = args.join(' ')
        if (!args[0]) return message.channel.send('You gave no country for me to search for. Guess I\'ll let you stay here and cry. Note: If you wanted for me to display all countries\' data, use `*covid19 all`')
        if (args[0] === 'all'){
          fetch('https://covid19.mathdro.id/api')
          .then(response => response.json())
          .then(data => {
            let confirmed = data.confirmed.value.toLocaleString()
            let recovered = data.recovered.value.toLocaleString()
            let deaths = data.deaths.value.toLocaleString()
            const allembed = new Discord.MessageEmbed()
            .setTitle('COVID-19 Tracker')
            .setDescription('Tracking **all** countries:')
            .addField('Confirmed cases: ', confirmed)
            .addField('Recovered cases: ', recovered)
            .addField('Deaths: ', deaths)
            .setColor('RANDOM')
            .setFooter('Values shown may not be 100% accurate \n'+footertext)
            message.channel.send(allembed);
          })
        } else {
          var country = args.join(' ')
          if (args.join(' ') == 'United States') {
              console.log(args.join(' '))
              var country = 'US'
            } else if (args.join(' ') == 'united states') {
              console.log(args.join(' '))
              var country = 'US'
            } else if (args.join(' ') == 'Trindad and Tobago') {
              console.log(args.join(' '))
              var country = 'TT'
            } else if (args.join(' ') == 'trindad and tobago') {
              console.log(args.join(' '))
              var country = 'TT'
            } else if (args.join(' ') == 'United Kingdom') {
              console.log(args.join(' '))
              var country = 'United Kingdom'
            } else if (args.join(' ') == 'united kingdom') {
              console.log(args.join(' '))
              var country = 'United Kingdom'
            } else if (args.join(' ') == 'UK') {
              console.log(args.join(' '))
              var country = 'United Kingdom'
            } else if (args.join(' ') == 'uk') {
              console.log(args.join(' '))
              var country = 'United Kingdom'
            }
          fetch(`https://covid19.mathdro.id/api/countries/${country}`)
          .then(response => response.json())
          .then(data => {
            let confirmed = data.confirmed.value.toLocaleString()
            let recovered = data.recovered.value.toLocaleString()
            let deaths = data.deaths.value.toLocaleString()
            const countryembed = new Discord.MessageEmbed()
            .setTitle('COVID-19 Tracker')
            .setDescription(`Tracking **${countries}**`)
            .addField('Confirmed cases: ', confirmed)
            .addField('Recovered cases: ', recovered)
            .addField('Deaths: ', deaths)
            .setColor('RANDOM')
            .setFooter('Values shown may not be 100% accurate \n'+footertext)
            message.channel.send(countryembed);
          }).catch(e => {
            console.log(e)
            return message.channel.send('An error has occured or the stated country was not found.')
          })
          
        }
      }
}