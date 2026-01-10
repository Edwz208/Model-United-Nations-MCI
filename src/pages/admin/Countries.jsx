import { useState } from 'react'

import {useDeleteCountries, usePatchCountry} from '../../hooks/useCountries.js'

import ConfirmModal from '../../components/UI/ConfirmModal.jsx';
import FormModal from '../../components/UI/FormModal.jsx';
import CreateCountryForm from '../../components/admin/CreateCountryForm.jsx';

import DisplayCountries from '../../components/admin/DisplayCountries.jsx';
import { useOutletContext } from 'react-router-dom';
const ViewCountries = () => {
  const context = useOutletContext()
  const councilScopedId = context?.councilId ?? null

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)

  const [openedCountry, setOpenedCountry] = useState(null)

  const useDeleteCountriesMutation = useDeleteCountries()
  const usePatchCountryMutation = usePatchCountry()

  const onSaveEditChanges = () => {
    if (!openedCountry?.country_id) return
    usePatchCountryMutation.mutate(openedCountry)
    setIsEditOpen(false)
    setOpenedCountry(null)
  }

  const onOpenConfirmDelete = () =>{
    if (!openedCountry?.country_id) return
    useDeleteCountriesMutation.mutate([openedCountry.country_id])
    setIsDeleteOpen(false)
    setOpenedCountry(null)
  }

  return (
    <>
    <ConfirmModal open={isDeleteOpen} setOpen={setIsDeleteOpen} title={"Delete country?"} description={`Are you sure you want to delete country ${openedCountry?.name}? This action cannot be undone.`} onConfirm={onOpenConfirmDelete}></ConfirmModal>
    <FormModal open={isEditOpen} setOpen={setIsEditOpen} title={`Modify country ${openedCountry?.name}`} description={`Make changes to country ${openedCountry?.name}.`} onSubmit={onSaveEditChanges}></FormModal>
    <CreateCountryForm isAddOpen={isAddOpen} setIsAddOpen={setIsAddOpen} councilScopedId={councilScopedId}/>
    <DisplayCountries setIsAddOpen={setIsAddOpen} setIsEditOpen={setIsEditOpen} setIsDeleteOpen={setIsDeleteOpen} councilScopedId={councilScopedId}/>
  </>
  )
};

export default ViewCountries;