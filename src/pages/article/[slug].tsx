"use client"
import { useRouter } from "next/router"
import {extractToken} from "@/lib/helpers.js"
import React, { useEffect, useState } from "react"
import { Inter } from 'next/font/google'
import styles from './article.module.css'
import ReturnBtn from "@/components/returnBtn"

// Font
export const inter = Inter({
    weight: "300",
    subsets: ['latin'],
    display: 'swap',
})

const fetchUserArticle = async (slug: string | undefined) => {
	const token = await extractToken()
	const res = await fetch(`http://localhost:3000/api/v1/article/${slug}`, {
		method: "get",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	const result = await res.json()
	return result
}

interface ArticleProps{
	article?: Article;
}

interface Article {
	id: string
	title: string
	summary: string
	urls: string[]
	userId: string
	createdAt: string
	createdAtTs: number
	updatedAt: string
	updatedAtTs: number
}

function Article({article}: ArticleProps): React.ReactElement{
	// https://dribbble.com/shots/22080456-Blog-Experiment
	const paragraphs = article?.summary?.split('\n');

	return (
		<>
			<h1 className={inter.className}>{article?.title}</h1>
			<div className={styles.sub}>{article?.createdAt}</div>
			<div>Sources:
				{
				article?.urls && article?.urls.map((url)=>
					<li key={url}>
						{url}
					</li>
					)
				}
			</div>
			<br/>
			<div className={styles['article-paragraph']}>
			{paragraphs && paragraphs.map((paragraph, index)=>(
				<p key={index}>{paragraph}</p>
			))}
			</div>
		</>
	)
}

export default function Page() {
	const [article, setArticle] = useState()
	const router = useRouter()
	const backUrl = "/profile"

	useEffect(()=>{
		(async () => {
			const slug = router.query.slug?.toString()
			if (!slug){
				return
			}

			const res = await fetchUserArticle(slug)
			setArticle(res)
		})()
	},[router.query.slug])

	return (
		<div className={styles.page}>
			<div className={styles.returnBtn}>
				<ReturnBtn refUrl={backUrl} />
			</div>
			<div>
				<Article article={article}/>
			</div>
		</div>
	)
}
