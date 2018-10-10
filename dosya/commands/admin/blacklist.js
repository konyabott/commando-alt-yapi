const { Command } = require('discord.js-commando');

module.exports = class BlacklistCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'botdayasakla',
			aliases: ['karaliste', 'blacklist'],
			group: 'admin',
			memberName: 'botdayasakla',
			description: 'Belirlediğiniz Kişiyi Kara Listeye Alırsınız.',
			throttling: {
				usages: 2,
				duration: 3
			},
			guarded: true,

			args: [
				{
                    key: 'user',
                    label: 'kişi',
					          prompt: 'Kara Listeye Almak İstediğiniz Kişi Kim ?',
                    type: 'user',
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	run(msg, { user }) {
		if (this.client.isOwner(user.id)) return msg.reply('Kendini Blackliste Alamazsın.');

		const blacklist = this.client.provider.get('global', 'userBlacklist', []);
		if (blacklist.includes(user.id)) return msg.reply('Bu Kişi Zaten Blacklistte.');

		blacklist.push(user.id);
		this.client.provider.set('global', 'userBlacklist', blacklist);

		return msg.reply(`\`${user.tag}\` Kara Listeye Aldik.`);
	}
};
