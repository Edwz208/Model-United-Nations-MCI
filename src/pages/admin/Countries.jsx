import { useState } from 'react'

import {useDeleteCountries, useImportCountries } from '../../hooks/useCountries.js'

import ConfirmModal from '../../components/UI/ConfirmModal.jsx';
import FormModal from '../../components/UI/FormModal.jsx';
import Button from '../../components/UI/Button.jsx';
import CreateCountryForm from '../../components/admin/CreateCountryForm.jsx';
import UpdateCountryForm from '../../components/admin/UpdateCountryForm.jsx';

import DisplayCountries from '../../components/admin/DisplayCountries.jsx';
import { useOutletContext } from 'react-router-dom';

const ViewCountries = () => {
  const context = useOutletContext()
  const councilScopedId = context?.councilId ?? null

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isImportOpen, setIsImportOpen] = useState(false)
  
  const useImportCountriesMutation = useImportCountries()
  const [importURL, setImportURL] = useState('')
  const [urlError, setUrlError] = useState('')

  const [openedCountry, setOpenedCountry] = useState(null)

  const useDeleteCountriesMutation = useDeleteCountries()

  const onOpenConfirmDelete = () =>{
    if (!openedCountry?.country_id) return
    useDeleteCountriesMutation.mutate([openedCountry.country_id])
    setIsDeleteOpen(false)
    setOpenedCountry(null)
  }
  
  const onConfirmImport = () =>{
    useImportCountriesMutation.mutate(importURL,{
      onSuccess: () => {setIsImportOpen(false); setUrlError('')},
      onError: (error) => setUrlError(error?.response ? (error.response.data?.detail || error.response.status) : error?.request ? "Server unreachable. Check your connection." : (error?.message || "Unexpected error"))
    })
  }

  return (
    <>
    <ConfirmModal open={isDeleteOpen} setOpen={setIsDeleteOpen} title={"Delete country?"} description={`Are you sure you want to delete country ${openedCountry?.name}? This action cannot be undone.`} onConfirm={onOpenConfirmDelete}></ConfirmModal>
    <UpdateCountryForm isAddOpen={isEditOpen} setIsAddOpen={setIsEditOpen} title={`Modify country ${openedCountry?.name}`} description={`Make changes to country ${openedCountry?.name}.`} councilScopedId ={councilScopedId} footerSubmit={"Save Changes"} openedCountry={openedCountry}></UpdateCountryForm>
    <CreateCountryForm isAddOpen={isAddOpen} setIsAddOpen={setIsAddOpen} councilScopedId={councilScopedId} title={'Add new country'} description={"Enter new country information"} footerSubmit={'Submit'}/>
    <DisplayCountries setIsAddOpen={setIsAddOpen} setIsEditOpen={setIsEditOpen} setIsDeleteOpen={setIsDeleteOpen} councilScopedId={councilScopedId} setOpenedCountry={setOpenedCountry}/>
    <FormModal isLoading={useImportCountriesMutation.isPending} open={isImportOpen} setOpen={setIsImportOpen} title={"Export from spreadsheet"} description={`Are you sure you want to import from spreadsheet? This action will override existing countries and cannot be undone.`} onSubmit={onConfirmImport} onCancel={()=>setIsImportOpen(false)}>
      <div className='flex gap-5'>
      <label htmlFor='url'>Url: 
      </label>
      <input name='url' className='flex-1' placeholder='Please enter spreadsheet url as csv exported link' value={importURL} onChange={(e)=>{setImportURL(e.target.value);setUrlError('');}}/>
      </div>
      <p className='text-red-600 text-center'>{urlError}</p>
    </FormModal>
    <Button className='mt-5' onClick={()=>setIsImportOpen(true)} disabled={useImportCountriesMutation.isPending} >Import From Spreadsheet</Button>
  </>
  )
};

export default ViewCountries;