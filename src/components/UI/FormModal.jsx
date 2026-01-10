import ModelShell from './ModalShell.jsx'
import { useState } from 'react'

function FormModal({open, setOpen, title, description, size, footerSubmit="Save Changes", onSubmit, onCancel, children}){
    const [isLoading, setIsLoading] = useState(false)
    const handleSaveChanges = async (e) =>{
    e.preventDefault()
    if (!onSubmit || isLoading) return;
    try{
        setIsLoading(true)
        await onSubmit()
        setOpen(false)
    }
    catch (error){
        console.log(error)
    }
    finally{
        setIsLoading(false)
    }

    
}
    return (
    <ModelShell open={open} onClose={onCancel} title={title} description={description} size={size}
            footer={
        <>
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-xl border border-border px-4 py-2 hover:bg-background/60"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            form="form-modal"
            disabled={isLoading}
            className=
              "rounded-xl px-4 py-2 text-white bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? 'Saving' : footerSubmit}
          </button>
        </>}
        >
        <form id="form-modal" onSubmit={(e)=>handleSaveChanges(e)}>
            {children}
        </form>
    </ModelShell>)
}

export default FormModal
