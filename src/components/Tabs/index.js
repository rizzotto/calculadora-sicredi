import React from 'react'
import {Grid, Tabs as MuiTabs} from "@material-ui/core";


const Tabs = ({ tabsContent, onChange, value }) => {
    const handleChange = (event, newValue) => {
        if (onChange) {
            onChange(newValue)
        }
    };

    return (
        <>
            <Grid
                item
                xs={12}
                style={{ backgroundColor: "#FFFFFF", paddingBottom: 0 }}
            >
                <MuiTabs value={value} onChange={(event, newValue) => handleChange(event, newValue)}>
                    {/* eslint-disable-next-line react/prop-types */}
                    {tabsContent.map((tab) => {
                        return tab
                    })}
                </MuiTabs>
            </Grid>
        </>
    )
}

export default Tabs;

