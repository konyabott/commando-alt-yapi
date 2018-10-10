const { CommandoClient, SQLiteProvider } = require('discord.js-commando'); // gerekli olan modül
const { RichEmbed } = require('discord.js') // gerekli olan modül
const Discord = require('discord.js'); // gerekli olan modül
path = require('path'), // gerekli olan modül
moment = require('moment'), // gerekli olan modül
sqlite = require('sqlite'); // gerekli olan modül
const Jimp = require('jimp') // gerekli olan modül
require('moment-duration-format'); // gerekli olan modül
const fs = require('fs') // gerekli olan modül
const hook = new Discord.WebhookClient('492744967903641600', 'RAncQ72oSC2Z66f0POB6WtUXIpkC3HeNnf-OQfDur64JKvjZCi-V48U7fK5ajRl0hGPQ');
const ayarlar = require('./dosya/veriler/botayarlar.json'); // gerekli olan json
let prefix = ayarlar.prefix // gerekli olan ayarlar
const client = new CommandoClient({
    commandPrefix: ayarlar.prefix,
    unknownCommandResponse: false,
    owner: ayarlar.owner,
    disableEveryone: false
});

client.dispatcher.addInhibitor(msg => {
	const blacklist = client.provider.get('global', 'userBlacklist', []);
	if (!blacklist.includes(msg.author.id)) return false;
	msg.react('492970473110503425');
	return true;
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
    ['ayarlar', 'Ayarlar Komutları'],
    ['moderasyon', 'Moderasyon Komutları'],	
	  ['admin', 'Admin Komutları'],
    ['bot', 'Bot Komutları'],

  ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, './dosya/commands'));

	sqlite.open(path.join(__dirname, "./dosya/veriler/kayitlar.sqlite3")).then((db) => {
		client.setProvider(new SQLiteProvider(db));
	});

client.on('ready', () => {
  client.user.setStatus('idle'); // dnd ( rahatsız etmeyın ) , idle ( bosta ), online ( cevrımıcı )
  client.user.setActivity(".yardım | Discord Bot Dersleri", { type: "WATCHING"});
  console.log(`Bot Aktif`);
});

client.on('error', err => {
	console.log(err)
});

client.login('NDk4MDYwMDI3NjEzOTM3NjY1.DpoPAg.rqaFsc67ahJdqOPBPcVjhvOQL7w');
