"use client"
import * as React from "react"
import { useEffect} from "react"
import {Controller, useForm} from "react-hook-form"
import styles from "./updateArticle.module.css"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Inter from '../../../fonts'
import useApi from "../../../hooks/useApi"
import navigate from "../../../actions"
import { useToastContext } from "@/context/ToastContext"
import { useArticleContext } from "@/context/ArticleContext"
import Navbar from "@/components/navbar/navbar"

// Consider using https://github.com/dohomi/react-hook-form-mui
type FormData = {
  title: string
  summary: string
  urls: string[]
  status: string
}

const inter = Inter
const updateArticleEndpoint = "http://localhost:3000/api/v1/article"

export default function UpdateArticle({params}: {params: {slug: string}}) {
	// Setup custom useApi hook to fetch data
	const { fetchData, statusCode } = useApi<FormData>(updateArticleEndpoint)
    const onSubmit = async (data: FormData, e?: React.BaseSyntheticEvent) => {
		await fetchData(data, "PUT")
		e?.preventDefault()
    }

	// Set up custom use article context to prepopulate the form with article
	// However, this does not persist upon page refresh
	// Either store in redux or localStorage
	const {article} = useArticleContext().state
	const { handleSubmit, control} = useForm<FormData>({
		defaultValues: {
			title: article?.title,
			summary: article?.summary
		}
	})

	const {setOpen, setMessage} = useToastContext()
	useEffect(()=>{
		if (statusCode === 201) {
			setOpen(true)
			setMessage("Article updated.")
			navigate(`/article/${params.slug}`)
		}
	},[statusCode])

  return (
    <>
	<Navbar/>
    {/* Box component is a building block in MUI v5, serves as a wrapper element to structure and layout my application */}
    <Box
		component="form"
		sx={{
		'& .MuiTextField-root': { m: 1, width: '100ch' },
		}}
		noValidate
		autoComplete="off"
		className={styles.updateArticleForm}
		onSubmit={handleSubmit(onSubmit)}
    >
		<div>
			<div className={`${styles.formTitle} ${inter.className}`}> Update Article</div>
				<div className={styles.formField}>
					<Controller
					name="title"
					control={control}
					render={({field}) => <TextField
						label="Article Title"
						multiline
						rows={1}
						{...field}
						/>
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
				Update Article
			</Button>
		</div>
	</Box>
    </>
  )
}