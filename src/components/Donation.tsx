import { useState } from "react";
import { TonConnectButton } from '@tonconnect/ui-react';

export function Donation(){
	const [count, setCount] = useState(69);
	return (
	<>
		<div className="donation">
			<div><div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "1rem", padding: "0 0.5rem"}}>DONNATION CONTRACT EXAMPLE - DO NOT SEND REAL $TON<TonConnectButton /></div><span style={{color: "red", display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center", justifyContent: "center"}}>---TESTNET MODE---</span></div>
			Donation Contract Example<br />
			<span id="contract">qoj87ajdfa9uhfa9fhsdha9sfh9asdfhd</span><br />
			<span>Donation count: <b>{count}</b> $TON</span>
		</div>
	</>
	);
}
