import ListResolutions from "../../components/admin/DisplayResolutions.jsx";
import CreateResolution from "../../components/admin/CreateResolutionForm.jsx";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import FormModal from "../../components/UI/FormModal.jsx";
import ConfirmModal from "../../components/UI/ConfirmModal.jsx";
import { useDeleteResolutions } from "../../hooks/useResolutions.js";
import Button from "../../components/UI/Button.jsx";

const ResolutionsView = () => {
    const context = useOutletContext()
    const councilScopedId = context?.councilId ?? null

    const [openedResolution, setOpenedResolution] = useState({})

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isAddOpen, setIsAddOpen] = useState(false)

    const useDeleteResolutionsMutation = useDeleteResolutions()

    const onOpenConfirmDelete = () =>{
    if (!openedResolution?.resolution_id) return
    useDeleteResolutionsMutation.mutate([openedResolution.resolution_id])
    setIsDeleteOpen(false)
    setOpenedResolution(null)
  }

    return (
    <div>
        <ConfirmModal open={isDeleteOpen} setOpen={setIsDeleteOpen} title={"Delete resolution?"} description={`Are you sure you want to delete ${openedResolution?.title}? This action cannot be undone.`} onConfirm={onOpenConfirmDelete}></ConfirmModal>
        <Button onClick={()=> setIsAddOpen(true)}>Create</Button>
        <CreateResolution isAddOpen={isAddOpen} setIsAddOpen={setIsAddOpen} councilScopedId={councilScopedId}/>
        <ListResolutions councilScopedId={councilScopedId} />
    </div>
    )
    }

export default ResolutionsView;