import { useOutletContext } from "react-router-dom"
import { useGetAllAmendmentsInCouncil, useApproveRejectAmendment } from '../../hooks/useAmendments.js'
import { filterUnapprovedAmendmentsOnly } from '../../utils/helpers.js'
import Button from "../../components/UI/Button.jsx"
import { useState } from "react"

function ReviewAmendments(){
  const context = useOutletContext()
  const councilScopedId = context?.councilId ?? null

  const { data: amendmentsData = [], isLoading: isAmendmentsLoading, isError: isAmendmentsError, error: amendmentsError } = useGetAllAmendmentsInCouncil(councilScopedId)

  const current = filterUnapprovedAmendmentsOnly(amendmentsData)[0] ?? null
  
  const approveOrRejectMutation = useApproveRejectAmendment(null, null, councilScopedId)
  const [rejectMessage, setRejectMessage] = useState('')

  const [actionError, setActionError] = useState('')
  const handleReject = () =>{
    setActionError('')
    approveOrRejectMutation.mutate({"formData": {"status": "rejected", "reject_message": rejectMessage}, amendment_id: current.amendment_id},
    {onSuccess: () => {setRejectMessage('')},
    onError: (error) => {
        setActionError(error?.response ? (error.response.data?.detail || error.response.status) : error?.request ? "Server unreachable. Check your connection." : (error?.message || "Unexpected error"))
    }
  })
  }

  const handleApprove = () =>{
    setActionError('')
    approveOrRejectMutation.mutate({"formData": {"status": "approved", "reject_message": rejectMessage}, amendment_id: current.amendment_id},
    {
    onSuccess: () => {},
    onError: (error) => {
        setActionError(error?.response ? (error.response.data?.detail || error.response.status) : error?.request ? "Server unreachable. Check your connection." : (error?.message || "Unexpected error"))
    }
  })
  }
  const errorMessage = amendmentsError?.response ? (amendmentsError.response.data?.detail || amendmentsError.response.status) : amendmentsError?.request ? "Server unreachable. Check your connection." : (amendmentsError?.message || "Unexpected error");
  if (isAmendmentsError) {
    const status = amendmentsError?.response?.status
    if (status === 401){ 
        return <Unauthorized/>
    }
    return <p>Error: {errorMessage}</p>
  }



  if (isAmendmentsLoading) return <div>Loading amendments...</div>
  if (!current) return <div>No amendments to review.</div>
  return (
    <div>
        
        <h2>Amendment Id: {current.amendment_id}</h2>
        <p>{current.content}</p>
        <p>{current.modified_at}</p>
        <p>{current.submitter}</p>
        <Button variant={"primary"} onClick={handleReject} disabled={approveOrRejectMutation.isPending}>Reject</Button>
        <label htmlFor='rejectReason'>Reason For Rejection:</label>
        <input type='text' value={rejectMessage} name='rejectReason' placeholder='Enter rejection reasoning here' onChange={(e) => setRejectMessage(e.target.value)}></input>
        <Button variant={"primary"} onClick={handleApprove} disabled={approveOrRejectMutation.isPending}>Approve</Button>
        {actionError && <p></p>}
    </div>
  )



}

export default ReviewAmendments