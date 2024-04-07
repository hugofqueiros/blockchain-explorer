const possibleTypes = [
    { msg: '/cosmos.bank.v1beta1.MsgSend', type: 'send'},
    { msg: 'send_to_eth', type: 'send to eth'},
    { msg: '/ibc.applications.transfer.v1.MsgTransfer', type: 'ibc transfer'},
    { msg: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward', type: 'withdraw reward' },
    { msg: '/cosmos.gov.v1beta1.MsgSubmitProposal', type: 'submit proposal' },
    { msg: '/cosmos.gov.v1beta1.MsgVote', type: 'proposal vote' },
    { msg: '/cosmos.bank.v1beta1.MsgMultiSend', type: 'multi send' },
    { msg: 'create_address', type: 'create adress' },
    { msg: 'create_collection', type: 'create collection' },
    { msg: '/cosmwasm.wasm.v1.MsgExecuteContract', type: 'execute contract' },
    { msg: '/cosmos.gov.v1beta1.MsgDeposit', type: 'proposal deposit' },
    { msg: '/cosmos.staking.v1beta1.MsgDelegate', type: 'staking' }
    
]

export const getTxType = (data: string) => {
    for (const obj of possibleTypes) {
        if (data.includes(obj.msg)) {
            return obj.type
        }   
    }

    return '';
}