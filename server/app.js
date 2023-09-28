"use strict";

import "dotenv/config"; // This reads our .env info
import {Markup, Telegraf} from "telegraf"; // Helper for Telegram api
import {message} from "telegraf/filters";

const bot = new Telegraf(process.env.BOT_TOKEN) // Using our bot token, read from dotenv.

bot.start((ctx) => ctx.reply('supported commands: /editor')) // For this mini app only one command is needed to start the bot in a private mode

bot.on(message("web_app_data"), async (ctx)=>{ // When we receive a message update containing web_app_data field, we interact with the client this way, it is a simple way but remember the client is closed after the call to Telegram.WebApp.sendData function (client side)
  console.log(ctx.update)
  let data = ctx.webAppData.data?.json(); // getting the information from the update message

  // await ctx.sendMessage(`Thanks for using CODEBOX \u{1F913}, here is your code:`); // We make sure to await this message to be sent before continuing
  await ctx.telegram.sendMessage(Number(data.chat_id), data.code, {parse_mode: "HTML"}); // In my demo app this will send the code made with the client editor in the format of html to where the user opened the webapp
});

bot.command('editor', async (ctx) => {
  
  if(ctx.chat.type === "private"){ // We make sure it only sends the web app to private chats
    await bot.telegram.sendMessage(ctx.chat.id, `Hello, ${ctx.chat.first_name}, CODEBOX is a simple code editor for sharing code inside Telegram, enjoy!`, Markup.keyboard(Markup.button.webApp(`CODEBOX \u{1F913}`, "https://amazing-gumption-7b140b.netlify.app/")).oneTime().resize());
  } else {
    await bot.telegram.sendMessage(ctx.chat.id, "Sorry, can't use this command in a group, try querying the bot, inline-mode, \n`@codebox_bot editor`")
  }
});

// bot.on("message", async (ctx)=>{
//   await ctx.reply("Cleaning...", Markup.removeKeyboard());
//   console.log(ctx.update);
// })

bot.inlineQuery(["editor"], async (ctx)=>{
  /* When the user search for "editor" the bot will serve the web app, we could have other web apps to be served in any chat this way */
  switch (ctx.inlineQuery.query) {
    // case '':
    //   await ctx.answerInlineQuery([], {button: {text: "Try CODEBOX!, a mini app code editor.", web_app: {url: "https://amazing-gumption-7b140b.netlify.app/"}}});
    //   break;
    case "editor":
      
      await ctx.answerInlineQuery([], {button: {text: "Try CODEBOX!, a mini app code editor.", web_app: {url: "https://amazing-gumption-7b140b.netlify.app/"}}});
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
