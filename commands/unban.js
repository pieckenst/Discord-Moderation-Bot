const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

module.exports = {
    config: {
        name: 'unban',
        description: 'Unban a user from the guild.',
        category: 'moderator',
        aliases: [""],
        usage: '<ID>',
        permissions: ["BAN_MEMBERS"],
    },
    async run(client, message, args){
        let userID = args[0];
        
        if(!userID){
            const missingArgs = new MessageEmbed()
                .setColor("RED")
                .setTitle("Missing arguments")
                .setDescription(`**Command:** \`${this.config.name}\`\n**Description:** \`${this.config.description || "None"}\`\n**Aliases:** \`${this.config.aliases.join(", ") || "None"}\`\n**Usage:** \`${config.prefix}${this.config.name}${this.config.usage}\`\n**Permissions:**\`${this.config.permissions || "None"}\``)
                .setTimestamp()
            return message.channel.send(missingArgs);
        }
        message.guild.fetchBans().then(bans=> {
            if(bans.size == 0){
                const err = new MessageEmbed()
                    .setColor("RED")
                    .setDescription("**Nobody is banned from this server!**")
                return message.channel.send(err);   
            } else {
                let unbanUser = bans.find(b => b.user.id == userID)
                if(!unbanUser){
                    const err = new MessageEmbed()
                        .setColor("RED")
                        .setDescription("**This user is not banned!**")
                    return message.channel.send(err);  
                } else {
                    try {
                      
                        message.guild.members.unban(unbanUser.user)
                        const unbanned = new MessageEmbed()
                            .setColor("GREEN")
                            .setTitle("Member Unbanned")
                            .setDescription(`**Unbanned:** \`${unbanUser.user.tag}\`\n**Moderator:** ${message.member}`)
                        return message.channel.send(unbanned);
                    } catch (error) {
                        const err = new MessageEmbed()
                            .setColor("RED")
                            .setDescription(`**Something went wrong check my perms and try again!**`)
                        return message.channel.send(err);
                    }                    
                }
            }   
      }); 
    }
}
