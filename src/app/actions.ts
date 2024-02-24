'use server'
import { redirect } from 'next/navigation'

// https://nextjs.org/docs/app/api-reference/functions/redirect#client-component
export default async function navigate(url: string) {
  redirect(url)
}