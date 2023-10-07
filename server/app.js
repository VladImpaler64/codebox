"use strict";

import "dotenv/config"; // This reads our .env info
import {Markup, Telegraf} from "telegraf"; // Helper for Telegram api
import {message} from "telegraf/filters";
import { makePNG, size } from "./helpers/makePNG.js";

const bot = new Telegraf(process.env.BOT_TOKEN) // Using our bot token, read from dotenv.

bot.start((ctx) => ctx.reply('supported commands: \n/editor\n/parseMono ...code')) // For this mini app only one command is needed to start the bot in a private mode

bot.on(message("web_app_data"), async (ctx)=>{ // When we receive a message update containing web_app_data field, we interact with the client this way, it is a simple way but remember the client is closed after the call to Telegram.WebApp.sendData function (client side)

  await ctx.telegram.sendMessage(ctx.chat.id, `<pre><code>${ctx.message.web_app_data.data}</pre></code>`, {parse_mode: "HTML", reply_markup: {remove_keyboard: true}}); // In my demo app this will send the code made with the client editor in the format of html to where the user opened the webapp

});

bot.command('editor', async (ctx) => {
  
  if(ctx.chat.type === "private"){ // We make sure it only sends the web app to private chats
    await bot.telegram.sendMessage(ctx.chat.id, `Hello, ${ctx.chat.first_name}, CODEBOX is a simple code editor for sharing code inside Telegram, enjoy!`, {reply_markup: {keyboard: [[{text: "CODEBOX", web_app: {url: "https://amazing-gumption-7b140b.netlify.app/"}}]], resize_keyboard: true, one_time_keyboard: true, input_field_placeholder: "@codebox_robot ...code"}});
  } else {
    await bot.telegram.sendMessage(ctx.chat.id, "Sorry, can't use this command in a group, try querying the bot, inline-mode, \n`@codebox_bot `", {reply_markup: {remove_keyboard: true}})
  }
});

bot.command('parse', async (ctx) => {

  if(ctx.chat.type === "private"){ // We make sure it only sends the web app to private chats
    let text = ctx.message.text.replace("/parse ", "")
    if (text.length < 5) return;
    // Logic to parse into a png
    await makePNG(ctx, text, size(text));
  } else {
    await bot.telegram.sendMessage(ctx.chat.id, "Sorry, can't use this command in a group, try querying the bot, inline-mode, \n`@codebox_bot `", {reply_markup: {remove_keyboard: true}})
  }
});

// We show the user the default web app
let article_id = 0;
bot.on("inline_query", async (ctx)=>{

  if (ctx.update.inline_query.query === ''){
    return await ctx.answerInlineQuery([], {button: {text: "CODEBOX!, mini app code editor.", web_app: {url: "https://amazing-gumption-7b140b.netlify.app/"}}});
  }

  // Work with the query input back from mini app (Telegram.WebApp.switchInlineQuery method) 
    let text = ctx.update.inline_query.query
    if (text.length === 0) return;
    // Logic to parse into a png
    article_id += 1;
    try {
      await makePNG(ctx, text, size(text), bot.telegram, article_id);
    } catch (err) {
      console.error(err)
    }


});

bot.launch()

console.log("Bot is running! -", new Date());

// To enable graceful stop
process.once('SIGINT', () => {
  // Functions to shutdown services or other kind goes here
  bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
  bot.stop('SIGTERM');
});
