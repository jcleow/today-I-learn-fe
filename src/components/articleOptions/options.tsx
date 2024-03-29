import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';

interface OptionsProps {
    slug: string
}
export default function Options({slug}: OptionsProps){
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    return(
        <Box>
            <Button onClick={handleClick} sx={{color: "grey"}}>
                <ExpandMoreSharpIcon/>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <Link href={`/article/${slug}/update`} style={{textDecoration: 'none', color: '#000'}}>Edit</Link>
                </MenuItem>
            </Menu>
        </Box>
    )
}
