const { MessageEmbed } = require('discord.js');
const config = require('../config.json');


module.exports = {
    config: {
        name: 'purge',
        description: 'Purge messages in a channel.',
        category: 'moderator',
        aliases: [""],
        usage: '<#messages>',
        permissions: ["MANAGE_MESSAGES"],
    },
    async run(client, message, args){
        const amount = parseInt(args[0]);

        if(isNaN(amount) || !amount || amount < 0){
            const missingArgs = new MessageEmbed()
                .setColor("RED")
                .setTitle("Missing arguments")
                .setDescription(`**Command:** \`${this.config.name}\`\n**Description:** \`${this.config.description || "None"}\`\n**Aliases:** \`${this.config.aliases.join(", ") || "None"}\`\n**Usage:** \`${config.prefix}${this.config.name}${this.config.usage}\`\n**Permissions:**\`${this.config.permissions || "None"}\``)
                .setTimestamp()
            return message.channel.send(missingArgs);
        }

        var purgelimit = amount + 1;
        if(purgelimit > 100) purgelimit = 100;

        messages = await message.channel.messages.fetch({ limit: purgelimit });

        message.channel.bulkDelete(messages).then(messages => {
            const succes = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**Succesfully deleted** \`${messages.size}\` **messages.**`)
            return message.channel.send(succes).then(msg => msg.delete({ timeout: 5000 })).catch(err => null);
        }).catch(error => {
            const err = new MessageEmbed()
                .setColor("RED")
                .setDescription(`**Unable to delete messages older than 2 weeks.**`)
            return message.channel.send(err ).then(msg => msg.delete({ timeout: 5000 })).catch(err => null);
        });
    }
}
