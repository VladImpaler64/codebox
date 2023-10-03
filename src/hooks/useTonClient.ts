import { getHttpEndpoint } from "@orbs-network/ton-access";
import { CHAIN } from "@tonconnect/ui-react";
import { TonClient } from "ton";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";

export function useTonClient() {
    const {network} = useTonConnect()

    return {
        client: useAsyncInitialize(async ()=>{
            return new TonClient({
                endpoint: await getHttpEndpoint({
                    network: network === CHAIN.TESTNET ? "testnet" : "mainnet" // The contract is only testnet
                })
            })
        }, [network])
    }
}
