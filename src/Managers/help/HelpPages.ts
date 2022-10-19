import axios from "axios";
import { client } from "../../index";

export class HelpPages {

    public static async makePages(deprecated: String[]=[], at: Number=0) {
        const data = [];

        await axios.get(`https://discord.com/api/v9/applications/${client.user?.id}/guilds/${process.env.guildId}/commands`, { // feel free to change this to global commands API link
            headers: {
                Authorization: `Bot ${process.env.CLIENT_TOKEN}`
            }
        }).then(async (res: any) => {
            for(const command of res.data) {
                data.push(`> </${command.name}:${command.id}> - ${command.description}`)
            }
        })
        const pages = [];
        let counter = 0;
        let page=0;

        for(const command of data) {
            if(counter == 0) {
                pages.push([]);
            }

            pages[page].push(command);
            counter++;

            if(counter == 10) {
                counter = 0;
                page++;
            }
        }

        return pages;
    }
}