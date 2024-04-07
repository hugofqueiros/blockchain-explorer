"use client";

import React, { useContext, useEffect, useState } from "react";
import {
    Grid,
} from "@mui/material";
import {
    Coin,
    Account,
    StargateClient,
    IndexedTx,
    Block,
} from "@cosmjs/stargate";
import { Account as AccountComponent, Balances, Transations } from "@/features";
import { ClientContext } from "@/app/dashboard/context";
import { CUDOS_DEFAULT_ADDRESS } from "@/utils/constants";

import dashboardStyles from "../dashboard.module.css";

export default function AccountPage() {
    const client: StargateClient | null = useContext(ClientContext);

    const [balances, setBalances] = useState<readonly Coin[] | undefined>([]);
    const [account, setAccount] = useState<Account | null>();
    const [txSearch, setTxSearch] = useState<IndexedTx[] | null>();
    const [blocksData, setBlocksData] = useState<Block[]>();

    useEffect(() => {
        async function getAllBalances() {
            try {
                const allBalances = await client?.getAllBalances(
                    CUDOS_DEFAULT_ADDRESS
                );
                setBalances(allBalances);
            } catch (err) {
                console.log("Error getting balances");
            }
        }

        async function getAccount() {
            try {
                const accountData = await client?.getAccount(
                    CUDOS_DEFAULT_ADDRESS
                );
                setAccount(accountData);
            } catch (err) {
                console.log("Error getting account data");
            }
        }

        async function getTxSearch() {
            try {
                const txSearchData = await client?.searchTx(
                    `message.sender='${CUDOS_DEFAULT_ADDRESS}'`
                ); // &per_page=2&order_by="desc"
                txSearchData?.sort((a, b) => b.height - a.height);
                setTxSearch(txSearchData);
            } catch (err) {
                console.log("Error getting searchTx data");
            }
        }

        if (client) {
            getAllBalances();
            getAccount();
            getTxSearch();
        }
    }, [client]);

    useEffect(() => {
        async function fetchBlocksData() {
            try {
                const promises: Promise<Block>[] = [];
                for (const tx of txSearch) {
                    promises.push(client.getBlock(tx.height));
                }
                const data = await Promise.all(promises);
                setBlocksData(data);
            } catch (err) {
                console.log("Error fetch blocks data");
            }
        }
        if (txSearch && txSearch?.length > 0) {
            fetchBlocksData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txSearch]);

    return (
        <div className={dashboardStyles.pages}>
            <AccountComponent
                pubkey={account?.pubkey}
                accountNumber={account?.accountNumber}
                sequence={account?.sequence}
            />
            <Grid item xs={12} mb={2}>
                <Balances balances={balances} />
            </Grid>
            <Grid item xs={12} mb={2}>
                <Transations txSearch={txSearch} blocksData={blocksData} /> 
            </Grid>
        </div>
    );
}
