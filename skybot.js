
// Main scripts Start
const Discord = require("discord.js");
const bot = new Discord.Client();
const client = new Discord.Client();
const config = require("./config.json");
const webhook = require("webhook-discord");
const AnnounceOn = new webhook('https://discordapp.com/api/webhooks/360814265973735425/TScj7opwoOGrRSvIF_v0fE1lMHxU2rYL2PQXcx2LG_JrYtXyw-fysDkrvZIdJg6klC2l');
const prefix = config.prefix
let echoParam = 'ON'
// Main scripts End

// Blooky's token
// MjkxMDI1MzQzNTU1NDM2NTQ0.DKeBrA.N_SyzbD-PJivzEIC-vrYGXx0yuI

// Command stuff
// To do stuff related to config, type "config.<config>".
bot.on("message", async message => {
	const msg = message.content.trim()
	const args = message.content.split(" ").slice(1);

	
	if(msg.toLowerCase().startsWith(prefix + 'echo')) {
		if(echoParam == 'OFF') {
			message.delete()
			message.channel.send(args.join(" "))
		} else {
			message.channel.send(args.join(" "))
		}
	}
	
	if(msg.toLowerCase().startsWith(config.prefix + 'reboot')) {
		if(config.idowner == String(message.author.id)) {
			message.channel.send('Rebooting...')
			console.log('Sending pulse "reboot"!')
			process.exit()
		} else {
			message.channel.send(config.errorNoPerm)
			console.log(`${message.author.username} just tried rebooting, but failed!`)
		}
	}
	
	if (msg.toLowerCase().startsWith(config.prefix + "eval")) {
		if(message.author.id !== config.idowner) {
			message.channel.send(config.errorNoPerm)
			console.log(`${message.author.username} tried using ^eval, but failed!`)
		} else {
		try {
			const code = args.join(" ");
			let evaled = eval(code);

			if (typeof evaled !== "string")
			evaled = require("util").inspect(evaled);

			message.channel.send(clean(evaled), {code:"xl"});
		} catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
		}
		}
	// •
		if(msg.toLowerCase().startsWith(prefix + 'pbc')) {
			if(args[0].toLowerCase() == 'getstat') {
				if(args[1].toLowerCase() == 'skybot-stats') {
					const embed = new Discord.RichEmbed()
					.setColor("RANDOM")
					.setDescription('• [SkyBot Server Status](https://bluspring.github.io/admin/server/skybot/status/server/di9eiefefi3390eeijfjioejdiow90dwiwqsay7eywd7dsujieujhhehhde98eh8yuhd.html) •')
					.addField('• Connection •', '• Error 0x589322e - Bot not found! Maybe wrong ID? •', true)
					.addField('• Errors •', '• Error 0x589322e - Bot not found! Maybe wrong ID? •', true)
					.addField('• System Power •', '• win.system.battery("noBattery") = true •', true)
					.addField('• Uptime •', '• Error 0x589322e - Bot not found! Maybe wrong ID? •', true)
					message.channel.send(embed)
				} else if(args[1].toLowerCase() == 'ping') {
					const msgPong = await message.channel.send("Checking for the ping...");
 					 const pingReturn = new Discord.RichEmbed()
       	 .setColor([182, 244, 66])
   		 .addField(`• Message •`, `• ${msgPong.createdTimestamp - message.createdTimestamp}ms •`, true)
   				 .addField(`• API •`, `• ${Math.round(bot.ping)}ms •`, true)
  		  msgPong.edit(pingReturn);
			}
		}
	}
	
	// Guilds list = bot.guilds.map(g => g.name + '\n')
	
	if(msg.toLowerCase().startsWith(prefix + 'toggleparam')) {
		if(args[0].toLowerCase() == 'echo') {
			if(echoParam == 'OFF') {
				echoParam = 'ON'
				message.channel.send('Set Echo parameter to ON')
			} else if(echoParam == 'ON') {
				echoParam = 'OFF'
				message.channel.send('Set Echo parameter to OFF')
			}
		}
	}
});

// Log stuff
bot.login(config.token)

bot.on('ready', async () => {
    bot.user.setGame(config.game)
	bot.user.setStatus(config.status)
    console.log(`Online using SkyBot version ${config.version} on Blu-PC.`);
	console.log(`Online on ${bot.guilds.size} servers.`)
	console.log(`Sent Online info to FoozBallKing Bot Official server and TheFoozBallTable.`)
	console.log(`Set game info to ${config.game}.`)
	console.log(`Set configurations file to "./config.json"`)
	console.log(`Set up help commands.`)
	console.log(`SkyBot version ${config.version} has now finished boot loads with command size number "1"`)
})

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

process.on('unhandledRejection', (reason, p) => { // Thanks to Damien // CodaEnder for this :P, catches an unhandled rejection error.
  console.log('Unhandled Rejection at: ', p, ', reason:', reason);
});