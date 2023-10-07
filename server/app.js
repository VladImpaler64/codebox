"use strict";

import "dotenv/config"; // This reads our .env info
import {Markup, Telegraf} from "telegraf"; // Helper for Telegram api
import {message} from "telegraf/filters";

const bot = new Telegraf(process.env.BOT_TOKEN) // Using our bot token, read from dotenv.

bot.start((ctx) => ctx.reply('supported commands: /editor')) // For this mini app only one command is needed to start the bot in a private mode

bot.on("message", async (ctx)=>{
  
  await ctx.deleteMessage(ctx.message.message_id);
  await ctx.telegram.sendMessage(ctx.chat.id, `<pre><code>fn main</code></pre>`, {parse_mode: "HTML"}); // In my demo app this will send the code made with the client editor in the format of html to where the user opened the webapp
})

bot.on(message("web_app_data"), async (ctx)=>{ // When we receive a message update containing web_app_data field, we interact with the client this way, it is a simple way but remember the client is closed after the call to Telegram.WebApp.sendData function (client side)

  await ctx.telegram.sendMessage(ctx.chat.id, `<pre><code>${ctx.message.web_app_data.data}</pre></code>`, {parse_mode: "HTML"}); // In my demo app this will send the code made with the client editor in the format of html to where the user opened the webapp

});

bot.command('editor', async (ctx) => {
  
  if(ctx.chat.type === "private"){ // We make sure it only sends the web app to private chats
    await bot.telegram.sendMessage(ctx.chat.id, `Hello, ${ctx.chat.first_name}, CODEBOX is a simple code editor for sharing code inside Telegram, enjoy!`, Markup.keyboard(Markup.button.webApp(`CODEBOX \u{1F913}`, "https://amazing-gumption-7b140b.netlify.app/")).oneTime().resize());
  } else {
    await bot.telegram.sendMessage(ctx.chat.id, "Sorry, can't use this command in a group, try querying the bot, inline-mode, \n`@codebox_bot `")
  }
});

// We show the user the default web app
let article_id = 0;
bot.on("inline_query", async (ctx)=>{
  console.log(ctx.update.inline_query.query) 

  if (ctx.update.inline_query.query === ''){
    await ctx.answerInlineQuery([], {button: {text: "Try CODEBOX!, a mini app code editor.", web_app: {url: "https://amazing-gumption-7b140b.netlify.app/"}}});
  }

  // Work with the query input back from mini app (Telegram.WebApp.switchInlineQuery method) 
  await ctx.answerInlineQuery([{type: "article", id: article_id, title: "Share monospace code", input_message_content: {message_text: `<pre><code>${ctx.update.inline_query.query}</code></pre>`, parse_mode: "HTML"}}]); 
  article_id += 1;
});

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
