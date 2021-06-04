const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

module.exports = {
    config: {
        name: 'ban',
        description: 'Ban a user from the guild.',
        aliases: [""],
        usage: '<@user/ID> [reason]',
        permissions: ["BAN_MEMBERS"],
    },
    async run(client, message, args){
        const banmember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let banReason = args.join(" ").slice(23);
        if (!banReason) banReason = "Not Specified.";

        if(!banmember){
            const missingArgs = new MessageEmbed()
                .setColor("RED")
                .setTitle("Missing arguments")
                .setDescription(`**Command:** \`${this.config.name}\`\n**Description:** \`${this.config.description || "None"}\`\n**Aliases:** \`${this.config.aliases.join(", ") || "None"}\`\n**Usage:** \`${config.prefix}${this.config.name}${this.config.usage}\`\n**Permissions:**\`${this.config.permissions || "None"}\``)
                .setTimestamp()
            return message.channel.send(missingArgs);
        }

        if (!banmember.bannable) {
            const err = new MessageEmbed()
                .setColor("RED")
                .setDescription(`**That person can't be banned!**`)
            return message.channel.send(err);
        }

        if (message.guild.me.roles.highest.comparePositionTo(banmember.roles.highest) < 0){
            const err = new MessageEmbed()
                .setColor("RED")
                .setDescription(`**My role must be higher than \`${banmember.user.tag}\` highest role!**`)
            return message.channel.send(err);
        }

        try {
            banmember.ban({ reason: banReason });

            const kick = new MessageEmbed()
                .setColor("BLUE")
                .setTitle("You have beek banned!")
                .setDescription(`**Server: \`${message.guild.name}\`\nReason:\`${banReason}\`\nModerator: \`${message.author.tag}\`**`)
            banmember.send(kick).catch(err => null);

            let embed = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Member Banned")
                .setTimestamp()
                .setDescription(`**Banned:** \`${banmember.user.tag}\`\n**Moderator:** ${message.member}\n**Reason:** \`${banReason}\``)
            return message.channel.send(embed);
        } catch (error) {
            const err = new MessageEmbed()
                .setColor("RED")
                .setDescription(`**Something went wrong check my perms and try again!**`)
            return message.channel.send(err);
        }
    }
}