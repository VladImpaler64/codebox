import "@stdlib/deploy";
/* 
	Donation contract for mini app proyect, this is a simple way to get sponsored inside Telegram with toncoin
*/

message SendToncoin { // A single type for payments and withdraw
	amount: Int as coins;
	address: Address;
	payment: Bool;
}


contract Donation with Deployable {
		
	owner: Address; // The owner will have capabilities to withdraw toncoin sent to the contract
	balance: Int as coins; // Every bit in ton blockchain counts, Int is 257 bit integer 

    init(owner: Address) { // This will get executed only once, we need to make unique data and code contract for this to get deployed
        self.owner = owner;
		self.balance = 0;
    }

	receive("donation"){ // When a message with the word donation is sent, we have received some ton, we store it in the balance variable
		self.balance = self.balance + context().value;
	}

	receive(msg: SendToncoin){ // Send to owner or to an specified address as payment
		let ctx: Context = context();
		require(ctx.sender == self.owner, "Invalid sender");

		if(msg.payment == false){

			let value: Int = msg.amount;
			if (value > self.balance){ // Check balance is available or return max
				value = self.balance;
			} 

			send(SendParameters{
				to: self.owner,
				value: value, 
				mode: SendIgnoreErrors, 
				bounce: true, 
				body: "Withdraw completed".asComment()
			});

			self.balance = self.balance - value;

		} else if (msg.payment){
			
			require(msg.amount <= self.balance, "Invalid payment"); // Quantity must be in balance

			send(SendParameters{
				to: msg.address,
				value: msg.amount, 
				mode: SendIgnoreErrors, 
				bounce: true, 
				body: "Payment completed".asComment()
			});

			self.balance = self.balance - msg.amount;
		}
	}

	get fun balance(): String { // To let others know how much toncoin has been donated to the contract
		return self.balance.toCoinsString();
	}
}
