# CODEBOX - A simple editor to share code inside Telegram
![Captura desde 2023-10-29 10-27-50](https://github.com/VladImpaler64/codebox/assets/115114507/294312c9-b6f6-4119-8faa-8c604b55efee)

I've made this guide for mini apps development in Telegram using React, Vite, Typescript, and Telegraf, all the code is free to use, the purpose is for new developers to join this ecosystem.

My project is divided into a client with Telegram sdk(Software Development Kit) for functionality inside Telegram and the server bot using Telegraf, Nodejs, in every file there are explanations where I found it convinient. For the deveolpment of the client side I use vite + react, vite is popular a bundler for different web stacks, for this project I'm using react and typescript, but you could make it with vanillaJS or other web stacks.

Server side is made with nodejs and telegraf, node is perfect choice for those who already know Js since it's a runtime for the backend, and telegraf is a popular library for developing bots for Telegram bot api, all the stack tech I am using is free, I'll be leaving at the end all links.

## Setting up the project

Before setting up you'll need to have installed [nodeJS](https://nodejs.org/en/download), [git](https://git-scm.com/downloads) and have a code editor of your choice, I use [neovim](https://neovim.io/), by the way.

Step 1 - Cloning repo with git

In a terminal type the command $`git clone https://github.com/VladImpaler64/tg-contest.git` and $`cd tg-contest`

Step 2 - Install dependencies

$`npm install`, wait until installation completes

You now should be able to run $`npm run dev` for a local server running the project, if you have familiarity with the stack open your editor and start making changes to the components folder to see vite rendering in a browser, or make another web app and include it in the server bot.

When you are done, you can pack the web app with command $`npm run build`, this will generate a dist version of your project that can be upload to your CDN(Content Delivery Network), I use [netlify](https://www.netlify.com/) cause it's easy and fast to upload.

## Project overview

The project is an editor to share code inside Telegram in a more suitable way, you can parse to codeblock or send a png image with highligthed code(powered with [hljs](https://highlightjs.org/)) to any chat via inline query event in public groups or /parse command in private chats, also you can upload files to be parsed, or save a file, (at the moment only saves into txt). 

The client has three main react components: 

* Editor
* Menu
* Nav
* Donation(pending)

### Editor
It's a buffer where all input events are registered and the logic to work with the data of the buffer

### Nav
It's a simple navigation bar to open files, save, and configure options(Menu) or quit the mini app

### Menu
The configuration is made here, for setting up font size, color and programmign language

### Donation
This component is an example of integration of Ton blockchain into your mini app, **DO NOT SEND ANY REAL TONCOIN**, the contract is deployed in the [testnet](https://testnet.tonscan.org/) blockchain of Ton, you can follow this [tutorial](https://ton-community.github.io/tutorials/01-wallet/) to understan and test the contract, also if you are interested in a [full contract tutorial](https://www.youtube.com/@AlefmanVladimirEN-xb4pq/videos) check this made by Alefman Vladimir

All of the files have a description to follow the code and understand the flow of the project, once you have familiarity with the code you may want to start a new project yourself.

Server is just one file, app.js and one .env file with you bot token, be sure to have installed the telegraf package with $`npm list`, to run the server input this command $`npm run bot`, for this project the main focus is on the client side so the logic in backend is pretty simple, it consist on one command **/editor** to be run in private chats, and a query for inline mode, blank space.

### Commands for the bot
- editor - This will show a keyboard button to open the mini app
- parse - This command is used to parse the passed argument to a photo with captions
- inline mode - Writtin `@codebox_robot` will open a inline result with the option to open the mini app when query is empty or parse the passed query into a photo, you should not do this by hand, only with the data sent back from the mini app

## Bugs and errors
There is a bug in downloading images, seems web view does not support this feature, I've implemented an alternative way to deliver this functionality with inline query method.

There is also other errors related to line numbers with pasting text in mobile, and with loading a file, I'll try to fix those later.

# Guide on making new project

## Setting up the project using Vite

Vite is a great choice for starting a new project it facilitates the templating and all the project folder structure so the first step is to make one, input this in a terminal `npm create vite@latest`, the program will prompt you to input name of the project, and other configuration like the stack you'll be using, in this case we'll be doing a simple vanillaJs project.

You'll find important to save you project with a vsc(Version Control System) to be certain you have a backup once the project is large enough, for this we'll be using git, so input the command $`git init`, this initialize a local git repository for you to have control over what changes you made.

## Make the logic and components of your application

This part is where you'll finally start making you app, and see live changes with $`npm run dev -- --host` (--host argument is to open it in mobile), remember Telegram has a first mobile approach, so you should start with it.

It's a good practice to save all your changes with a $`git commit` and $`git push` to a remote repository (github) for this to be persistent.

## Compile and ship

After you are done with you mini app just transpile it and bundle with $`npm run build`, this will put all your porject in the dist folder, and you can upload to any CDN, I'm chosing [netlify](https://www.netlify.com/), go test your mini app in a real mini app, first go to @botfather to make a new bot if you haven't one, the make a new webb app and send the url to your mini app, later open it with deep link or with your own bot, start using and testing all functionalities.

## Stack links

- [Vite](https://vitejs.dev/)
- [React](https://es.react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Telegraf](https://telegrafjs.org/)
- [NodeJs](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Netlify](https://www.netlify.com/)
