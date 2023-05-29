const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('komenda do wyrzucania uzytkowników z servera')
    .addUserOption(option => option.setName('Użytkownik') .setDescription('user do wyrzucenia') .setRequired(true)),
    async execute(interaction) {

        if (!interaction.member.permissions.has('KickMembers')) {
            const noPermissionsEmbed = new EmbedBuilder()
              .setColor('Blue')
              .setDescription('Nie masz uprawnień do wyrzucania członków!');
      
            await interaction.reply({ embeds: [noPermissionsEmbed], ephemeral: true });
            return;
          }
      
          // Pobierz użytkownika do zbanowania
          const user = interaction.options.getUser('użytkownik');
      
          // Banowanie użytkownika
          await interaction.guild.members.ban(user);
      
          const banEmbed = new EmbedBuilder()
            .setColor('Red')
            .setDescription(`Pomyślnie wyrzucono użytkownika: ${user.tag}`);
      
          await interaction.reply({ embeds: [banEmbed] });
        },
      };