const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class UtilAnnounceCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'duyuru',
            aliases: ['annouce', 'duyru', 'duyuruyap', 'anons', 'anonsyap'],
            group: 'util',
            memberName: 'duyuru',
            description: 'Sunucunuzda duyuru yapmanızı sağlar.',
            guildOnly: true,
            throttling: {
                 usages: 2,
                 duration: 3
             },

            args: [

                {
                    key: 'duyuru',
                    label: 'duyuru mesajı',
                    prompt: 'Duyuru mesajını yazar mısınız?',
                    type: 'string',
                    min: 1,
                    max: 1000
                },
				{
					key: 'kanal',
					prompt: 'duyuru hangi kanala gönderilsin? (#kanalismi şeklinde yazınız)\n',
					type: 'channel',
				}
            ]
        });
    }

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

    async run(msg, args) {
      const embed2 = new RichEmbed()
      .setColor("RANDOM")
      .setAuthor(`Duyuru!`, msg.author.avatarURL)
      .setDescription(args.duyuru)
      .setFooter(`Duyuruyu yapan: ${msg.author.tag} `, msg.guild.iconURL)
      .setTimestamp()
        msg.guild.channels.get(args.kanal.id).send('@everyone').then(msg => msg.delete());
        msg.guild.channels.get(args.kanal.id).send(embed2);
        msg.channel.send(`Duyuru başarılı bir şekilde gönderildi.`);
    };
};
