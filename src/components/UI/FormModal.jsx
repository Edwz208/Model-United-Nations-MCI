import ModelShell from './ModalShell.jsx'
// maintain usage of mutate not mutateAsync by passing in the isLoading from the mutation instance
function FormModal({open, title, description, size, footerSubmit="Save Changes", onSubmit, onCancel, children, isLoading}){
    const handleSaveChanges = (e) =>{
    e.preventDefault()
    if (!onSubmit || isLoading) return;
      onSubmit()
  
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
