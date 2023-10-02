import { toNano } from 'ton-core';
import { Donation } from '../wrappers/Donation';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const donation = provider.open(await Donation.fromInit());

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
}
