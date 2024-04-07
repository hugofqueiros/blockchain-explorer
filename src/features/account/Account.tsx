import { Box, Typography } from "@mui/material";

import { BasicCard } from "@/components";
import { CUDOS_DEFAULT_ADDRESS } from "@/utils/constants";

interface AccountProps {
    accountNumber: number;
    sequence: number;
    pubkey: {
        type: string;
        value: string;
    };
}

export const Account = ({ accountNumber, sequence, pubkey }: AccountProps) => (
    <Box mb={3}>
        <BasicCard title="Account">
            <div style={{ display: "flex" }}>
                <Typography
                    sx={{ fontWeight: 500, paddingRight: 1 }}
                    gutterBottom
                >
                    Address:
                </Typography>
                <Typography noWrap>{CUDOS_DEFAULT_ADDRESS}</Typography>
            </div>
            <div style={{ display: "flex" }}>
                <Typography
                    sx={{ fontWeight: 500, paddingRight: 1 }}
                    gutterBottom
                >
                    Account Number:
                </Typography>
                <Typography>{accountNumber}</Typography>
            </div>
            <div style={{ display: "flex" }}>
                <Typography
                    sx={{ fontWeight: 500, paddingRight: 1 }}
                    gutterBottom
                >
                    Pub Key:
                </Typography>
                <Typography sx={{ paddingRight: 1 }}>{pubkey?.type}</Typography>
                <Typography>{pubkey?.value}</Typography>
            </div>
            <div style={{ display: "flex" }}>
                <Typography
                    sx={{ fontWeight: 500, paddingRight: 1 }}
                    gutterBottom
                >
                    Sequence:
                </Typography>
                <Typography>{sequence}</Typography>
            </div>
        </BasicCard>
    </Box>
);
