import { CHAIN, TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from "../hooks/useTonConnect";
import { useDonationContract } from "../hooks/useDonationContract";

export function Donation(){
	const {network, connected} = useTonConnect();
	const {donationAddress, balance, sendTon} = useDonationContract(); // Init the contract when we render this component

	// Event handlers
	function sendDonation(){ // Send donation to contract
	 	let toncoin = document.querySelector("#toncoin") as HTMLInputElement;
		sendTon(toncoin.value as string);
	}

	return (
	<>
		<div className="donation">
			<div><div style={{display: "flex", fontSize: "1.2rem", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "1rem", padding: "0 0.5rem"}}>SUPPORT MY WORK! &#128513;<TonConnectButton /></div><span style={{color: "red", display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center", justifyContent: "center"}}>-- {network ? network === CHAIN.TESTNET ? "Testnet mode" : "\u{26a0} CHANGE TO TESTNET MODE \u{26a0}" : "Disconnected"} --</span></div>Donation Contract Address (TESTNET)<br />
			<span id="contract">{donationAddress ? donationAddress : "..."}</span><br />
			<span>Donation count: <b>{balance ? balance : "..."}</b> $TON</span><br />
			{connected ? <div style={{display: "flex", justifyContent: "center", gap: "4px", alignItems: "center"}}>$<input id="toncoin" style={{width: "3rem"}} type="number" defaultValue={0.5} min={0.2} step={0.1}></input><button style={{width: "5rem"}} onClick={sendDonation}>Donate</button></div> : null}
		</div>
	</>
	);
}
