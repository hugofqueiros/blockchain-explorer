import { Title } from "@/components";
import {
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { Coin } from "@cosmjs/stargate";

import accountStyles from "@/app/dashboard/account/account.module.css";

interface BalanceProps {
    balances: readonly Coin[] | undefined
}

export const Balances = (props: BalanceProps) => (
    <Paper className={accountStyles.tablepaper} elevation={3} sx={{ p: 2 }}>
        <Title>Balances</Title>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Denom</TableCell>
                    <TableCell>Amount</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.balances?.length > 0 ? (
                    props.balances.map((balance, index) => (
                        <TableRow key={index}>
                            <TableCell className={accountStyles.tablecell}>
                                {balance.denom}
                            </TableCell>
                            <TableCell className={accountStyles.tablecell}>
                                {balance.amount}
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell>
                            <Skeleton />
                        </TableCell>
                        <TableCell>
                            <Skeleton />
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </Paper>
);
