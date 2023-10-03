import { useEffect, useState } from "react";
import { Address, OpenedContract, toNano } from "ton-core";
import { Donation } from "../../demo-donation/build/Donation/tact_Donation";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function useDonationContract() {
    const {client} = useTonClient()
    const {wallet, sender} = useTonConnect()
    const [balance, setBalance] = useState<string | null>()

    const donationContract = useAsyncInitialize(async()=>{
        if(!client || !wallet) return;

        const contract = Donation.fromAddress(Address.parse("EQBAhgqrQfL8_7i1qrSnJB62eLDoEG4RiFU4hKcGE73bwqbe")); // Your deployed contract address should be here

        return client.open(contract) as OpenedContract<Donation>
    }, [client, wallet])

    useEffect(()=>{
        async function getBalance() {
            if(!donationContract) return 
            setBalance(null)
            const balance = await donationContract.getBalance();
            setBalance(balance)
            await sleep(10000)
            getBalance()
        }

        getBalance()

    }, [donationContract])

    return {
        donationAddress: donationContract?.address.toString(),
        balance: balance,
        sendTon: async (amount: string) => {
            await donationContract.send(
                sender,
                {
                    value: toNano(amount),
                },
                "donation"
            );
        }
    }
}
