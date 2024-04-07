import Typography from "@mui/material/Typography";

interface TitleProps {
    children?: React.ReactNode;
}

export const Title = (props: TitleProps) => (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {props.children}
    </Typography>
);
