// Tworzenie komendy /ban
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Banuje użytkownika')
    .addUserOption(option =>
      option.setName('użytkownik')
        .setDescription('Użytkownik do zbanowania')
        .setRequired(true)
    ),
  async execute(interaction) {
    // Sprawdź uprawnienia
    if (!interaction.member.permissions.has('BanMembers')) {
      const noPermissionsEmbed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription('Nie masz uprawnień do banowania członków!');

      await interaction.reply({ embeds: [noPermissionsEmbed], ephemeral: true });
      return;
    }

    // Pobierz użytkownika do zbanowania
    const user = interaction.options.getUser('użytkownik');

    // Banowanie użytkownika
    await interaction.guild.members.ban(user);

    const banEmbed = new EmbedBuilder()
      .setColor('Red')
      .setDescription(`Pomyślnie zbanowano użytkownika: ${user.tag}`);

    await interaction.reply({ embeds: [banEmbed] });
  },
};
