import { useState } from "react";

export function Donation(){
	const [count, setCount] = useState(0);
	return (
	<>
		<div className="donation">
			<div>PLEASE SUPPORT MY JOB - DO NOT SEND REAL MONEY, JUST TESTNET</div>
			Donation Contract Example<br />
			<span id="contract">qoj87asdha9sfh9asdfhd</span><br />
			<span>Donation count: {0}</span>
		</div>
	</>
	);
}
