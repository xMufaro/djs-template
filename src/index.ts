import dotenv from "dotenv";
dotenv.config();
import { ExtendedClient } from "./structures/Client";
import { log } from "./utils/coloredConsole";

export const client = new ExtendedClient();
global.client = client;


async function main() {
    client.start();
    // feel free to add anything here
}

main();

client.on('error', (error) => {
    console.log(error);
})

