"use client"
import React, {useEffect, useState} from "react"
import {extractToken} from "@/lib/helpers.js"
import styles from "./styles.module.css"

interface ArticlePreview {
    id: string
    title: string
    summary: string
    urls: string[]
    status: string
    userId: string
    createdAt: string
    updatedAt: string
}

const fetchUserArticles = async () => {
    const token = await extractToken()
    const res = await fetch(
        "http://localhost:3000/api/v1/article",{
            method: "get",
            headers: {
                "Authorization": `Bearer ${token}`
            }

        }
    )
    return await res.json();
}

interface PreviewProps {
    preview: ArticlePreview
}

function ArticlePreview({preview}: PreviewProps){
    const {id, title,status, createdAt} = preview
    if (status != "ACTIVE"){
        return (<></>)
    }
    return (
    <>
        <sub>{createdAt}</sub>
        <h3>
            <a href={`http://localhost:5555/${id}`}>{title}</a>
        </h3>
    </>
    )
}

interface PreviewsProps {
    previews: ArticlePreview[]
}

function ArticlePreviews({previews}: PreviewsProps): React.ReactElement[] {
    return previews.map((preview: ArticlePreview)=>{
        return <ArticlePreview preview={preview} key={preview.id}/>
    })
}

//https://www.reddit.com/r/nextjs/comments/16b6ozn/setting_cookies_in_nextjs_13_do_you_have_fetch_a/
export default function ProfilePage(){
    const [articlePreviews, setArticlePreviews]  = useState([])
    useEffect( () => {
        (async() => {
            const res = await fetchUserArticles()
            setArticlePreviews(res)
        })()
    },[])
    return (
        <div className={styles.profile}>
            <div className={styles.previews}>
                <ArticlePreviews previews={articlePreviews}/>
            </div>
        </div>
    )
}