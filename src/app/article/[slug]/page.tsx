"use client"
import {extractToken} from "@/lib/helpers.js"
import React, { useEffect, useReducer} from "react"
import inter from "../../fonts"
import styles from './article.module.css'
import ReturnBtn from "@/components/returnBtn/returnBtn"
import ArticleOptions from "@/components/articleOptions/options"
import Navbar from "@/components/navbar/navbar"
import Article from "../article"
import { FetchAction, articleDetailsReducer, initialState, useArticleContext } from "@/context/ArticleContext"

const fetchUserArticle = async (slug: string | undefined) => {
	const token = await extractToken()
	try {
		const res = await fetch(`http://localhost:3000/api/v1/article/${slug}`, {
			method: "get",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		const result = await res.json()
		return {data: result, statusCode: res.status }

	} catch(error){
		console.log(error)
		return {}
	}

}

interface ArticleProps{
	article?: Article | null;
	slug: string
}

function Article({article, slug}: ArticleProps): React.ReactElement{
	// https://dribbble.com/shots/22080456-Blog-Experiment
	const paragraphs = article?.summary?.split('\n');
	const backUrl = "/profile"
	const titleStyles = `${inter.className} ${styles.title}`

	return (
		<>
			<div className={styles.general}>
				<ReturnBtn refUrl={backUrl} />
				<h1 className={titleStyles}>{article?.title}</h1>
				<ArticleOptions slug={slug}/>
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
	const {state, dispatch} = useArticleContext()
	const {article} = state;

	useEffect(() => {
		dispatch({type: FetchAction.FETCH});
		(async () => {
			const res = await fetchUserArticle(params.slug);
			if (res.statusCode == 200){
				dispatch({type: FetchAction.SUCCESS, payload: res.data})
				return;
			}
		})()
	}, [])


	return (
		<>
			<Navbar/>
				<div className={styles.page}>
					<div>
						<Article article={article} slug={params.slug}/>
					</div>
				</div>
		</>
	)
}