import Link from "next/link";
import {
    List,
    Divider,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { CurrencyBitcoin, Foundation } from "@mui/icons-material";

export const Nav = () => (
    <List component="nav">
        <ListItemButton component={Link} href="/dashboard">
            <ListItemIcon>
                <Foundation />
            </ListItemIcon>
            <ListItemText primary="Overview" />
        </ListItemButton>
        <ListItemButton component={Link} href="/dashboard/account">
            <ListItemIcon>
                <CurrencyBitcoin />
            </ListItemIcon>
            <ListItemText primary="account" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
    </List>
);
