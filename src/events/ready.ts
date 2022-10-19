import { Event } from "../structures/Event";
import { client } from "../index";
import { ActivityType } from "discord.js";
import { log } from "../utils/coloredConsole";

/*
    * This is the main event file for the bot. It handles all interactions and messages.
    * You can export the Event class and use it to handle events in seperate files.
    * This is the example of an Event class.
*/

export default new Event("ready", () => {
    client.user.setActivity(`/help | ${client.user.tag}`, { type: ActivityType.Playing }); // feel free to remove that and do whatever you want
    log("green", `client:ready Logged in as ${client.user.tag}!`);
});