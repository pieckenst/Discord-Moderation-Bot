const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'nuke',
        description: 'Delete all the messages in a channel."',
        category: 'moderator',
        aliases: [""],
        usage: '',
        permissions: ["MANAGE_CHANNELS"],
    },
    async run(client, message, args){
        let channel = client.channels.cache.get(message.channel.id);
        const position = channel.position;
        const topic = channel.topic;
    
        const channel2 = await channel.clone();
    
        channel2.setPosition(position);
        channel2.setTopic(topic);
        channel.delete();

        const nuke = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(":boom: **Channel Has Been Nuked!**")
        return channel2.send(nuke);
    }
}
