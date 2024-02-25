"use client"
import React, {useContext, createContext, Dispatch, useReducer, ReactNode} from "react"
import Article from "@/app/article/article"


export enum FetchAction {
	FETCH = "fetch",
	SUCCESS = "success",
	ERROR =  "error"
}

interface ArticleAction {
	type: FetchAction
	payload?: Article
	success?: boolean
	error?: string
}

interface IState {
	article?: Article | null
	loading: boolean
	error?: string| null
}

// Good way to debug the type required for useReducer
// https://stackoverflow.com/a/55284031/14564427
export function articleDetailsReducer(state: IState, action: ArticleAction): IState{
	const {type, payload} = action;
	switch(type){
		case FetchAction.FETCH: {
			return {...state}
		}
		case FetchAction.SUCCESS: {
			return {
				...state,
				// article may be undefined because payload might be undefined in ArticleAction
				article: payload
			}
		}
		case FetchAction.ERROR: {
			return {
				...state,
				error: action.error
			}
		}
		default:
			return state
	}
}

export const initialState = {
	article: null,
	loading: false,
	error: null
}

interface ComponentProps {
    children: ReactNode
}

interface ArticleContextProps {
    state: IState
    dispatch: Dispatch<ArticleAction>
}

// How to define dispatch type to undefined first
// https://stackoverflow.com/questions/72281661/type-dispatchany-is-not-assignable-to-type-null-ts2322
const ArticlesContext = createContext<ArticleContextProps>({state: initialState, dispatch: ()=> undefined});

export const ArticleProvider: React.FC<ComponentProps> = ({children}) => {
    const [state, dispatch] = useReducer(articleDetailsReducer, initialState)

    const contextProps = {state: state, dispatch: dispatch}
    return (
        <>
            <ArticlesContext.Provider value={{...contextProps}}>
                {children}
            </ArticlesContext.Provider>
        </>
    )
}

export const useArticleContext = (): ArticleContextProps => {
    const context = useContext(ArticlesContext)

    if (!context){
        throw new Error("useArticleContext must be used within a ArticleProvider!");
    }

    return context;
}