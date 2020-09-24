//Start of keeping the bot connected on glitch/repl.it (Delete this code if you're not using glitch)
/*const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`https://OrangeEcho-Stable.orangegrouptech.repl.co`);

}, 280000);
*/
var http = require('http');

http.createServer(function (req, res) {
  res.write("Status: Online \nNothing to see here! \n403 Forbidden ;)");
  res.end();
}).listen(8080);

//End
const keep_alive = require('./keep_alive.js')
const token = 'N o  t o k e n  f o r  y o u'
console.log('The bot is currently booting up. Please wait a moment.')
fs = require('fs');
Discord = require('discord.js');
const eco = require("discord-economy");
const client = new Discord.Client();
const urban = require('relevant-urban');
const Sequelize = require('sequelize')
let userData = JSON.parse(fs.readFileSync('./userData.json', 'utf8'));
client.commands = new Discord.Collection();
client.modcommands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const db = require('quick.db');
const {
	PREFIX = '*',
	BotManagerRoleID,
	OwnerID,
	BotLog,
	ProcessEndOnError,
	AssignMemberRoleOnJoin,
	CrashNotify,
	DMCommand, 
	EnableIncomingMailCommand,
	DisableIncomingMailCommand,
	BlacklistCommand,
  highTrafficCommand,
	WhitelistCommand,
	RequirePermissons, 
	StaffRoleID,
	NoPermReply, 
	DMRespondMessage
} = require('./config.json');
const {
	MessageEmbed
} = require('discord.js')

version = '7.0.3'
codename = 'Stable'
errorcount = 0
var safemode = false

if (!fs.existsSync('./restrictions.json'))console.log('restrictions.json is missing.')

require('events').EventEmitter.defaultMaxListeners = 20;

//Safe mode (disabled)
/*if (fs.existsSync(`./errorcount.txt`)){
fs.readFile('./errorcount.txt', function(err, data){
	if (fs.existsSync(`./safe_mode.flag`)){
		console.log('WARNING: SAFE MODE ACTIVE')
	}
	console.log(err)
	console.log(data)
	console.log(Number(data.toString().replace('<', '').replace('>', '').replace('Buffer', '')))
	if(err){return}else{
		if(data)
		if(data > 3){
			var safemode = true
			fs.writeFileSync('./safe_mode.flag', (error) => {
				if(error)console.log(error)
			});
			console.log('WARNING: SAFE MODE ACTIVE')
		}
	}
})
}
*/
//Bot ready
client.once('ready', () => {
	client.user.setPresence({ activity: { name: `in `+client.guilds.cache.size+ ` servers` }, type: 'WATCHING', status: 'idle' })
	.catch(console.error);
	console.log('botOS '+version)
	console.log('Codename '+codename)
	console.log('The bot has booted up successfully.');
  function func(message) {
  const ModeratorRoleID = db.fetch(`ModeratorRoleID_${message.guild.id}`)
  const MemberRoleID = db.fetch(`MemberRoleID_${message.guild.id}`)
  const ModLog = db.fetch(`ModlogID_${message.guild.id}`)
  const MessageLog = db.fetch(`MessageLogID_${message.guild.id}`)
  const UserLog = db.fetch(`UserlogID_${message.guild.id}`)
  }
	/*if (fs.existsSync(`./errorcount.txt`)){
		fs.readFile('./errorcount.txt', function(err, data){
			if(err){return}else{
				if(data)
				if (fs.existsSync(`./safe_mode.flag`)){
					safemode = true
					console.log('Safe mode found')
			var titleofstartup = 'Bot Started - Safe Mode Activated'
			var descriptionofstartup = 'The bot was unable to start normally multiple times, so it entered safe mode. To deactivate safe mode, restart using the restart command, delete these files (`errorcount.txt`, `safe_mode.flag`, `runstate.txt`), or use the exitsafemode command.'
			const StartupEmbed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setTitle(titleofstartup)
			.setDescription(descriptionofstartup)
			.setTimestamp()
			.setFooter(footertext)
			modlog = client.channels.cache.get(`${BotLog}`);
			modlog.send(StartupEmbed);
			return;
				}
			}
		})
		}*/
		const path = './runstate.txt'
    client.emit("StartupPassed")
})
//Checks for shutdown flag
if (fs.existsSync(`./shutdown.flag`)){
	console.log('`shutdown.flag` found. Shutting down.')
	process.exit()
}else{}

//Checks for old configs and informs that it needs to be changed
if (fs.existsSync(`./info.json`)){
	console.log('WARNING: `info.json` found. Please move entries to `config.json`. Exiting.')
	process.exit()
}else{}
if (fs.existsSync(`./strings.json`)){
	console.log('NOTICE: `strings.json` found. This file is no longer used and may be deleted.')
}else{}

 respond = function (title, content, sendto, color, footer, imageurl){
	 //Title, Content, Where to send, Embed color, Footer, Image URL
	var RespondEmbed = new Discord.MessageEmbed()
		RespondEmbed.setTitle(title)
		RespondEmbed.setDescription(content)
		if(!sendto || sendto == ''){
			throw 'Missing Arguments.'
		}else{
			if(color && !color == ''){
			RespondEmbed.setColor(color)
		}
		if(footer && !footer == ''){
			RespondEmbed.setFooter(footer)
		}
		if(imageurl && !imageurl == ''){
			RespondEmbed.setImage(imageurl)
		}
		sendto.send(RespondEmbed)
		}

}
//Check for updates
client.once('ready', () => {
	const https = require('https');
	const fetch = require('node-fetch')
	fetch('https://api.github.com/repos/OrangeEcho-Devs/OrangeEchoStable/releases/latest').then(response => response.json()).then(data => {
		const latestversion = data.tag_name.toLocaleString()
		const body = data.body.toLocaleString()
		const changelog = body.replace('✔️ Signed', '') || body.replace('❌ Unsigned', '')
		if(body.includes('✔️ Signed') || body.includes('✅ Signed')) signedstatus = '✅ Signed'
		if(body.includes('❌ Unsigned')) signedstatus = '❌ Unsigned'
						 if(version != latestversion){
						const UpdateAvailableEmbed = new Discord.MessageEmbed()
						.setTitle('Update Available')
						.setColor('ffa500')
						.setDescription(`An update is available.\nYour version: ${version}\nLatest version: ${latestversion}`)
						.addField('Signed Status', signedstatus, false)
						.addField('Changelog',changelog,false)
						.setFooter('An update is available \nbotOS '+version+' -> botOS '+latestversion)
						const {BotLog} = require('./config.json')
						client.channels.cache.get(BotLog).send(UpdateAvailableEmbed);
						}
					})
				})
//Modmail start
//Makes required files if not found
client.on('ready', () => {
	if (!fs.existsSync('./blacklist.txt')) {
		fs.writeFileSync('./blacklist.txt', 'dummy\n')
}
if (!fs.existsSync('./allow-incoming.config')) {
			fs.writeFileSync('./allow-incoming.config', 'allow')
	}
})
//Error
client.on('error', error => {
	console.error('an error has occured', error);
});

//Check for direct messages
client.on('message', message => {
	try{
	if (message.author.bot) return;
	if (message.channel.type == "dm") {
    return;
		if (message.content.startsWith(DMCommand)) return;
		const messagecontent = message.content;
    //const MessageLog = db.fetch(`Messagelog_${message.guild.id}`)
		const channel = client.channels.cache.get(MessageLog);
		if (message.content == ''){
			message.channel.send('Do you expect me to send an empty message to the mods???');
			return
	}
	
	//Checks if on blacklist
	fs.readFile('./blacklist.txt', function(err, data){
		const blacklistdata = data
		if(data && data.toString().includes(message.author.id)){
			const MessageIncomingRejectedBlacklisted = new Discord.MessageEmbed()
				.setColor('ff0000')
				.setTitle('Message Rejected')
				.setDescription(`Heck, you seem to be blacklisted. Try again later or contact mods`)
				.addFields(
					{ name: 'Message ',
					value: message.content,
					inline: false },
					)
				.setTimestamp()
				.setFooter('Mod Mail | Version '+version)
			message.channel.send(MessageIncomingRejectedBlacklisted);
			return;
		}
	//Checks if Mod Mail is enabled.
	fs.readFile('./allow-incoming.config', function(err, data){
		if(err)console.log(err)
	
		if (data == 'reject'){
		const MessageIncomingRejected = new Discord.MessageEmbed()
			.setColor('ff0000')
			.setTitle('Message Rejected')
			.setDescription('Sorry, "'+ channel.guild.name+ '" is currently not accepting Mod Mail at the moment. Please try again later.')
			.addFields(
				{ name: 'Message ',
				value: message.content,
				inline: false },
				)
				.setTimestamp()
				.setFooter('Mod Mail | Version '+version)
		message.channel.send(MessageIncomingRejected);return;}
		//Manages requirements
		var today = new Date();
		var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		global.dateTime = date+' '+time;
		if (message.content == ''){
				message.channel.send('Do you expect me to send an empty message to the mods???');
				return
			}
		if(message.content.length > '1024'){
				message.channel.send('Woah there, too spicy, please make sure your message is less than 1025 characters');
				setTimeout (function(){
				message.channel.send('I have poor memory, please don\'t stress me out by sending so many messages');
				}, 2000)
				return
			}
			//Checks before sending
			message.channel.send('Are you sure you want to send your message? If you\'re gonna spam the mods forget it');
			setTimeout (function(){
			message.react('✅').then(() => message.react('❌'));
			}, 500)

	const filter = (reaction, user) => {
	return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
	};

	message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '✅') {
			const MessageSentEmbed = new Discord.MessageEmbed()
			.setColor('008000')
			.setTitle('Message Sent')
			.setDescription('Your message was sent to the "'+ channel.guild.name+ '" server. '+DMRespondMessage)
			.addFields(
				
				{ name: 'Message ',
				value: messagecontent,inline: false },
				)
				.setTimestamp()
				.setFooter('Mod Mail | Version '+version)
			message.channel.send(MessageSentEmbed);
		//Checks if mods are busy
		fs.readFile('./busy.txt', function(err, data){
				setTimeout(function(){
					if(data && data.toString().includes('true')){
					const DelayEmbed = new Discord.MessageEmbed()
					DelayEmbed.setTitle('Notice from server')
					DelayEmbed.setColor('ffff00')
					DelayEmbed.setDescription(`Hello <@${message.author.id}>, this is an automated message to say that you might have a delay in response as the mods _might_ be busy (or are simply slacking). Sorry for the inconvenience.`)
					DelayEmbed.setTimestamp()
					DelayEmbed.setFooter('Mod Mail | Version '+version)
				message.channel.send(DelayEmbed);
				}
			}, 2000)	
		})

				 
			const MessageReceivedEmbed = new Discord.MessageEmbed()
				.setTitle('Message Received')
				.setDescription(`A message was received.`)
				.addFields(
					
					{ name: 'Sender', value: `<@${message.author.id}>`, inline: false },
					{ name: 'Sender Tag', value: message.author.tag, inline: false },
					{ name: 'Sender ID', value: message.author.id, inline: false },
					{ name: 'Message ', value: messagecontent, inline: false },
				)
				.setTimestamp()
				.setFooter('Mod Mail | Version '+version)
				channel.send(MessageReceivedEmbed);

			if (message.attachments.size != '0'){
				channel.send("Attachment was found. ", { files: [`${message.attachments.first().url}`] });
			}
			return;
		} else {
			message.reply('Message was cancelled. Sad.');
			return;
		}
		}).catch(collected => {
			message.reply('You didn\'t respond in time...??');
			return;
		});
		})})
	}
	}catch(err){console.log(err);return}
})
//Reply
client.on('message', message => {
	if (message.content.startsWith(`${PREFIX}${DMCommand}`)){
	if (message.author.bot)return;
	if (message.channel.type == 'dm')return;
	if(RequirePermissons == true){
		if (message.member.roles.cache.some(role => role.id === `${StaffRoleID}`)){
		}else{message.reply(NoPermReply);return;}
	}
	console.log('Not DMs')
		
	console.log('Command detected')
	const args = message.content.slice((PREFIX+DMCommand).length).split(/ +/);
	console.log(args)
	args.join(' ')
	const mentionedmemnber = message.mentions.members.first()
		const newargs = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
		const reply = newargs.join (' ')
		if(reply.length > '1024'){
			message.channel.send('Woah there, too spicy, please make sure your message is less than 1025 characters');
			setTimeout (function(){
			message.channel.send('I have poor memory, please don\'t stress me out by sending so many messages');
			}, 2000)
			return
		}else{
			
		}
		const ReplyReceived = new Discord.MessageEmbed()
			.setTitle('Reply Received')
			.setDescription(`You have received a reply.`)
			.addFields(
				{ name: 'Message ', 
					value: reply, 
					inline: false },
				)
				.setTimestamp()
				.setFooter('Mod Mail | Version '+version)
				try{
					mentionedmemnber.send(ReplyReceived).catch(err => {message.channel.send('Something went wrong and I was unable to DM `'+mentionedmemnber.user.tag+'`. Please try again. If it fails again that guy was probably stupid to close his DMs to me');return})
					message.channel.send('Direct message was sent to `'+mentionedmemnber.user.tag+'`.\nMessage: '+reply)
				}catch(err){
					message.channel.send('Something went wrong and I was unable to DM `'+mentionedmemnber.user.tag+'`. Please try again. If it fails again that guy was probably stupid to close his DMs to me');return;
			}
	}
})

//Disable Incoming
client.on('message', message => {
	if (message.content.startsWith(`${PREFIX}${DisableIncomingMailCommand}`)){
		if (message.author.bot)return;
		if (message.channel.type == 'dm')return;
		if(RequirePermissons == true){
		if (message.member.roles.cache.some(role => role.id === `${StaffRoleID}`)){

		}else{message.reply(NoPermReply);return;}
	}
		fs.writeFileSync('./allow-incoming.config', 'reject')
		message.channel.send('Mod Mail is now disabled.')
		
}})

//Allow Incoming
	client.on('message', message => {
	if (message.content.startsWith(`${PREFIX}${EnableIncomingMailCommand}`)){
		if (message.author.bot)return;
		if (message.channel.type == 'dm')return;
		if(RequirePermissons == true){
		if (message.member.roles.cache.some(role => role.id === `${StaffRoleID}`)){

		}else{message.reply(NoPermReply);return;}
	}
		fs.writeFileSync('./allow-incoming.config', 'allow')
		message.channel.send('Mod Mail is now enabled.')
		
}})

//Add to blacklist
client.on('message', message => {
	if (message.content.startsWith(`${PREFIX}${BlacklistCommand}`)){
		if (message.author.bot)return;
		if (message.channel.type == 'dm')return;
		if(RequirePermissons == true){
		if (message.member.roles.cache.some(role => role.id === `${StaffRoleID}`)){

		}else{message.reply(NoPermReply);return;}
	}
	fs.readFile('./blacklist.txt', function(err, data){
		if(data.includes (message.mentions.members.first().id)){message.channel.send(`This user is already on the blacklist. How do you expect me to blacklist someone who's already blacklisted?!`);return;}else{
		fs.appendFile('./blacklist.txt', `${message.mentions.members.first().id}\n`, function(err,){})
		message.channel.send(`<@${message.mentions.members.first().id}> (${message.mentions.members.first().id}) was blacklisted of using <@${client.user.id}>. Peace.`)
		}
	})
}})

//Remove from blacklist
client.on('message', message => {
	if (message.content.startsWith(`${PREFIX}${WhitelistCommand}`)){
		if (message.author.bot)return;
		if (message.channel.type == 'dm')return;
		if(RequirePermissons == true){
		if (message.member.roles.cache.some(role => role.id === `${StaffRoleID}`)){

		}else{message.reply(NoPermReply);return;}}
	fs.readFile('./blacklist.txt', function(err, data){
		var data = fs.readFileSync('./blacklist.txt', 'utf-8');
		if(!data.includes(message.mentions.members.first().id)){message.channel.send('User not found on the blacklist.');return}else{message.channel.send('User is now whitelisted.');}
		var valuetoremove = message.mentions.members.first().id;
		var newValue = data.replace((valuetoremove), '');
		fs.writeFileSync('./blacklist.txt', newValue, 'utf-8');
	})}
})
//Command: Reply that there might be a delay
client.on('message', message => {
	if (message.content.startsWith(`${PREFIX}${highTrafficCommand}`)){
const args = message.content.slice((PREFIX+highTrafficCommand).length).split(/ +/);
	console.log(args)
	args.join(' ')
	const mentionedmemnber = message.mentions.members.first()
		const newargs = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
		const reply = newargs.join (' ')
		const BusyMommentEmbed = new Discord.MessageEmbed()
			BusyMommentEmbed.setTitle('Notice from server')
			BusyMommentEmbed.setColor('ffff00')
			if(reply == ''){
				BusyMommentEmbed.setDescription(`Hello <@${mentionedmemnber.id}>, please be aware that you may have a delay in response.\n\nReason: No reason provided.`)
			}else{
				BusyMommentEmbed.setDescription(`Hello <@${mentionedmemnber.id}>, please be aware that you may have a delay in response.\n\nReason: ${reply}`)
			}
			BusyMommentEmbed.setTimestamp()
			BusyMommentEmbed.setFooter('Mod Mail | Version '+version)
				try{
					mentionedmemnber.send(BusyMommentEmbed);
					console.log('Attempted to send.')}catch(err){console.log(err);message.channel.send('Something went wrong.')}
					message.channel.send('Busy reply sent to `'+mentionedmemnber.user.tag+'`.')
		}
})
//Modmail end
//Footer text
client.on('message', message => {
	try {
	if(message.channel.type == 'dm') return;
	const mod = db.fetch(`ModeratorRoleID_${message.guild.id}`)
	if(mod == null) {
		footertext = 'OrangeEcho is not activated, run *setup to activate \nbotOS '+ version +'\nCodename: '+ codename +'\nRemember to wash your hands regularly! \nStay safe during the COVID-19 period!'
	} else {
		footertext = 'botOS '+ version +'\nCodename: '+ codename +'\nRemember to wash your hands regularly! \nStay safe during the COVID-19 period!'
	}
	}catch(error) {
		footertext = 'OrangeEcho is not activated, run *setup to activate \nbotOS '+ version +'\nCodename: '+ codename +'\nRemember to wash your hands regularly! \nStay safe during the COVID-19 period!'
		fs.appendFileSync('./logs/errors.log', error+'\n')
	}
})
//Unlock dev tools
client.on('message', message => {
  if(!message.content.startsWith(PREFIX) || message.author.bot) return;
  const args = message.content.slice('>'.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if(command === 'unlockdevtools') {
	message.channel.send('You bitch, this is production, are you sure?! If so please enter the dev password.');
    message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 30000}).then(collected => {
	if(collected.first().content.toLowerCase() == collected.first().content.toLowerCase()) {
      if(collected.first().content.toLowerCase() !== 'orangeechodevs-576') {
        message.channel.send('Wrong password, access is denied. Now get out before I contact the devs for trying to break into me')
      } else if(collected.first().content.toLowerCase() == 'orangeechodevs-576'){
		  var authorid = message.author.id
		message.channel.send('Waiting for approval.')
		db.set(`PSWDREQUEST`, message.channel.id)
		db.set(`PSWDREQUESTUSER`, message.author.id)
		const passwordrequestchannel = client.channels.cache.get('736815827160006776')
		const passwordrequest = new Discord.MessageEmbed()
			.setTitle('Password request')
			.setDescription(`A password request was made by <@${authorid}>. Do you want to approve this request?`)
			.setFooter(footertext)
		passwordrequestchannel.send(passwordrequest);
		passwordrequestchannel.awaitMessages(m => m.author.id == '475149822366580744', {max: 1, time: 30000}).then(collected => {
			if(collected.first().content.toLowerCase() == 'y') {
				const targetchannel = db.fetch(`PSWDREQUEST`)
				const targetchannelsend = client.channels.cache.get(targetchannel)
				if (message.author.id !== '475149822366580744') {
					passwordrequestchannel.send('❌Access is denied. User requesting is not a bot dev.')
					targetchannelsend.send('❌Your request was approved, but you aren\'t a bot dev, now get out before I contact the devs for trying to break into me')
				} else if (message.author.id == '475149822366580744') {
				passwordrequestchannel.send('✅Password request approved.')
				db.set(`DevToolsStatus_${message.author.id}`, 'true')
				targetchannelsend.send('✅Dev tools unlocked! Run *help and you\'d see the dev tools appear. This will last for 1 minute')
				setTimeout(function(){
					db.set(`DevToolsStatus_${message.author.id}`, 'false')
					db.set(`PSWDREQUEST`, '')
					db.set(`PSWDREQUESTUSER`, '')
				}, 60000)
				}
			} else {
				const targetchannel = db.fetch(`PSWDREQUEST`)
				const targetchannelsend = client.channels.cache.get(targetchannel)
				passwordrequestchannel.send('❌Password request denied.')
				targetchannelsend.send('❌Password request denied by bot devs.')
				
			}
		})
		
      }
	}
	})
  }
})
//Press f command
client.on("message", message => {
  if(message.channel.type == 'dm') return;
  if(!message.content.startsWith('') || message.author.bot) return;
  const args = message.content.slice(''.length).split(/ +/);
  const command = args.shift().toLowerCase();
  let member = message.guild.member(message.author);
  let nickname = member ? member.displayName : null;
  if (message.content == 'f' || message.content == 'F'){
  if(nickname == '@everyone') {
    message.channel.send('HAHA you can\'t trick me into pinging everyone lmaoo')
    return;
  }
  if(nickname == '@here') {
    message.channel.send('HAHA you can\'t trick me into pinging here lmaoo')
    return;
  }
    message.channel.send(`${nickname} has paid respect.`);
  }
})

//joined a server
client.on("guildCreate", guild => {
console.log(`Joined a new guild. Name: ${guild.name} \nID: ${guild.id}`)
let defaultChannel = "";
guild.channels.cache.forEach((channel) => {
  if(channel.type == "text" && defaultChannel == "") {
    if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
      defaultChannel = channel;
    }
  }
})
    const newserverembed = new Discord.MessageEmbed()
      .setDescription('Hello! Thanks for adding me to your server! My name is **OrangeEcho Stable** . \nStart by configuring me to better suit your server like telling me the modlog channels! To do that, run `*setup` . My prefix is `*` . \nCurrently the bot has only a few commands, but don\'t worry! There will soon be more. \nTo give suggestions for the bot, run `*suggestion [suggestion]` and the suggestion will be sent to the bot owners. \nCheck out our currency system too! It\'s currently simple, but don\'t worry! More will be added.')
      .addFields(
        { name: 'Links', value: 'Support Server: https://discord.gg/Mdyjzvf \nInvite: <https://discordapp.com/oauth2/authorize?client_id=714001186897788934&scope=bot&permissions=2146958847>'}
      )
	defaultChannel.send(newserverembed);
	client.user.setPresence({ activity: { name: `in `+client.guilds.cache.size+ ` servers` }, type: 'WATCHING', status: 'idle' })
})

//Default modaction 
modaction = function (RanCommand, RanBy, RanIn, FullCommand){
	const ModReportEmbed = new Discord.MessageEmbed()
		ModReportEmbed.setColor('#F3ECEC')
		ModReportEmbed.setTitle('Mod Action')
		ModReportEmbed.setDescription(`A moderation action has occurred.`)
		ModReportEmbed.addFields(
			{ name: 'Command', value: `${RanCommand}`, inline: false },
			{ name: 'Responsible Moderator', value: `${RanBy}`, inline: false },
			{ name: 'Channel', value: `${RanIn}`, inline: false }
		)
		ModReportEmbed.setTimestamp()
    try {
		const modlogchannel = client.channels.cache.get(`${ModLog}`);
		modlogchannel.send(ModReportEmbed)
    } catch(error) {
      message.channel.send('Oopsie doopsie, the bot ran into an error. \nError code: -2')
    }
}
 errorlog = function (error){
	errorcount = errorcount + 1
	const ErrorReportEmbed = new Discord.MessageEmbed()
		ErrorReportEmbed.setColor('#FF0000')
		ErrorReportEmbed.setTitle('Bot Error')
		ErrorReportEmbed.setDescription(`An error has occurred while the bot running.`)
		ErrorReportEmbed.addFields(
			{ name: 'Error information', value: `${error}`, inline: false },
		)
		ErrorReportEmbed.setTimestamp()
		const ErrorLog = client.channels.cache.get(`${BotLog}`);
		ErrorLog.send(ErrorReportEmbed)
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const allCommandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
		if(!command.mod && !safemode ==true){
			client.commands.set(command.name, command);
		}
}
for (const file of allCommandFiles) {
	const modcommand = require(`./commands/${file}`);
	if(safemode == true && modcommand.essential == true){
		client.modcommands.set(modcommand.name, modcommand);
	}else{
		if(!safemode == true){
			client.modcommands.set(modcommand.name, modcommand);
		}
	}

}

//Command list
getCommandList = function(modCheck, botManagerCheck, ecoCheck, memeyCheck, gamesCheck, miscCheck, funCheck, configCheck, botStuffCheck, musicCheck, userID, showMemberCommands){
	const findCommandListBotStuff = fs.readdirSync('./commands').filter(file => file.startsWith('BOTSTUFF_'));
	const findCommandListEco = fs.readdirSync('./commands').filter(file => file.startsWith('ECO_'));
	const findCommandListMemey = fs.readdirSync('./commands').filter(file => file.startsWith('MEME_'));
	const findCommandListGames = fs.readdirSync('./commands').filter(file => file.startsWith('GAME_'));
	const findCommandListMisc = fs.readdirSync('./commands').filter(file => file.startsWith('MISC_'));
	const findCommandListMusic = fs.readdirSync('./commands').filter(file => file.startsWith('MUSIC_'));
	const findCommandListFun = fs.readdirSync('./commands').filter(file => file.startsWith('FUN_'));
	const findCommandListConfig = fs.readdirSync('./commands').filter(file => file.startsWith('CONFIG_'))
	const findCommandListUser = fs.readdirSync('./commands').filter(file => file.startsWith('USER_'));
	const findCommandListMod = fs.readdirSync('./commands').filter(file => file.startsWith('MOD_'));
	const findCommandListBotManager = fs.readdirSync('./commands').filter(file => file.startsWith('BOTMANAGER_'));
	const commandListBotStuff = [];
	const commandListMusic = [];
	const commandListGames = [];
	const commandListMisc = [];
	const commandListFun = [];
	const commandListConfig = [];
	const commandListMemey = [];
	const commandListEco = [];
	const commandListUser = [];
	const commandListMod = [];
	const commandListBotManager = [];
	var commandList = []
	var restrictions = require('./restrictions.json')
	var commandEssential = restrictions[2];
	for (const file of findCommandListUser) {
		const command = require(`./commands/${file}`);
		commandListUser.join(' ')
		if(!command.hidden == true || safemode ==true){
			if(safemode == true && commandEssential && commandEssential[command.name] == true){
				commandListUser.push(command.name)
				console.log(command.name)
			}else{
				if(!safemode == true){
				commandListUser.push(command.name)
				console.log(command.name)
				}
			}
		}
	}
	if(botStuffCheck == true) {
		for(const file of findCommandListBotStuff) {
			const command = require(`./commands/${file}`);
			commandListBotStuff.join(' ')
			if(!command.hidden == true || safemode == true) {
				if(safemode == true && commandEssential && commandEssential[command.name] == true) {
					commandListBotStuff.push(command.name)
					console.log(command.name)
				} else {
					if(!safemode == true) {
						commandListBotStuff.push(command.name)
						console.log(command.name)
					}
				}
			}
		}
	}
	if(musicCheck == true) {
		for(const file of findCommandListMusic) {
			const command = require(`./commands/${file}`);
			commandListMusic.join(' ')
			if(!command.hidden == true || safemode == true) {
				if(safemode == true && commandEssential && commandEssential[command.name] == true) {
					commandListMusic.push(command.name)
					console.log(command.name)
				} else {
					if(!safemode == true) {
						commandListMusic.push(command.name)
						console.log(command.name)
					}
				}
			}
		}
	}
	if(configCheck == true) {
	for (const file of findCommandListConfig) {
		const command = require(`./commands/${file}`);
		commandListConfig.join(' ')
		if(!command.hidden == true || safemode == true) {
			if(safemode == true && commandEssential && commandEssential[command.name] == true) {
				commandListConfig.push(command.name)
				console.log(command.name)
			} else {
				if(!safemode == true) {
					commandListConfig.push(command.name)
					console.log(command.name)
				}
			}
		}
	}
}
	if(ecoCheck == true) {
	for (const file of findCommandListEco) {
		const command = require(`./commands/${file}`);
		commandListEco.join(' ')
		if(!command.hidden == true || safemode == true) {
			if(safemode == true && commandEssential && commandEssential[command.name] == true) {
				commandListEco.push(command.name)
				console.log(command.name)
			} else {
				if(!safemode == true) {
					commandListEco.push(command.name)
					console.log(command.name)
				}
			}
		}
	}
}
	if(funCheck == true) {
	for (const file of findCommandListFun) {
		const command = require(`./commands/${file}`);
		commandListFun.join(' ')
		if(!command.hidden == true || safemode == true) {
			if(safemode == true && commandEssential && commandEssential[command.name] == true) {
				commandListFun.push(command.name)
				console.log(command.name)
			} else { 
				if(!safemode == true) {
					commandListFun.push(command.name)
					console.log(command.name)
				}
			}
		}
	}
}
	if(gamesCheck == true) {
	for (const file of findCommandListGames) {
		const command = require(`./commands/${file}`);
		commandListGames.join(' ')
		if(!command.hidden == true || safemode == true) {
			if(safemode == true && commandEssential && commandEssential[command.name] == true) {
				commandListGames.push(command.name)
				console.log(command.name)
			} else {
				if(!safemode == true) {
					commandListGames.push(command.name)
					console.log(command.name)
				}
			}
		}
	}
}
	if(memeyCheck == true) {
	for (const file of findCommandListMemey) {
		const command = require(`./commands/${file}`);
		commandListMemey.join(' ')
		if(!command.hidden == true || safemode == true) {
			if(safemode == true && commandEssential && commandEssential[command.name] == true) {
				commandListMemey.push(command.name)
				console.log(command.name)
			} else {
				if(!safemode == true) {
					commandListMemey.push(command.name)
					console.log(command.name)
				}
			}
		}
	}
}
	if(miscCheck == true) {
	for (const file of findCommandListMisc) {
		const command = require(`./commands/${file}`);
		commandListMisc.join(' ')
		if(!command.hidden == true || safemode == true) {
			if(safemode == true && commandEssential && commandEssential[command.name] == true) {
				commandListMisc.push(command.name)
				console.log(command.name)
			} else {
				if(!safemode == true) {
					commandListMisc.push(command.name)
					console.log(command.name)
				}
			}
		}
	}
}
	if(modCheck == true){
		for (const file of findCommandListMod) {
		const command = require(`./commands/${file}`);
		if(!command.hidden == true || safemode ==true){
			if(safemode == true && commandEssential && commandEssential[command.name] == true){
				commandListMod.push(command.name)
				console.log(command.name)
			}else{
				if(!safemode == true){
				commandListMod.push(command.name)
				console.log(command.name)
				}
			}
		}
	}
}

	if(botManagerCheck == true){
	for (const file of findCommandListBotManager) {
		const command = require(`./commands/${file}`);
		commandListBotManager.join(' ')
		if(!command.hidden == true || safemode ==true){
			if(safemode == true && commandEssential && commandEssential[command.name] == true){
				commandListBotManager.push(command.name)
				console.log(command.name)
			}else{
				if(!safemode == true){
					commandListBotManager.push(command.name)
					console.log(command.name);
					
				}
			}
		}
	}
}

	//Not the best way, but will work on later
	usercommandstring = ['__**    User    **__']
	modcommandstring = ['__**    Mod    **__']
	botmanagercommandstring = ['__**    Bot Manager    **__']
	if(!showMemberCommands == false){
		commandList.push(usercommandstring)
		commandList.push(commandListUser)
	}
	if(botStuffCheck == true) {
		commandList.push(commandListBotStuff)
	}
	if(musicCheck == true) {
		commandList.push(commandListMusic)
	}
	if(ecoCheck == true) {
		commandList.push(commandListEco)
	}
	if(memeyCheck == true) {
		commandList.push(commandListMemey)
	}
	if(configCheck == true) {
		commandList.push(commandListConfig)
	}
	if(funCheck == true) {
		commandList.push(commandListFun)
	}
	if(gamesCheck == true) {
		commandList.push(commandListGames)
	}
	if(miscCheck == true) {
		commandList.push(commandListMisc)
	}
	if(modCheck == true){
		commandList.push(commandListMod)
	}
	if(botManagerCheck == true){
		commandList.push(commandListBotManager)
	}
	const newcommandlist = commandList.toString().replace(/,/g, ', ')
	return newcommandlist
}
//Suggestion reactions
client.on("message", message=>{
    if(message.channel.name === "685074431202164747"){
		message.react("👍");
		message.react("👎");
	}
})
//AI Modules
client.on('message', message => {
	if (fs.existsSync('./aiModule.js' && !fs.existsSync('./safe_mode.flag'))){
		const aiModule = require('./aiModule.js')
	}
	if(!safemode == true)
	if (fs.existsSync('./aiModule.js'))

	function returnFunction(result){
		message.channel.send(result)
	}

	function returnFunctionRandomizer(result){
		message.channel.send(result)
	}

	if(message.content.startsWith(`<@${client.user.id}>`) && !message.author.bot){
		const aiModule = require('./aiModule.js')
		const text = message.content.slice(`<@${client.user.id}>`.length+1).toLowerCase()
		aiModule.execute(text, message.author, returnFunction)
	}else if(message.content.startsWith(`<@!${client.user.id}>`) && !message.author.bot){
		const aiModule = require('./aiModule.js')
		const text = message.content.slice(`<@!${client.user.id}>`.length+1).toLowerCase()
		aiModule.execute(text, message.author, returnFunction)
	}
})

client.on('message', message => {
	if(safemode == true)return;
	if (message.content.includes(`<@!${client.user.id}>`) || (message.content.includes(`<@${client.user.id}>`)));{

	function informOfPrefix(){
		message.channel.send(`Hello <@${message.author.id}>, if you want to use my commands, \`${PREFIX}\` is my prefix.`)
	}
}})


//Commands
client.on('message', async message => {
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;
		const args = message.content.slice(PREFIX.length).split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command = client.modcommands.get(commandName)
			|| client.modcommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		var restrictions = require('./restrictions.json');
		var channelRestrictions = restrictions[0];
		var commandDisabled = restrictions[1];
		var commandEssential = restrictions[2];
	if(!command){
		return;
	}

	if(safemode == true && commandEssential && !commandEssential[command.name] == true){
		if(!command.name.includes('help')){
			return;
		}
	}
	//Command disabled
	if (commandDisabled[command.name] == true) {
		respond('🛑 Command disabled',`<@${message.author.id}>, the command you are trying to run is disabled at the moment. Please try again later.`, message.channel)
		return;
	}
	//Bot Manager (over mod)
	if(command.botmanager == true && !message.member.roles.cache.some(role => role.id == BotManagerRoleID)) {
		if(message.content.startsWith(PREFIX+'')) return;
		if(message.content.startsWith(PREFIX+' ')) return;
		respond('❌ Bot Manager Command Only', 'This command can only be ran by the dev team.', message.channel)
		return;
	}
	if(command.botmanager == true && message.member.roles.cache.some(role => role.id === `${BotManagerRoleID}`)){
		command.execute(message, args, client);
		return;
	}
  const ModeratorRoleID = db.fetch(`ModeratorRoleID_${message.guild.id}`)
	//Mod command and no permission
		if (command.mod && !message.member.roles.cache.some(role => role.id === `${ModeratorRoleID}`)) {
			if(command.botmanager == true) {
				if(message.content.startsWith(PREFIX+'')) return;
				if(message.content.startsWith(PREFIX+' ')) return;
				respond('❌ Bot Manager Command Only', 'This command can only be ran by the dev team.', message.channel)
				return;
			}
			const result = db.fetch(`DevToolsStatus_${message.author.id}`)
			if (result == 'true') return;
			if(message.content.startsWith(PREFIX+'')) return;
			if(message.content.startsWith(PREFIX+' ')) return;
			respond('🛑 Incorrect permissions',`<@${message.author.id}>, you don't seem to have the correct permissions to use this command or you can't run this command in this channel. Please try again later.`, message.channel)
			return;
	}
	
	//Channel not allowed
		if (channelRestrictions[command.name] && !channelRestrictions[command.name].includes(message.channel.id)) {
			respond('🛑 Incorrect permissions',`<@${message.author.id}>, you don't seem to have the correct permissions to use this command or you can't run this command in this channel. Please try again later.`, message.channel)
			return;
		}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			respond('⏲️',`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`, message.channel);
			return;
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


	//Normal
	try {
    //Checks if maintenance mode is enabled
    const db = require('quick.db')
    const status = db.fetch(`MaintenanceMode`)
    if(status == 'true') {
      if(message.member.roles.cache.some(role => role.id === BotManagerRoleID)) {
        return command.execute(message, args, client, this);
      }
      const maintenanceembed = new Discord.MessageEmbed()
      .setDescription('❌ Maintenance mode is enabled.')
      message.channel.send(maintenanceembed);
    } else {
      //Checks if bot banned
	fs.readFile('./botbanned.txt', function(err, data){
		const blacklistdata = data
		if(data && data.toString().includes(message.author.id)){
			message.channel.send('You\'re bot banned. This means that you are banned from using the bot. To appeal, fill up this form: https://forms.gle/qPRc98CW3aup9Jm38')
			return;
    
    } else {
	  command.execute(message, args, client, this);
	  if(message.channel.type == 'dm') return;
	  const mod = db.fetch(`ModeratorRoleID_${message.guild.id}`)
	  if(mod == null) {
		  message.channel.send('OrangeEcho is not activated. Please run `*setup` to activate.')
	  }
    }
  })
    }

	} catch (error) {
		console.error(error);
		respond('Error', 'Something went wrong.\n'+error, message.channel)


}
})







process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

//Error
client.on('error', error => {
	if(safemode == true){
		console.log(error)
		return;
	}
	console.error('ERROR: ', error);
	errorcount + 1
	const fs = require('fs');
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
	fs.appendFileSync('./debuglogs/error.log','('+dateTime+')'+error+'\n\n');
	fs.writeFileSync('./debuglogs/lasterror.txt',error);
	if (ProcessEndOnError == true){process.exit()}
});

//Member join
client.on('guildMemberAdd', member => {
	if(fs.existsSync('./safe_mode.flag'))return;
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
		if (!fs.existsSync('./logs/user.log')) {
			fs.appendFileSync('./logs/user.log', `__USER LOG CREATED ${dateTime}__\n\n`)
		}
	fs.readFile('./logs/user.log', function(err, data){
		if(err){
			errorlog(err)
			console.error
		}
		const guild = member.guild
		const UserLog = db.fetch(`UserlogID_${guild.id}`)
		const channel = client.channels.cache.get(UserLog)
		const icon = member.user.displayAvatarURL()
		if (!channel) return;
			if(data.toString().includes(member.id)){
			const joinedbefore = 'True.'
			console.log(joinedbefore)
			welcomeEmbedUserLog(dateTime, channel, guild, icon, member, joinedbefore)
		}else{
			const joinedbefore = 'False.'
			console.log(joinedbefore)
			welcomeEmbedUserLog(dateTime, channel, guild, icon, member, joinedbefore)
		}
		
		fs.appendFileSync('./logs/user.log', `${member.user.tag} (${member.id}) joined at '${dateTime}'.\nAccount creation date: ${member.user.createdAt}\nCurrent guild user count: ${guild.memberCount}\n\n`)
		
		function welcomeEmbedUserLog(dateTime, channel, guild, icon, member, joinedbefore){
        const MemberJoinEmbed = new Discord.MessageEmbed()
		.setColor('#00FF00')
		.setTitle('Member Join')
		.setThumbnail(`${icon}`)
		.addFields(
			{ name: 'Member', value: `<@${member.id}>`, inline: false },
			{ name: 'Username', value: member.user.tag, inline: false },
			{ name: 'ID', value: member.id, inline: false },
			{ name: 'Joined before?', value: joinedbefore, inline: false },
			{ name: 'Server member count', value: `${guild.memberCount}`, inline: false },
			{ name: 'Account creation', value: member.user.createdAt, inline: false },
		)
		.setTimestamp()
		try {
		const channeltosend = client.channels.cache.get(UserLog)
		channeltosend.send(MemberJoinEmbed)
		}catch(error) {
			console.log(error)
		}
	}
	})
			const guild = member.guild
			if (fs.existsSync('./logs/idbanlist.txt')){
			prebanList = require('./logs/idbanlist.txt')
			
			if(prebanList[member.id]){
				respond('Banned',`You were banned from the Apple Explained server. (PREBAN)\n\nReason: ${prebanList[member.id]}`, member)
				respond('Banned',`${member.user.tag} was banned from the server. (PREBAN)\nReason: ${prebanList[member.id]}`, guild.channels.cache.get(UserLog))
				modaction('ban', client.user.tag, 'Automatic preban.', `Automatic preban. Reason: ${prebanList[member.id]}`)
				member.ban({reason: `Prebanned. Reason: ${prebanList[member.id]}`});
			}
			delete require.cache[require.resolve(`./logs/idbanlist.txt`)]
		}
		fs.readFile('./files/welcomemessage.txt', function(err, data){
			const WelcomeEmbedDM = new Discord.MessageEmbed()
			WelcomeEmbedDM.setTitle('Welcome! 👋')
			if(err){
				WelcomeEmbedDM.setDescription('Welcome to '+member.guild.name+'!\n')
			}else{
				WelcomeEmbedDM.setDescription('Welcome to '+member.guild.name+'!\n'+data)
			}
			member.send(WelcomeEmbedDM)
		})
		if(AssignMemberRoleOnJoin == true){
			const role = member.guild.roles.cache.find(role => role.id === `${MemberRoleID}`);
			member.roles.add(role);
		}
	});


//Member leave
client.on('guildMemberRemove', member => {
	if(safemode == true)return;
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
  const guild = member.guild
	const icon = member.user.displayAvatarURL({ dynamic: true })
	fs.appendFileSync('./logs/user.log', `${member.user.tag} (${member.id}) left at '${dateTime}'.\nAccount creation date: ${member.user.createdAt}\nCurrent guild user count: ${guild.memberCount}\n\n`)
	const MemberLeaveEmbed = new Discord.MessageEmbed()
	.setColor('#ff0000')
	.setTitle('Member Leave')
	.setThumbnail(`${icon}`)
	.addFields(
		{ name: 'Username', value: member.user.tag, inline: false },
		{ name: 'Member ID', value: member.user.id, inline: false },
		{ name: 'Account creation date', value: member.user.createdAt, inline: false },
		{ name: 'Server member count', value: `${guild.memberCount}`, inline: false },
	)
	.setTimestamp()
  try {
  const UserLog = db.fetch(`UserlogID_${member.guild.id}`)
  const channel = member.guild.channels.cache.find(ch => ch.id === `${UserLog}`);
	channel.send(MemberLeaveEmbed)
  } catch(error) {
    console.log(error)
  }
});

//Profanity filter
client.on('message', message => {
  //Checks if profanity filter is enabled
  const db = require('quick.db');
  try {
  if(message.channel.type == 'dm') return;
  if(message.author.bot) return;
  const result = db.fetch(`ProfanityFilterStatus_${message.guild.id}`);
  } catch(error) {
    db.set(`ProfanityFilterStatus_${message.guild.id}`, 
    'true')
    	//False positive section
	const positive = require('./falsepositive.json');
	var falsePositiveEditedMessage = message.toString().replace(/[^\w\s]/g, "").replace(/\_/g, "")
	var fP = positive.filter(word => falsePositiveEditedMessage.toLowerCase().includes(word));
	if(fP.length > 0) {
		var noprofanity = 1
		if(positive == `${positive}`) {
			console.log('Someone swore-- wait never mind, they said '+fP+".")
		}
	}
	if(noprofanity === 1){
		var noprofanity = 0
		return;
	} else if(!noprofanity) {

	//"Oi there's profanity in there" section
	if(fs.existsSync('./safe_mode.flag'))return;
	if(message.channel.type == 'dm')return;
	const profanity = require('./profanity.json');
	var editedMessage = message.toString().replace(/[^\w\s]/g, "").replace(/\_/g, "")
	var blocked = profanity.filter(word => editedMessage.toLowerCase().includes(word));
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
	var dateTime = date+' '+time;
	if (blocked.length > 0) {
		if(blocked == `${blocked}`)
			console.log(`${message.author.tag} tried to use profanity. Logged word: ${blocked}`);
			message.delete()
			const reason = message.content.replace(/$blocked/g, `**${blocked}**`)
			warnModule = require('./commands/MOD_warn.js')
      //Writes reason to files
      const userid = message.author.id
      const authorusername = client.user.tag
      fs.appendFileSync('./logs/' + userid + '-warnings.log', 'Warning\nReason: ' + '(AUTOMOD) Profanity Filter' +'\n\n');
      fs.appendFileSync('./logs/' + userid + '-modwarnings.log',`Warning issued by ${authorusername}: \nReason: '(AUTOMOD) Profanity Filter'\n\n`);
			
		const profanityEmbed = new Discord.MessageEmbed()
		.setColor('#ff0000')
		.setTitle('Profanity')
		.addFields(
			{ name: 'Author', value: message.author.tag + `\n(${message.author.id})`, inline: true },
			{ name: 'Channel', value: message.channel.name, inline: true },
			{ name: 'Message', value: reason, inline: false },
		)
		.setTimestamp()
    try {
    const ModLog = db.fetch(`ModlogID_${message.guild.id}`)
		const channel = client.channels.cache.get(`${ModLog}`);
		channel.send(profanityEmbed)
			respond('Profanity Filter 🗣️',`Hey <@${message.author.id}>, please watch your language next time. Punishment information was updated on your profile.\nYour message: ${reason}`, message.author)
    message.channel.send(`Hey <@${message.author.id}>, watch your language. A warning has been logged.`)
    } catch(error) {
      message.channel.send('Oopsie doopsie, the bot ran into an error. \nError code: -2')
    }
  }
		}
  }

  const result = db.fetch(`ProfanityFilterStatus_${message.guild.id}`);
  if (result == 'false') {
    return;
  } else {
	//False positive section
	const positive = require('./falsepositive.json');
	var falsePositiveEditedMessage = message.toString().replace(/[^\w\s]/g, "").replace(/\_/g, "")
	var fP = positive.filter(word => falsePositiveEditedMessage.toLowerCase().includes(word));
	if(fP.length > 0) {
		var noprofanity = 1
		if(positive == `${positive}`) {
			console.log('Someone swore-- wait never mind, they said '+fP+".")
		}
	}
	if(noprofanity === 1){
		var noprofanity = 0
		return;
	} else if(!noprofanity) {

	//"Oi there's profanity in there" section
	if(fs.existsSync('./safe_mode.flag'))return;
	if(message.channel.type == 'dm')return;
  if(message.content.startsWith('https://')) return;
  if(message.content.startsWith('http://')) return;
  if(message.content.startsWith('www.')) return;
	const profanity = require('./profanity.json');
	var editedMessage = message.toString().replace(/[^\w\s]/g, "").replace(/\_/g, "")
	var blocked = profanity.filter(word => editedMessage.toLowerCase().includes(word));
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
	var dateTime = date+' '+time;
	if (blocked.length > 0) {
		if(blocked == `${blocked}`)
			console.log(`${message.author.tag} tried to use profanity. Logged word: ${blocked}`);
			message.delete()
			const reason = message.content.replace(/$blocked/g, `**${blocked}**`)
			warnModule = require('./commands/MOD_warn.js')
      //Writes reason to files
      const userid = message.author.id
      const authorusername = client.user.tag
      fs.appendFileSync('./logs/' + userid + '-warnings.log', 'Warning\nReason: ' + '(AUTOMOD) Profanity Filter' +'\n\n');
      fs.appendFileSync('./logs/' + userid + '-modwarnings.log',`Warning issued by ${authorusername}: \nReason: '(AUTOMOD) Profanity Filter'\n\n`);
			
		const profanityEmbed = new Discord.MessageEmbed()
		.setColor('#ff0000')
		.setTitle('Profanity')
		.addFields(
			{ name: 'Author', value: message.author.tag + `\n(${message.author.id})`, inline: true },
			{ name: 'Channel', value: message.channel.name, inline: true },
			{ name: 'Message', value: reason, inline: false },
		)
		.setTimestamp()
    try {
    const ModLog = db.fetch(`ModlogID_${message.guild.id}`)
		const channel = client.channels.cache.get(`${ModLog}`);
		channel.send(profanityEmbed)
			respond('Profanity Filter 🗣️',`Hey <@${message.author.id}>, please watch your language next time. Punishment information was updated on your profile.\nYour message: ${reason}`, message.author)
    message.channel.send(`Hey <@${message.author.id}>, watch your language. A warning has been logged.`)
    } catch(error) {
      message.channel.send('Oopsie doopsie, the bot ran into an error. \nError code: -2')
    }
  }
		}
	}
})

//Log deleted messages
client.on('messageDelete', async message => {
	if(safemode == true)return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	// Since we only have 1 audit log entry in this collection, we can simply grab the first one
	const deletionLog = fetchedLogs.entries.first();

	// Let's perform a sanity check here and make sure we got *something*
	if (!deletionLog) {
  console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);
	const DeletionEmbed = new Discord.MessageEmbed()
	.setColor('#ff0000')
	.setTitle('Message Deleted')
	.addFields(
		{ name: 'Message sent by', value: message.author.tag, inline: false },
		{ name: 'Deleted by', value: 'Unknown - Audit log not found.', inline: false },
		{ name: 'Sent in', value: message.channel.name, inline: false },
		{ name: 'Message', value: message.content, inline: false },
	)
	.setTimestamp()
  try {
  const ModLog = db.fetch(`ModlogID_${message.guild.id}`)
	const channel = client.channels.cache.get(`${ModLog}`);
	channel.send(DeletionEmbed)
  } catch(error) {
    message.channel.send('Oopsie doopsie, the bot ran into an error. \nError code: -2')
    console.log(error)
  }
  }

	// We now grab the user object of the person who deleted the message
	// Let us also grab the target of this action to double check things
	const { executor, target } = deletionLog;


	// And now we can update our output with a bit more information
	// We will also run a check to make sure the log we got was for the same author's message
	if (target.id === message.author.id) {
		console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`)
		const DeletionEmbed = new Discord.MessageEmbed()
		.setColor('#ff0000')
		.setTitle('Message Deleted')
		.addFields(
			{ name: 'Message sent by', value: message.author.tag, inline: false },
			{ name: 'Deleted by', value: executor.tag, inline: false },
			{ name: 'Sent in', value: message.channel.name, inline: false },
			{ name: 'Message', value: message.content, inline: false },
		)
		.setTimestamp()
    try {
    const ModLog = db.fetch(`ModlogID_${message.guild.id}`)
		const channel = client.channels.cache.get(`${ModLog}`);
		channel.send(DeletionEmbed)
		return;
    } catch(error) {
      message.channel.send('Oopsie doopsie, the bot ran into an error. \nError code: -2')
      console.log(error)
    }
	}	else {
		if (target.id === message.author.id) return;
		console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`)
		const DeletionEmbed = new Discord.MessageEmbed()
		.setColor('#ff0000')
		.setTitle('Message Deleted')
		.addFields(
			{ name: 'Message sent by', value: message.author.tag, inline: false },
			{ name: 'Deleted by', value: 'Unknown - Unable to find who deleted message. - May occur when the message author erases their own message', inline: false },
			{ name: 'Sent in', value: message.channel.name, inline: false },
			{ name: 'Message', value: message.content, inline: false },
		)
		.setTimestamp()
    try {
    const ModLog = db.fetch(`ModlogID_${message.guild.id}`)
		const channel = client.channels.cache.get(`${ModLog}`);
		channel.send(DeletionEmbed)
		return;
    } catch(error) {
      message.channel.send('Oopsie doopsie, a bot error has occurred. \nError code: -2')
      console.log(error)
    }
	}
});

//message log
client.on('message', message => {
	if(safemode == true)return;
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
	const fs = require('fs');
  if (message.channel.type == 'dm') {
    	fs.appendFileSync('./logs/DM_' +message.author.id + '.log', '\nMessage sent by ' +message.author.username + '('+message.author.id+') in '+message.channel.name+'('+message.channel.id+')'+'\n\n' + message.content);
  } else {
  fs.appendFileSync('./logs/SERVER_' + message.guild.name +'-'+ message.guild.id + '-messages.log', '\n\nSent in '+message.channel.name+'('+message.channel.id+')'+'\n\n' + message.content);
  fs.appendFileSync('./logs/allmessages.log', '\n\nServer: ' +message.guild.name + ' '+message.guild.id + '\nMessage sent by ' +message.author.username + '('+message.author.id+') in '+message.channel.name+'('+message.channel.id+')'+'\n\n' + message.content);
	fs.appendFileSync('./logs/' + message.author.id + '-messages.log', '\n\nSent in '+message.channel.name+'('+message.channel.id+')'+'\n\n' + message.content);
  fs.appendFileSync('./logs/allmessages_'+date +'.log', '\n\nServer: ' +message.guild.name + ' '+message.guild.id + '\nMessage sent by ' +message.author.username + '('+message.author.id+') in '+message.channel.name+'('+message.channel.id+')'+'\n\n' + message.content);
  }
})

//Message edit
client.on('messageUpdate', (oldMessage, newMessage) => {
	if(safemode == true)return;
	if (oldMessage.author.bot)return;
	const old = oldMessage.toString()
	const newmsg = newMessage.toString()
	if(old == newmsg) return;
  if(oldMessage == newMessage) return;
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
	if (oldMessage === newMessage)return;
	var ref = "http://discordapp.com/channels/" + oldMessage.guild.id + "/" + oldMessage.channel.id + "/" + oldMessage.id;
	const MessageEditEmbed = new Discord.MessageEmbed()
	.setColor('#eea515')
	.setTitle('Message Edit')
	.setDescription('A message edit was detected.')
	.addFields(
		{ name: 'Channel sent: ', value: oldMessage.channel.name, inline: false },
		{ name: 'Message author', value: oldMessage.author.tag, inline: false },
		{ name: 'Old message', value: oldMessage, inline: true },
		{ name: 'Updated message', value: newMessage, inline: true },
		{ name: 'Message link', value: `[Jump](${ref})`, inline: false },

	)
	.setTimestamp()
  try {
  const ModLog = db.fetch(`ModlogID_${newMessage.guild.id}`)
	const channel = client.channels.cache.get(`${ModLog}`);
	channel.send(MessageEditEmbed);
  } catch(error) {
    oldMessage.channel.send('Oopsie doopsie, the bot ran into an error. \nError code: -2')
  }

})

//Below are client emit actions
client.on("StartupIssue", () => {
	var today = new Date();
	fs.readFile('./errorcount.txt', function(err, data){
		if(err){
			fs.writeFileSync('./errorcount.txt',0+1);
		}else{
			fs.writeFileSync('./errorcount.txt',Number(data)+1);
		}
	})
	var titleofstartup = 'Bot Started - Issue Detected'
	var descriptionofstartup = 'The bot loaded successfully, but restarted unexpectedly.'
	if(safemode == true){
		var titleofstartup = 'Bot Started - Safe Mode'
		var descriptionofstartup = 'The bot was unable to start normally multiple times, so it entered safe mode.'
	}

		var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date+' '+time;
		const StartupEmbed = new Discord.MessageEmbed()
		.setColor('#ffa900')
		.setTitle(titleofstartup)
		.setDescription(descriptionofstartup)
		.setTimestamp()
		.setFooter(footertext)
		modlog = client.channels.cache.get(`${BotLog}`);
		modlog.send(StartupEmbed);

		return
})

client.on('StartupPassed', () => {
	if (fs.existsSync('./errorcount.txt')){
		fs.unlinkSync(`./errorcount.txt`)
	}
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
	var footertext = 'botOS '+ version +'\nCodename: '+ codename +'\nRemember to wash your hands regularly! \nStay safe during the COVID-19 period!'
	const StartupEmbed = new Discord.MessageEmbed()
		.setColor('#00FF00')
		.setTitle('Bot Started')
		.setDescription(`Bot has started successfully.`)
		.setTimestamp()
		.setFooter(footertext)
	modlog = client.channels.cache.get(`${BotLog}`);
	modlog.send(StartupEmbed);
	fs.writeFileSync('./runstate.txt', 'running')
	return;
})

//Hardcoded events


function clean(text) {
	if (typeof(text) === "string")
	  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
  }
  client.on("message", message => {
	const args = message.content.split(" ").slice(1);

	if (message.content.startsWith(PREFIX + "eval")) {
	  if(message.author.id !== OwnerID){respond('❌ Bot Owner Command Only', 'This command can only be ran by the bot owner.', message.channel);return;}
	  try {
		const code = args.join(" ");
		let evaled = eval(code);

		if (typeof evaled !== "string")
		  evaled = require("util").inspect(evaled);

		respond('⌨️ Eval Command',clean(evaled), message.channel);
	  } catch (err) {
		respond('⌨️ Eval Command Error',`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``, message.channel);
	  }
	}

		//This code here

		if (message.content.startsWith(PREFIX + "safemode",)) {
			if(!message.member.roles.cache.some(role => role.id == BotManagerRoleID)){respond('❌ Bot Manager Command Only', 'This command can only be ran by the dev team.', message.channel);return;}
			try {
				safemode = true
				fs.writeFileSync('./safe_mode.flag', (error) => {
					if(error)console.log(error)
				});
				console.log('WARNING: SAFE MODE ACTIVE')
				respond('', '✅', message.channel)
				return;
			  } catch (error) {
					respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
			  errorlog(error)
			  // Your code broke (Leave untouched in most cases)
			  console.error('an error has occured', error);
			  }}}
  );
  client.on('message',message => {
  if (message.content.startsWith(PREFIX + "exitsafemode")) {
	if(!message.member.roles.cache.some(role => role.id == BotManagerRoleID)){respond('❌ Bot Manager Command Only', 'This command can only be ran by the dev team.', message.channel);return;}
	try {
		safemode = false
		fs.unlinkSync('./safe_mode.flag', (error) => {
			if(error)console.log(error)
		});
		console.log('WARNING: SAFE MODE ACTIVE')
		respond('', '✅', message.channel)
	  } catch (error) {
			respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
	  errorlog(error)
	  // Your code broke (Leave untouched in most cases)
	  console.error('an error has occured', error);
	  }}})
//Login
client.login(token);