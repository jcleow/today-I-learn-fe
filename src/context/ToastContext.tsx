"use client"
import React, { useContext,useState, createContext, ReactNode } from 'react';
import Toast from '@/components/Toast/toast';

interface ContextProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    message: string
    setMessage: React.Dispatch<React.SetStateAction<string>>
}

interface ComponentProps {
    children: ReactNode
}

const ToastContext = createContext<ContextProps| undefined>(undefined);

export const ToastProvider: React.FC<ComponentProps> = ({children}) => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")

    const contextProps = {open, setOpen, message, setMessage}
    return (
        <>
        <ToastContext.Provider value={{...contextProps}}>
            {children}
        </ToastContext.Provider>
        <Toast
            open={open}
            setOpen={setOpen}
            autoHideDuration={3000}
            message={message}
        />
        </>
    )
}

//https://stackoverflow.com/a/66331283/14564427
export const useToastContext = (): ContextProps => {
    const context = useContext(ToastContext);

    if (!context) {
      throw new Error('useToastContext must be used within a ToastProvider');
    }

    return context;
  };
