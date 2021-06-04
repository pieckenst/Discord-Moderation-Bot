const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

module.exports = {
    config: {
        name: 'removerole',
        description: 'Removes the specified role to the provided user.',
        category: 'moderator',
        aliases: [""],
        usage: '<@user/ID> <@role/ID>',
        permissions: ["MANAGE_ROLES"],
    },
    async run(client, message, args){
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const role = message.guild.roles.cache.get(args[1]) || 
        message.guild.roles.cache.find(r => r.name === args[1]) || 
        message.mentions.roles.first();

        if(!member || !role){
            const missingArgs = new MessageEmbed()
                .setColor("RED")
                .setTitle("Missing arguments")
                .setDescription(`**Command:** \`${this.config.name}\`\n**Description:** \`${this.config.description || "None"}\`\n**Aliases:** \`${this.config.aliases.join(", ") || "None"}\`\n**Usage:** \`${config.prefix}${this.config.name}${this.config.usage}\`\n**Permissions:**\`${this.config.permissions || "None"}\``)
                .setTimestamp()
            return message.channel.send(missingArgs);
        } else {
            if (message.guild.me.roles.highest.comparePositionTo(role) < 0){
                const err = new MessageEmbed()
                    .setColor("RED")
                    .setDescription("**I cannot remove this role!**")
                return message.channel.send(err);
            }else {
                try {
                    if(!member.roles.cache.has(role.id)) {
                        const err = new MessageEmbed()
                            .setColor("RED")
                            .setDescription(`${member} **doesn't have ${role} role!**`)
                        return message.channel.send(err);
                    } else {
                        await member.roles.remove(role).then(() => {
                            const succes = new MessageEmbed()
                                .setColor("GREEN")
                                .setDescription(`**Succesfully removed ${role} role from ${member}!**`)
                            return message.channel.send(succes);
                        }).catch((error) => {
                            const err = new MessageEmbed()
                                .setColor("RED")
                                .setDescription("**I cannot remove this role!**")
                            return message.channel.send(err);
                        });
                    }  
                } catch (error) {
                    const err = new MessageEmbed()
                        .setColor("RED")
                        .setDescription("**I cannot remove this role!**")
                    return message.channel.send(err);
                } 
            }
        }
    }
}
