import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, withStyles } from "@material-ui/core";

import SearchInputField from "./SerachInputField";

const StyleButton = withStyles({
    root: {
        borderTop: "2px",
        borderBottom: "2px",
        borderLeft: "0",
        borderRight: "0",
        borderColor: "black",
        background: "white",
        color: "black",
        fontFamily: "NanumSquare, sans-serif",
        fontSize: "18px",
        fontWeight: "bold"
    }

})(Button)

const MenuButtons = () => {
    const [colorSwitch, setColorSwitch] = useState([0, 0, 0, 0, 0]);

    useEffect(() => {
        onClick()
        console.log("버튼 렌더링")
    }, [window.location.pathname])

    const onClick = (idx) => {
        if (idx !== undefined) {
            setColorSwitch(colorSwitch.map((value, index) => {
                return Number(index === idx);
            }))
            return;
        }
        if (window.location.pathname === "/" || window.location.pathname === "/home" || window.location.pathname === "/Home") {
            setColorSwitch([1, 0, 0, 0, 0])
        } else if (window.location.pathname.startsWith("/Streaming") || window.location.pathname.startsWith("/streaming")) {
            setColorSwitch([0, 1, 0, 0, 0])
        } else if (window.location.pathname.startsWith("/Live") || window.location.pathname.startsWith("/live")) {
            setColorSwitch([0, 0, 1, 0, 0])
        } else if (window.location.pathname.startsWith("/Support") || window.location.pathname.startsWith("/support")) {
            setColorSwitch([0, 0, 0, 1, 0])
        } else if (window.location.pathname.startsWith("/Concert") || window.location.pathname.startsWith("/concert")) {
            setColorSwitch([0, 0, 0, 0, 1])
        } else {
            setColorSwitch([0, 0, 0, 0, 0]);
        }
    }

    const buttons = ["Home", "Streaming", "Live", "Support", "Concert"];

// 버튼 컴포넌트 5개 생성
    const buttonList = buttons.map(
        (button, idx) => {
            return (
                <Link style={{ textDecoration: 'none' }} to={'/' + button}>
                    {
                        colorSwitch[idx] === 0 ?
                            <StyleButton
                                style={{ minWidth: "150px", maxWidth: "150px", minHeight: "59px", maxHeight: "59px" }}
                                size="large" variant="contained"
                                onClick={() => onClick(idx)}
                            >
                                {button}
                            </StyleButton>

                            :

                            <StyleButton
                                style={{
                                    minWidth: "150px",
                                    maxWidth: "150px",
                                    minHeight: "59px",
                                    maxHeight: "59px",
                                    borderBottom: "3px solid",
                                    borderBottomColor: "purple"
                                }}
                                size="large" variant="contained"
                                onClick={() => onClick(idx)}
                            >
                                {button}
                            </StyleButton>

                    }
                </Link>
            )
        }
    );

    return (
        <div>
            {buttonList}<SearchInputField/>
        </div>
    )
};

export default MenuButtons;