import { Card, CardContent, Typography } from "@mui/material";

import { Title } from "./Title";

interface BasicCardProps {
    minWidth?: number
    title: string
    children?: React.ReactNode
}

export const BasicCard = ({ minWidth = 275, title, children}: BasicCardProps) => (
    <Card sx={{ minWidth }}>
        <CardContent>
            <Title>
                {title}
            </Title>
            {children}
        </CardContent>
    </Card>
);
