"use client";

import { useContext, useEffect, useState } from "react";
import { StargateClient } from "@cosmjs/stargate";
import {createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Toolbar,
    Typography,
    Divider,
    Box,
    CssBaseline,
    IconButton,
    Container,
} from "@mui/material";
import { Menu, ChevronLeft, Podcasts } from "@mui/icons-material";

import { Drawer } from "./Drawer";
import { AppBar } from "./AppBar";
import { Nav } from "./Nav";
import { ClientContext } from "@/app/dashboard/context";

const defaultTheme = createTheme();

export const Dashboard = ({ children }: { children: React.ReactNode }) => {
    const client: StargateClient | null = useContext(ClientContext);
    
    const [open, setOpen] = useState(true);
    const [chainId, setChainId] = useState();
    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        async function getChainId() {
            try {
                const clientChainId = await client.getChainId();
                setChainId(clientChainId);
            } catch (err) {
                console.log('ERROR getting chainId');
            }
        }

        if (client) {
            getChainId();
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: "24px", // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: "36px",
                                ...(open && { display: "none" }),
                            }}
                        >
                            <Menu />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Dashboard
                        </Typography>
                        <Typography noWrap>
                            ChainId: {chainId} 
                        </Typography>
                        <IconButton color={chainId ? "success" : "error"} sx={{bgcolor: 'background.paper'}}>
                            <Podcasts/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeft />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <Nav />
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        paddingTop: "64px",
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        {children}
                    </Container>    
                </Box>
            </Box>
        </ThemeProvider>
    );
}
