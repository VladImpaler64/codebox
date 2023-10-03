import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Address, toNano } from 'ton-core';
import { Donation } from '../wrappers/Donation';
import '@ton-community/test-utils';

describe('Donation', () => {
    let blockchain: Blockchain;
    let donation: SandboxContract<Donation>;
    let deployer: any;

    beforeEach(async () => { // Prepare contract for testing
        blockchain = await Blockchain.create();

        donation = blockchain.openContract(await Donation.fromInit(Address.parse("kQDslgutaPdwNcYinaG6vmO1sn6oqnzcNpSV9EUNoqpxpvP7"))); // The contract is initialized with an owner address

        deployer = await blockchain.treasury('deployer');

        const deployResult = await donation.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: donation.address,
            deploy: true,
            success: true,
        });

        await donation.send(
            deployer.getSender(),
            {
                value: toNano('1.5'),
            },
            "donation"
        );

        const count = await donation.getBalance();
        console.log("count is:", count)

        expect(count).toBe("1.5");
        
        await donation.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: "SendToncoin",
                amount: toNano('1'),
                address: Address.parse("kQDslgutaPdwNcYinaG6vmO1sn6oqnzcNpSV9EUNoqpxpvP7"),
                payment: false
            }
        );

        const withdraw = await donation.getBalance();
        console.log("withdraw made, balance is:", withdraw)

        expect(withdraw).toBe("0.5");

        await donation.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: "SendToncoin",
                amount: toNano('0.5'),
                address: Address.parse("kQDslgutaPdwNcYinaG6vmO1sn6oqnzcNpSV9EUNoqpxpvP7"),
                payment: true
            }
        );

        const payment = await donation.getBalance();
        console.log("payment made, balance is:", payment)

        expect(payment).toBe("0");

    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and donation are ready to use
    });
});
