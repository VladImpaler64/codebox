"use strict";

import "dotenv/config"; // A .env file is needed to store our bot token
import { Telegraf } from "telegraf"; // Helper for Telegram bot api
import { message } from "telegraf/filters";
import { makePNG, size } from "./helpers/makePNG.js";

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {

  console.log("New User: ", ctx.from.id, ctx.from.first_name);
  ctx.reply('supported commands: \n/editor\n/parse ...code\n/cancel'); // "editor" command sends a keyboard button with mini app link, "parse" command parses input text into a png and monospace code
})

bot.on(message("web_app_data"), async (ctx)=>{ // Call to Telegram.WebApp.sendData function (client side) is received in an update with web_app_data field

  // Work with the query input back from mini app (Telegram.WebApp.switchInlineQuery method), this may cause conflict when user manually inputs data
    let text = ctx.message.web_app_data.data;
    article_id += 1;

    // Logic to parse into a png

    try { // Inline queries may fail if user inputs manually the code text, this prevents bot panicking
      await makePNG(ctx, text, size(text), bot.telegram, article_id);
    } catch (err) {
      console.error(err) // Ignore the error since is unpredictable
    }

});

bot.command('editor', async (ctx) => {
  
  if(ctx.chat.type === "private"){ // Make sure it only sends the mini app to private chats
    await bot.telegram.sendMessage(ctx.chat.id, `Hello, ${ctx.chat.first_name}, CODEBOX is a simple code editor for sharing code inside Telegram, enjoy!`, {reply_markup: {keyboard: [[{text: "CODEBOX", web_app: {url: "https://amazing-gumption-7b140b.netlify.app/"}}]], resize_keyboard: true, one_time_keyboard: true, input_field_placeholder: "@codebox_robot ...code"}});
  } else {
    await bot.telegram.sendMessage(ctx.chat.id, "Sorry, can't use this command in a group, try querying the bot, inline-mode, \n`@codebox_bot `", {reply_markup: {remove_keyboard: true}}) // We need to open from a keyboard button or inline mode, to have initData available
  }
});

bot.command('parse', async (ctx) => {

  if(ctx.chat.type === "private"){ // Make sure it only sends the web app to private chats
    let text = ctx.message.text.replace("/parse ", "")
    if (text.length < 5) return;
    // Logic to parse into a png
    await makePNG(ctx, text, size(text));
  } else {
    await bot.telegram.sendMessage(ctx.chat.id, "Sorry, can't use this command in a group, try querying the bot, inline-mode, \n`@codebox_bot `", {reply_markup: {remove_keyboard: true}})
  }
});

bot.command("cancel", async (ctx)=>{
    await bot.telegram.sendMessage(ctx.chat.id, "Cleaning...", {reply_markup: {remove_keyboard: true}});
});

// We show the user the default mini app when query is empty
let article_id = 0;
bot.on("inline_query", async (ctx)=>{

  if (ctx.update.inline_query.query === ''){
    return await ctx.answerInlineQuery([], {button: {text: "CODEBOX!, mini app code editor.", web_app: {url: "https://amazing-gumption-7b140b.netlify.app/"}}});
  }

  // Work with the query input back from mini app (Telegram.WebApp.switchInlineQuery method), this may cause conflict when user manually inputs data
    let text = ctx.update.inline_query.query
    if (text.length === 0) return;
    article_id += 1;

    // Logic to parse into a png

    try { // Inline queries may fail if user inputs manually the code text, this prevents bot panicking
      console.log("User: ", ctx.update.inline_query.from.id, ctx.update.inline_query.from.first_name, ctx.update.inline_query.chat_type) 
      await makePNG(ctx, text, size(text), bot.telegram, article_id);
    } catch (err) {
      console.error(err) // Ignore the error since is unpredictable
    }


});

bot.launch()

console.log("Bot is running! -", new Date());

// To enable graceful stop
process.once('SIGINT', () => {
  // Functions to shutdown services for other kind goes here (Database for example)
  bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
  bot.stop('SIGTERM');
});
