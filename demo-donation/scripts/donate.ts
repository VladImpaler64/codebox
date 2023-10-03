import { Address, toNano } from 'ton-core';
import { Donation } from '../wrappers/Donation';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const donation = provider.open(await Donation.fromInit(Address.parse("kQDslgutaPdwNcYinaG6vmO1sn6oqnzcNpSV9EUNoqpxpvP7")));
    // run methods on `donation`
    // EQBAhgqrQfL8_7i1qrSnJB62eLDoEG4RiFU4hKcGE73bwqbe - Contract address

    // await donation.send(
    //     provider.sender(),
    //     {
    //         value: toNano('3'),
    //     },
    //     "donation"
    // );

    // const balance = await donation.getBalance();
    // console.log("current balance is: ", balance);


    await donation.send(
        provider.sender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: "SendToncoin",
            address: Address.parse("kQDslgutaPdwNcYinaG6vmO1sn6oqnzcNpSV9EUNoqpxpvP7"),
            amount: toNano("1.5"),
            payment: false,
        }
    );
}
