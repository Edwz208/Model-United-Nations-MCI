import ModalShell from "./ModalShell.jsx";
import { useState } from 'react'

function ConfirmModal({open, setOpen, title, description, size, onConfirm}){
    const [isLoading, setIsLoading] = useState(false);
    const handleConfirm = async () =>{
        if (!onConfirm || isLoading) return;
        try{
            setIsLoading(true)
            await onConfirm()
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
        <ModalShell open={open} onClose={setOpen} title={title} description={description} size={size}
        footer={
        <>
          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={isLoading}
            className="rounded-xl border border-border px-4 py-2 hover:bg-background/60"
          >
            Cancel
          </button>
          
          <button
            type="button"
            disabled={isLoading}
            onClick={()=> handleConfirm()}
            className=
              "rounded-xl px-4 py-2 text-white bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? 'Confirming': 'Confirm'}
          </button>
        </>}
        >
        </ModalShell>
    )
}
export default ConfirmModal;