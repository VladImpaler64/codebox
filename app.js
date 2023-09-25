"use strict";

import "dotenv/config"; // This reads our .env info
import {Markup, Telegraf} from "telegraf"; // Helper for Telegram api
import {message} from "telegraf/filters";

const bot = new Telegraf(process.env.BOT_TOKEN) // Using our bot token, read from dotenv.

bot.start((ctx) => ctx.reply('supported commands: /parseApp')) // For this mini app only one command is needed to start the bot in a private mode

bot.on(message("web_app_data"), async (ctx)=>{ // When we receive a message update containing web_app_data field, we interact with the client this way, it is a simple way but remember the client is closed after the call to Telegram.WebApp.sendData function (client side)
  let html = ctx.update.message.web_app_data?.data; // getting the information from the update message

  await ctx.sendMessage(`Thanks for using codebox, here is your code \u{1F913}`); // We make sure to await this message to be sent before continuing
  await ctx.reply(`${html}`, {parse_mode: "HTML", reply_markup: Markup.removeKeyboard(), message_thread_id: ctx.chat.is_forum ? ctx.message.message_thread_id : null}); // In my demo app this will send the code made with the client editor in the format of html to where the user opened the webapp
});

bot.command('parseApp', async (ctx) => {
  
  if(ctx.chat.type === "private"){ // We make sure it only sends the web app to private chats
    await bot.telegram.sendMessage(ctx.chat.id, `Hello, ${ctx.chat.first_name}, CODEBLOX is a simple code editor so you should go out of Telegram to share some code, enjoy!`, Markup.keyboard(Markup.button.webApp("codeblock!!", "https://amazing-gumption-7b140b.netlify.app/")).oneTime().resize());
  } else {
    await bot.telegram.sendMessage(ctx.chat.id, "Sorry, can't use this command in a group, try inline the bot\n`@botname parse`", {reply_markup: Markup.removeKeyboard()})
  }
});

bot.on("message", async (ctx)=>{
  console.log(ctx.update);
})

bot.inlineQuery(["parse"], async (ctx)=>{
  /* When the user search for "parse" the bot will serve the web app, we could have other web apps to be served in any chat this way */
  switch (ctx.inlineQuery.query) {
    case "parse":
      await ctx.answerInlineQuery([],{button: {text: "codebox!!", web_app: {url: "https://amazing-gumption-7b140b.netlify.app/"}}});

      break;

    default:
    // A list of all the web apps of functions of our bot can be put in here by default
      break;
  } 
})

bot.launch()

console.log("Bot is running!");

// To enable graceful stop
process.once('SIGINT', () => {
  // Functions to shutdown services or other kind goes here
  bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
  bot.stop('SIGTERM');
});
