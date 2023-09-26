# CODEBOX - A simple code editor to share code inside Telegram

I've made this guide to work with web apps in Telegram using React, Vite, Typescript, and Telegraf in the development of this mini app, all the code is free to use, the purpose is for new developers to join this ecosystem!

My project is divided into a client with Telegram sdk(Software Development Kit) for Telegram functionality and the server bot using Telegraf, Nodejs, in every file there are explanations where I found it convinient. For the deveolpment of the client side I use vite + react, vite is popular a bundler for different web stacks, for this project I'm using react and typescript, but you could make it with vanillaJS or other web stacks.

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

Server is just one file, app.js and one .env file with you bot token, be sure to have installed the telegraf package with $`npm list`, to run the server input this command $`npm run bot`, for this project the main focus is on the client side so the logic in backend is pretty simple, it consist on one command **/editor** to be run in private chats, and a query for inline mode **editor**

# Guide on making new project

## Setting up the project using Vite

Vite is a great choice for starting a new project it facilitates the templating and all the project folder structure so the first step is to make one, input this in a terminal `npm create vite@latest`, the program will prompt you to input name of the project, and other configuration like the stack you'll be using, in this case we'll be doing a simple vanillaJs project.

You'll find important to save you project with a vsc(Version Control System) to be certain you have a backup once the project is large enough, for this we'll be using git, so input the command $`git init`, this initialize a local git repository for you to have control over what changes you made.



## Stack links

- [Vite](https://vitejs.dev/)
- [React](https://es.react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Telegraf](https://telegrafjs.org/)
- [NodeJs](https://nodejs.org/)
- [Git](https://git-scm.com/)
