# DONATION CONTRACT

This project is a simple example on how to make and deploy a contract to the [**Ton blockchain**] in the **testnet** workchain, using [blueprint](https://docs.ton.org/develop/smart-contracts/sdk/javascript), and [TACT lang](https://tact-lang.org/), be sure to read the docs and tutorials provided in those links before continuing.

## PROJECT SETUP

To setup the project make sure you install all dependencies with $`npm install` and start a new contract with $`npm create ton@latest`, after installation and creation you can start making the contract, be sure to have familiarity with contract development, this [video tutorial](https://www.youtube.com/@AlefmanVladimirEN-xb4pq/videos) series might help you.

## PROJECT OVERVIEW

Donation contract consist on two types of message received, one for any one to make a donation, just by sending toncoin to the contract adding the text "donation", any other received message without this word wont be considered a donation, and the other message is a send toncoin abstraction over two variants, a payment and a withdraw.

After compiling it with $`npx blueprint build`, you can test it with $`npx blueprint test` first modify the test folder with the operations you want to test and run the command, when you are satisfied with the test, make deploy with $`npx blueprint run`

## EXTRA RESOURCES

[Ton docs](https://docs.ton.org/)
[Ton tutorials](https://ton-community.github.io/tutorials/01-wallet/)
[Ton testnet scan](https://testnet.tonscan.org/)
