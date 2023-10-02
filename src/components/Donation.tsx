import { useState } from "react";

export function Donation(){
	const [count, setCount] = useState(69);
	return (
	<>
		<div className="donation">
			<div>DONNATION CONTRACT EXAMPLE - DO NOT SEND REAL $TON <br /><span style={{color: "red"}}>---TESTNET MODE---</span></div>
			Donation Contract Example<br />
			<span id="contract">qoj87asdha9sfh9asdfhd</span><br />
			<span>Donation count: <b>{count}</b> $TON</span>
		</div>
	</>
	);
}
