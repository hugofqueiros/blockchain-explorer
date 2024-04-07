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

import accountStyles from "@/app/dashboard/account/account.module.css";
import { getTxType } from "@/utils/logs";
import { formatDistanceToNow } from "date-fns";
import { Block, IndexedTx } from "@cosmjs/stargate";

interface TransationsProps {
    txSearch: IndexedTx[] | null;
    blocksData: Block[];
}

export const Transations = (props: TransationsProps) => (
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
                {props.txSearch?.length > 0 && props.blocksData?.length > 0 ? (
                    props.txSearch.map((data, index) => (
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
                                {`${formatDistanceToNow(
                                    new Date(
                                        props.blocksData[
                                            index
                                        ].header.time
                                    )
                                )} ago`}
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