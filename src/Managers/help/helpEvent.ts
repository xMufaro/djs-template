import { Event } from "../../structures/Event";
import { client } from "../../index";
import { log } from "../../utils/coloredConsole";
import { EmbedBuilder, MessageActionRowComponentBuilder, ButtonBuilder, ButtonStyle, ChannelType, ActionRowBuilder } from "discord.js";
import { HelpPages } from "./HelpPages";


export default new Event("interactionCreate", async (interaction) => {
    
    if(!interaction.isButton()) return;
    
    const user = interaction.user
    if(interaction.customId.startsWith("previous-")) {
        const id = interaction.customId.split("-")[1];
        const page = parseInt(interaction.customId.split("-")[2]);
        const pages = await HelpPages.makePages(null, page).then(pages => pages);
        const embed = new EmbedBuilder()
            .setDescription(`🔰 **Bot Commands**\n\n${pages[page].join("\n")}`)
            .setFooter({ text: `Page ${page+1}/${pages.length}`})
            .setColor("#af42d7")

        const row = new ActionRowBuilder<MessageActionRowComponentBuilder>()
            .addComponents(
                [
                    new ButtonBuilder()
                        .setCustomId(`previous-${id}-${page - 1}`)
                        .setLabel("Previous Page")
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(page == 0),
                    new ButtonBuilder()
                        .setCustomId(`next-${id}-${page + 1}`)
                        .setLabel("Next Page")
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(false)
                ]
            )

        interaction.update({ embeds: [embed], components: [row] })
    } else if(interaction.customId.startsWith("next-")) {
        const id = interaction.customId.split("-")[1];
        const page = parseInt(interaction.customId.split("-")[2]);
        const pages = await HelpPages.makePages([], page).then(pages => pages);
        const embed = new EmbedBuilder()
            .setDescription(`🔰 **Bot Commands**\n\n${pages[page].join("\n")}`)
            .setFooter({ text: `Page ${page+1}/${pages.length}`})
            .setColor("#af42d7")

        const row = new ActionRowBuilder<MessageActionRowComponentBuilder>()
            .addComponents(
                [
                    new ButtonBuilder()
                        .setCustomId(`previous-${id}-${page - 1}`)
                        .setLabel("Previous Page")
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(false),
                    new ButtonBuilder()
                        .setCustomId(`next-${id}-${page + 1}`)
                        .setLabel("Next Page")
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(page + 1 == pages.length)
                ]
            )

        interaction.update({ embeds: [embed], components: [row] })

    }
})