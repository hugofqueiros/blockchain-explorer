"use client";

import React, { useContext, useEffect, useState } from "react";
import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import {
    Coin,
    Account,
    StargateClient,
    IndexedTx,
    Block,
    logs,
} from "@cosmjs/stargate";
import { formatDistanceToNow } from "date-fns";

import { Title } from "@/components";
import { Account as AccountComponent } from "@/features";
import { ClientContext } from "@/app/dashboard/layout";
import { CUDOS_DEFAULT_ADDRESS } from "@/utils/constants";
import { getTxType } from "@/utils/logs";

import dashboardStyles from "../dashboard.module.css";
import accountStyles from "./account.module.css";

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
                // console.log("Balances: ", allBalances);
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
                // console.log("Acount: ", accountData);
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

                txSearchData.sort((a, b) => b.height - a.height);
                console.log("txSearchData: ", txSearchData);
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
                console.log("Blocks Data: ", data);

                setBlocksData(data);
            } catch (err) {
                console.log("Error fetch blocks data");
            }
        }
        if (txSearch && txSearch?.length > 0) {
            fetchBlocksData();
        }
    }, [txSearch]);

    return (
        <div className={dashboardStyles.pages}>
            <AccountComponent
                pubkey={account?.pubkey}
                accountNumber={account?.accountNumber}
                sequence={account?.sequence}
            />
            <Grid item xs={12} mb={2}>
                <Paper
                    className={accountStyles.tablepaper}
                    elevation={3}
                    sx={{ p: 2 }}
                >
                    <Title>Balances</Title>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Denom</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {balances &&
                                balances.map((balance, index) => (
                                    <TableRow key={index}>
                                        <TableCell
                                            className={accountStyles.tablecell}
                                        >
                                            {balance.denom}
                                        </TableCell>
                                        <TableCell
                                            className={accountStyles.tablecell}
                                        >
                                            {balance.amount}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <Grid item xs={12} mb={2}>
                <Paper
                    className={accountStyles.tablepaper}
                    elevation={3}
                    sx={{ p: 2 }}
                >
                    <Title>Transations</Title>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Hash</TableCell>
                                <TableCell>Message Type</TableCell>
                                <TableCell>Height</TableCell>
                                <TableCell>Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {txSearch?.length > 0 && blocksData?.length > 0 &&
                                txSearch.map((data, index) => (
                                    <TableRow key={index}>
                                        <TableCell
                                            className={accountStyles.tablecell}
                                        >
                                            {data.hash}
                                        </TableCell>
                                        <TableCell
                                            className={accountStyles.tablecell}
                                        >
                                            {getTxType(data.rawLog)}
                                        </TableCell>
                                        <TableCell
                                            className={accountStyles.tablecell}
                                        >
                                            {data.height}
                                        </TableCell>
                                        <TableCell
                                            className={accountStyles.tablecell}
                                        >
                                            {`${formatDistanceToNow(new Date(blocksData[index].header.time))} ago`}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </div>
    );
}
