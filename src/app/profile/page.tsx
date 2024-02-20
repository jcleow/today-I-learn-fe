"use client"
import React, {useEffect, useState} from "react"
import {extractToken} from "@/lib/helpers.js"
import styles from "./styles.module.css"
import Navbar from "../../components/navbar"
import Pagination from '@mui/material/Pagination';

const MAX_ARTICLES_PER_PAGE = 10
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


interface PreviewProps {
    preview: ArticlePreview
}


interface PreviewsProps {
    previews: ArticlePreview[]
}


const fetchUserArticles = async (page: number = 0, itemLimit: number = 10) => {
    const token = await extractToken()
    const res = await fetch(
        `http://localhost:3000/api/v1/article?page=${page}&item_limit=${itemLimit}`,{
            method: "get",
            headers: {
                "Authorization": `Bearer ${token}`
            }

        }
    )
    return await res.json();
}


function ArticlePreview({preview}: PreviewProps){
    const {id, title,status, createdAt} = preview
    if (status != "ACTIVE"){
        return (<></>)
    }
    return (
    <>
        <sub className={styles.subscript}>{createdAt}</sub>
        <h3 className={styles.h3Element}>
            <a className={styles.aElement} href={`http://localhost:5555/article/${id}`}>{title}</a>
        </h3>
    </>
    )
}

function ArticlePreviews({previews}: PreviewsProps): React.ReactElement[] {
    return previews.map((preview: ArticlePreview)=>{
        return <ArticlePreview preview={preview} key={preview.id}/>
    })
}

//https://www.reddit.com/r/nextjs/comments/16b6ozn/setting_cookies_in_nextjs_13_do_you_have_fetch_a/
export default function ProfilePage(){
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(3)
    const [articlePreviews, setArticlePreviews]  = useState([])

    function handleChange(event: React.ChangeEvent<unknown>, value: number){
        setPage(value);
    }

    useEffect( () => {
        (async() => {
            const res = await fetchUserArticles(page - 1)
            setArticlePreviews(res?.articles)
            setMaxPage(Math.ceil(res.count/MAX_ARTICLES_PER_PAGE))
        })()
    },[page])
    return (
        <>
            <Navbar/>
            <div className={styles.profile}>
                <div className={styles.previews}>
                    <ArticlePreviews previews={articlePreviews}/>
                </div>
                <Pagination
                    className={styles.pagination}
                    count={maxPage}
                    boundaryCount={maxPage}
                    page={page}
                    variant="outlined"
                    onChange={handleChange}
                />
            </div>
        </>
    )
}