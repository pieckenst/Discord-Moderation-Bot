const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

module.exports = {
    config: {
        name: 'unmute',
        description: 'Unmute a person.',
        aliases: ["unmmute"],
        usage: '<@user/ID> [Reason]',
        permissions: ["MANAGE_ROLES"],
    },
    async run(client, message, args){
        const mutemember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let muteReason = args.slice(1).join(' ');
        if(!muteReason) muteReason = "Not Specified."

        if(!mutemember){
            const missingArgs = new MessageEmbed()
                .setColor("RED")
                .setTitle("Missing arguments")
                .setDescription(`**Command:** \`${this.config.name}\`\n**Description:** \`${this.config.description || "None"}\`\n**Aliases:** \`${this.config.aliases.join(", ") || "None"}\`\n**Usage:** \`${config.prefix}${this.config.name}${this.config.usage}\`\n**Permissions:**\`${this.config.permissions || "None"}\``)
                .setTimestamp()
            return message.channel.send(missingArgs);
        }
        let muteRole = message.guild.roles.cache.find(r => r.name === "Muted")

        if(!muteRole){
            const err = new MessageEmbed()
                .setColor("RED")
                .setDescription(`**There is no role called \`Muted\` on this server!**`)
            return message.channel.send(err);
        } else {
            if(!mutemember.roles.cache.has(muteRole.id)) {
                const err = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${member} **is not muted!**`)
                return message.channel.send(err);
            } else {
                await mutemember.roles.remove(muteRole)

                let embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle("Member Unmuted")
                    .setTimestamp()
                    .setDescription(`**Unmuted:** \`${mutemember.user.tag}\`\n**Moderator:** ${message.member}\n**Reason:** \`${muteReason}\``)
                return message.channel.send(embed); 
            }
        }
    }
}
