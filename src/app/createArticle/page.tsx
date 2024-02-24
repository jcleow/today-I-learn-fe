"use client"
import * as React from "react"
import {Controller, useForm} from "react-hook-form"
import {extractToken} from "@/lib/helpers.js"
import styles from "./createArticle.module.css"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Inter from '../fonts'

// Consider using https://github.com/dohomi/react-hook-form-mui
type FormData = {
  articleTitle: string
  summary: string
  urls: string[]
}

const inter = Inter

export default function createArticle() {
	const {
		handleSubmit,
		control,
	} = useForm<FormData>({
		defaultValues: {
			articleTitle:"", summary:""
		}
	})

    const onSubmit = async (data: FormData, e?: React.BaseSyntheticEvent) => {
		const token = await extractToken()
		const response = await fetch(
			"http://localhost:3000/api/v1/article",
			{
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${token}`
			},
			method: "POST",
			body: JSON.stringify({
				title: data.articleTitle,
				summary: data.summary,
				urls: data.urls,
			})
			}
		)
		console.log(response,'response');
		e?.preventDefault()
    }

  return (
    <>
    {/* Box component is a building block in MUI v5, serves as a wrapper element to structure and layout my application */}
    <Box
		component="form"
		sx={{
		'& .MuiTextField-root': { m: 1, width: '100ch' },
		}}
		noValidate
		autoComplete="off"
		className={styles.createArticleForm}
		onSubmit={handleSubmit(onSubmit)}
    >
		<div>
			<div className={`${styles.formTitle} ${inter.className}`}> Create a new Article</div>
				<div className={styles.formField}>
					<Controller
					name="articleTitle"
					control={control}
					render={({field}) => <TextField
						label="Article Title"
						multiline
						rows={1}
						{...field}/>
					}
					/>
			</div>
		</div>
		<div className={styles.formField}>
			<Controller
				name="summary"
				control={control}
				render={({field}) => <TextField
				label="Summary"
				multiline
				rows={20}
				{...field}
				/>}
			/>
		</div>
		<div className={styles.formField}>
			<Button variant="contained" type="submit">
				Create Article
			</Button>
		</div>
	</Box>
    </>
  )
}