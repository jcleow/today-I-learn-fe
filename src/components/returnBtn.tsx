import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

interface ReturnBtnProps {
    refUrl: string
}

export default function ReturnBtn({refUrl}: ReturnBtnProps): React.ReactElement{
    console.log(refUrl,'refUrl')
    return (
        <Link href={refUrl} passHref>
            <IconButton aria-label="back">
                <ArrowBackIcon />
            </IconButton>
        </Link>
    )
}