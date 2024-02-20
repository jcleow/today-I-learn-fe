import { Spin as Hamburger } from "hamburger-react"
import Link from "next/link";
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styles from './navbar.module.css'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { MenuList } from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

	return (
        <div className={styles.navbar}>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{color: "#C9C3BB" }}
            >
                <Hamburger toggled={open} />
            </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                    sx={{width: 320, maxWidth: '100%'}}
                    slotProps={{
                        paper:{
                            style:{
                                width: '150px',
                                maxHeight: '100%'
                            }
                        }
                    }}
                >
                <MenuList>
                    <MenuItem onClick={handleClose}>
                            <ListItemIcon><HomeRoundedIcon fontSize="small"/></ListItemIcon>
                            <Link href="/" style={{textDecoration: 'none', color: '#000'}}>
                                <ListItemText>Home</ListItemText>
                            </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon><Person2RoundedIcon fontSize="small"/></ListItemIcon>
                            <Link href="/profile" style={{textDecoration: 'none', color: '#000'}}>Profile </Link>
                        </MenuItem>
                    <MenuItem>
                        <ListItemIcon><LogoutRoundedIcon fontSize="small"/></ListItemIcon>
                        <Link href="/logout" style={{textDecoration: 'none', color: '#000'}}>Logout</Link>
                    </MenuItem>
                </MenuList>
                </Menu>
        </div>
	)
}