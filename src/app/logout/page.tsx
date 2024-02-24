"use client"
import React, {useEffect} from "react"
import Navbar from "@/components/navbar"
import styles from "./logout.module.css"
import Link from "next/link"

const logoutUser = async () => {
    const response = await fetch(
        "http://localhost:5555/api/logout",
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
        }
    )

    return await response.json()
}

export default function Logout(){
    useEffect(()=>{
        (async()=>{
             await logoutUser()
            }
        )()
    },[])

    return(
        <>
            <Navbar/>
            <div className={styles.logoutMessage}>
                <div>Hate to see you go, but good bye!</div>
                <Link href="/">Return to Home</Link>
            </div>
        </>
    )
}