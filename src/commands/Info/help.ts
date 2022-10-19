import { Command } from "../../structures/Command";
import { HelpPages } from "../../Managers/exports";
import { EmbedBuilder, ActionRowBuilder, MessageActionRowComponentBuilder, ButtonBuilder, ButtonStyle, Message } from "discord.js";

export default new Command({
    name: "help",
    description: "List of all the commands that bot has",
    run: async ({ interaction, client }) => {
        
        const pages = await HelpPages.makePages().then(pages => pages);

        const row = new ActionRowBuilder<MessageActionRowComponentBuilder>()
            .addComponents(
                [
                    new ButtonBuilder()
                        .setCustomId(`previous-${interaction.user.id}`)
                        .setEmoji(`◀️`)        
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setCustomId(`next-${interaction.user.id}-1`)
                        .setEmoji("▶️")
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(pages.length == 1)
                ]
            )

        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
            .setTitle(`🔰 Bot Commands`)
            .setDescription(`${pages[0].join("\n")}`)
            .setFooter({ text: `Page 1/${pages.length}`})
            .setColor("#af42d7")

        interaction.reply({ embeds: [embed], components: [row] })

    }
})