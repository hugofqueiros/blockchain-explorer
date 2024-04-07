"use client";

import styles from "./dashboard.module.css";

import { connect } from "@/utils/connect";

const connectClient = async () => {
    try {
        const socketClient = await connect();

        if (!socketClient) {
            console.log("ERROR client");
            return;
        }

        console.log("Connect to websocket: ", socketClient);
    } catch (err) {
        console.error("catch error:", err);
        return;
    }
};

export default function DashboardPage() {
    const onClick = async (e) => {
        console.log("clicked");
        e.preventDefault();
        await connectClient();
    };

    return (
        <div className={styles.pages}>
            <button onClick={onClick}>Click to Connect to websocket</button>
        </div>
    );
}
