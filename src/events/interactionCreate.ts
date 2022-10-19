import { CommandInteractionOptionResolver,
    InteractionType,
    ActionRowBuilder,
    ModalActionRowComponentBuilder,
    TextInputBuilder,
    ModalBuilder,
    TextInputStyle,
    EmbedBuilder,
    MessageActionRowComponentBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType
} from "discord.js";
import { client } from "..";
import { Event } from "../structures/Event";
import { ExtendedInteraction } from "../typings/Command";
import { log } from "../utils/coloredConsole";

export default new Event("interactionCreate", async (interaction) => {
    const user = interaction.user
    
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
                if (!command)
                    return interaction.followUp("`❌` You have used a non existent command!");
        
                command.run({
                    args: interaction.options as CommandInteractionOptionResolver,
                    client,
                    interaction: interaction as ExtendedInteraction
        });
        log("cyan", `client:commandInteraction ${interaction.commandName} [ ${user.id} ]`);
    } else if (interaction.isMessageComponent()) {
        log("cyan", `client:messageComponentInteraction ${interaction.customId} [ ${user.id} ]`);
    } else if (interaction.isModalSubmit()) {
        log("cyan", `client:modalSubmitInteraction ${interaction.customId} [ ${user.id} ]`);
    }

});
