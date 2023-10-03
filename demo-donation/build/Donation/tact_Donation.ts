import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type SendToncoin = {
    $$type: 'SendToncoin';
    amount: bigint;
    address: Address;
    payment: boolean;
}

export function storeSendToncoin(src: SendToncoin) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(704704673, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.address);
        b_0.storeBit(src.payment);
    };
}

export function loadSendToncoin(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 704704673) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _address = sc_0.loadAddress();
    let _payment = sc_0.loadBit();
    return { $$type: 'SendToncoin' as const, amount: _amount, address: _address, payment: _payment };
}

function loadTupleSendToncoin(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _address = source.readAddress();
    let _payment = source.readBoolean();
    return { $$type: 'SendToncoin' as const, amount: _amount, address: _address, payment: _payment };
}

function storeTupleSendToncoin(source: SendToncoin) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.address);
    builder.writeBoolean(source.payment);
    return builder.build();
}

function dictValueParserSendToncoin(): DictionaryValue<SendToncoin> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendToncoin(src)).endCell());
        },
        parse: (src) => {
            return loadSendToncoin(src.loadRef().beginParse());
        }
    }
}

 type Donation_init_args = {
    $$type: 'Donation_init_args';
    owner: Address;
}

function initDonation_init_args(src: Donation_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function Donation_init(owner: Address) {
    const __code = Cell.fromBase64('te6ccgECFwEABDEAART/APSkE/S88sgLAQIBYgIDAtbQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4ILI+EMBzH8BygBZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AsntVBEEAgFYDQ4DtO2i7fsBkjB/4HAh10nCH5UwINcLH94gghAqAPChuuMCIIIQlGqYtrqOqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gwACRMOMNcAUGBwPUMNMfAYIQKgDwobry4IH6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gBVIGwT+EFvJBAjXwMlgRFNAscF8vQgwACPG48WgUyOUyO78vRyf4gkVSAUQzBtbds8oZFb4uMNfwgLCQE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwLAGT5AYLw7WIGEWPxnkInBnXNObZk23TlrbtF7OsEcW8pI0G2Eou6m/hBbyQTXwOgf9sx4AAqAAAAAFBheW1lbnQgY29tcGxldGVkAjBbUwG8kjAg3nJ/iCVRNEEzFEMwbW3bPKEKCwAsAAAAAFdpdGhkcmF3IGNvbXBsZXRlZAHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAMAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAgEgDxACAUgVFgIRttgbZ5tnjYQwERIAlbd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4TsunLVmnZbmdB0s2yjN0UkAHA7UTQ1AH4Y9IAAY4l+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6AFlsEuD4KNcLCoMJuvLgifpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0ds8EwEIIHnbPBQAAnAA2iDBASHCTbHy0IbIIsEAmIAtAcsHAqMC3n9wbwAEjhsEeqkMIMAAUjCws5twM6YwFG+MBKQEA5Ew4gTkAbOXAoAub4wCpN6OEAN6qQymMBNvjAOkIsAAEDTmMyKlA5pTEm+BAcsHAqUC5GwhydAAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtZUVmcldDOVZKSnl5dzFvOEZDTDVrN0dDMThjU2dnYnVjdGdudUxUOW9RYnqCA=');
    const __system = Cell.fromBase64('te6cckECGQEABDsAAQHAAQEFoW71AgEU/wD0pBP0vPLICwMCAWINBAIBWAgFAgFIBwYAdbJu40NWlwZnM6Ly9RbWVFZnJXQzlWSkp5eXcxbzhGQ0w1azdHQzE4Y1NnZ2J1Y3RnbnVMVDlvUWJ6ggABGwr7tRNDSAAGACASAKCQCVt3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwThOy6ctWadluZ0HSzbKM3RSQAhG22Btnm2eNhDAXCwEIIHnbPAwA2iDBASHCTbHy0IbIIsEAmIAtAcsHAqMC3n9wbwAEjhsEeqkMIMAAUjCws5twM6YwFG+MBKQEA5Ew4gTkAbOXAoAub4wCpN6OEAN6qQymMBNvjAOkIsAAEDTmMyKlA5pTEm+BAcsHAqUC5GwhydAC1tAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPFrbPPLggsj4QwHMfwHKAFlZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCye1UFw4DtO2i7fsBkjB/4HAh10nCH5UwINcLH94gghAqAPChuuMCIIIQlGqYtrqOqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gwACRMOMNcBEQDwBk+QGC8O1iBhFj8Z5CJwZ1zTm2ZNt05a27RezrBHFvKSNBthKLupv4QW8kE18DoH/bMeABOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8FAPUMNMfAYIQKgDwobry4IH6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gBVIGwT+EFvJBAjXwMlgRFNAscF8vQgwACPG48WgUyOUyO78vRyf4gkVSAUQzBtbds8oZFb4uMNfxYUEgIwW1MBvJIwIN5yf4glUTRBMxRDMG1t2zyhExQALAAAAABXaXRoZHJhdyBjb21wbGV0ZWQByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAFQCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAAqAAAAAFBheW1lbnQgY29tcGxldGVkAcDtRNDUAfhj0gABjiX6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfoAWWwS4Pgo1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHR2zwYAAJwHO+toQ==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initDonation_init_args({ $$type: 'Donation_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Donation_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
    19598: { message: `Invalid payment` },
}

const Donation_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SendToncoin","header":704704673,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"payment","type":{"kind":"simple","type":"bool","optional":false}}]},
]

const Donation_getters: ABIGetter[] = [
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
]

const Donation_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"donation"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SendToncoin"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Donation implements Contract {
    
    static async init(owner: Address) {
        return await Donation_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await Donation_init(owner);
        const address = contractAddress(0, init);
        return new Donation(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Donation(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Donation_types,
        getters: Donation_getters,
        receivers: Donation_receivers,
        errors: Donation_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'donation' | SendToncoin | Deploy) {
        
        let body: Cell | null = null;
        if (message === 'donation') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SendToncoin') {
            body = beginCell().store(storeSendToncoin(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
}