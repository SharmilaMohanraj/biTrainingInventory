import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
const PAGES = ["Profile", "About Us", "Contact Us"];
const DrawerComponent = (props: any) => {
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <Drawer open={open} onClose={() => setOpen(false)}>
                <List>
                    {
                        PAGES.map((page, index) => (
                            <ListItemButton onClick={() => setOpen(false)} key={index}>
                                <ListItemIcon>
                                    <ListItemText>
                                        {page}
                                    </ListItemText>
                                </ListItemIcon>
                            </ListItemButton>
                        ))
                    }
                </List>
            </Drawer>
            <IconButton sx={{ color: 'white'}} onClick={() => setOpen(!open)}>
                <MenuIcon/>
            </IconButton>
        </React.Fragment>
    )
}
export default DrawerComponent;