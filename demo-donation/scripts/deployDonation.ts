import { Address, toNano } from 'ton-core';
import { Donation } from '../wrappers/Donation';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const donation = provider.open(await Donation.fromInit(Address.parse("kQDslgutaPdwNcYinaG6vmO1sn6oqnzcNpSV9EUNoqpxpvP7")));

    await donation.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(donation.address);

    // run methods on `donation`
    // EQBAhgqrQfL8_7i1qrSnJB62eLDoEG4RiFU4hKcGE73bwqbe - Contract address
}
