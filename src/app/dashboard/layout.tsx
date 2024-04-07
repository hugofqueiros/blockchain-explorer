"use client"

import { useEffect, useState } from "react";
import { StargateClient } from "@cosmjs/stargate";

import { Dashboard } from "@/features";
import { RPC_ENDPOINT } from "@/utils/constants";
import { ClientContext } from "./context";


export default function Layout({ children }: { children: React.ReactNode }) {
    const [client, setClient] = useState<StargateClient>();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        if (!client) {
            connectStargate();
            setIsLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoading]);

    const connectStargate = async () => {
        try {
            const stargateClient: StargateClient = await StargateClient.connect(
                RPC_ENDPOINT
            );
            setClient(stargateClient);
            console.log("Stargate client connected to: ", await stargateClient.getChainId());
        } catch (error) {
            console.error("Error connecting to Stargate:", error);
        }
    };

    return (
        <ClientContext.Provider value={client}>
            <Dashboard>
                {children}
            </Dashboard >
        </ClientContext.Provider>

    )
}
