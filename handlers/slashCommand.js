module.exports = {
    loadSlashCommands
    }
    function loadSlashCommands(client) {
        const fs = require("fs");``
        const ascii = require("ascii-table");
    
        let slash = []
    
        const table = new ascii().setHeading(" Slash Commands", "Load statusu");
      
        const commandFolders = fs.readdirSync("./slashCommands");
        for (const folder of commandFolders) {
          const commandFiles = fs
            .readdirSync(`./slashCommands/${folder}`)
            .filter((file) => file.endsWith(".js"));
          for (const file of commandFiles) {
            const command = require(`../slashCommands/${folder}/${file}`);
            if (command.name) {
              client.slash.set(command.name, command);
              slash.push(command)
              table.addRow(file, ":white_check_mark:");
            } else {
              table.addRow(
                file,
                ":x: =-=-=> Niema nazwy, lub nie jest w stringu :/"
              );
              continue;
            }
          }
          console.log(table.toString());
        }
        client.on("ready", async() => {
          await client.application.commands.set(slash)
        })
      }