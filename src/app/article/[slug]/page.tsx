"use client"
import {extractToken} from "@/lib/helpers.js"
import React, { useEffect, useState } from "react"
import inter from "../../fonts"
import styles from './article.module.css'
import ReturnBtn from "@/components/returnBtn/returnBtn"
import ArticleOptions from "@/components/articleOptions/options"

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
	const backUrl = "/profile"
	const titleStyles = `${inter.className} ${styles.title}`
	return (
		<>
			<div className={styles.general}>
				<ReturnBtn refUrl={backUrl} />
				<h1 className={titleStyles}>{article?.title}</h1>
				<ArticleOptions/>
				<div className={styles.sub}>{article?.createdAt}</div>
				<div className={styles.sources}>Sources:
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
			</div>
		</>
	)
}

export default function Page({params}: {params: {slug: string}}) {
	const [article, setArticle] = useState()

	useEffect(()=>{
		(async () => {
			const res = await fetchUserArticle(params.slug)
			setArticle(res)
		})()
	},[])

	return (
		<div className={styles.page}>
			<div>
				<Article article={article}/>
			</div>
		</div>
	)
}
