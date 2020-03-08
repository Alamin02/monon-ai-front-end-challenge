import React from "react";
import { Typography } from "antd";

function NotFound({ info = "404: Page not found" }) {
    return (
        <Typography.Title>
            {info}
        </Typography.Title>
    )
}

export default NotFound;