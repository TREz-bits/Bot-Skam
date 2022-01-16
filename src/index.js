const Discord = require('discord.js');
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
const config = require('./config.json')

client.on("messageCreate", async (message) => {

    if(message.channel.type == 'dm') return;
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const commands = args.shift().toLocaleLowerCase()

    if(commands === "ping") {
        message.channel.send("Pong!");
    }

    if (commands === "repite") {
        let texto = args.join(" ");
        if(!texto) return message.channel.send(`Escriba el contenido a enviar.`);
        message.channel.send(texto);
    }

    if (commands == "alguien") {
        const mencionado = message.mentions.users.first();

        let id = mencionado.id;
        let nombre = mencionado.username;
        let avatar = mencionado.displayAvatarURL();

        console.log(avatar);
        message.channel.send(`${id}, ${nombre}, ${avatar}`)
    }

    if (commands === "banear") {
        let mencionado = message.mentions.users.first();
        let razon = args.slice(1).join(' ');

        if(!mencionado) return message.reply(`No ha mencionando a ningún miembro.`);
        if(!razon) return message.channel.send(`Escriba una razón del uso de kick.`);

        message.guild.cache.kick(mencionado);
        console.log(mencionado);
        message.channel.send(`**${mencionado.username}**, fue expulsado del servidor, razón: ${razon}.`);
    }

})

client.on('ready', () => {
    client.user.setActivity('te quiero estephano');
})

client.login(config.token);