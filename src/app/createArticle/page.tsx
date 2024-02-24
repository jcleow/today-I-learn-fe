"use client"
import * as React from "react"
import {Controller, useForm} from "react-hook-form"
import styles from "./createArticle.module.css"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Inter from '../fonts'

// Consider using https://github.com/dohomi/react-hook-form-mui
type FormData = {
  articleTitle: string
  summary: string
}

export default function createArticle() {
  const inter = Inter

  const {
    handleSubmit,
    control,
  } = useForm<FormData>({defaultValues:
    {
      articleTitle:"", summary:""
    }
    })
  const onSubmit = handleSubmit((data) => console.log(data))

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
      onSubmit={onSubmit}
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
        {/* <label>Summary</label> */}
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
      <Button variant="contained" type="submit" onClick={()=>{
        handleSubmit((data) => console.log(data))
      }}> Create Article</Button>
      </div>
      </Box>
    </>
  )
}