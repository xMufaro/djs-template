import { Command} from "../../structures/Command";
import { EmbedBuilder } from "discord.js";
import ms from "ms";

/** 
 * This is the example of a Slash Command
 * You can export the Command class and use it to handle commands in seperate files.
 */

export default new Command({
    name: "ping",
    description: "Check the bot's ping",
    run: async ({ interaction, client }) => {
        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
            .addFields(
                {
                    name: "Bot Information",
                    value: `・ Client: ${client.ws.ping}ms\n ・ API: ${Date.now() - interaction.createdTimestamp}ms\n ・ Uptime: ${ms(Math.floor(client.uptime / 1000))}\n・ Platform: ${process.platform}\n ・ Arch: ${process.arch}\n ・ Node: ${process.version}\n ・ Discord.js: ${require("discord.js").version}`,
                }
            )
            .setColor(`#af42d7`)
            interaction.reply({embeds: [embed]})
    }
})