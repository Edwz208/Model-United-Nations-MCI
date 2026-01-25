import { useOutletContext } from "react-router-dom"
import { useGetAllAmendmentsInCouncil, useApproveRejectAmendment } from '../../hooks/useAmendments.js'
import { useGetAllCountries } from '../../hooks/useCountries.js'
import { filterUnapprovedAmendmentsOnly } from '../../utils/helpers.js'
import Button from "../../components/UI/Button.jsx"
import { useState } from "react"

function ReviewAmendments(){
  const context = useOutletContext()
  const councilScopedId = context?.councilId ?? null

  const { data: amendmentsData = [], isLoading: isAmendmentsLoading, isError: isAmendmentsError, error: amendmentsError } = useGetAllAmendmentsInCouncil(councilScopedId) // should be safe to assume councilScopedId exists

  const {data: countriesData = [], isLoading: isCountriesLoading, isError: isCountriesError, error: countriesError } = useGetAllCountries()
  const errorMessageCountry = countriesError?.response ? (countriesError.response.data?.detail ||countriesError.response.status) : countriesError?.request ? "Server unreachable. Check your connection." : (countriesError?.message || "Unexpected error");
  
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

  if (isCountriesError) {
    const status = countriesError?.response?.status
    if (status === 401){
        return <Unauthorized/>
    }
    return <p>Error: {errorMessageCountry}</p>}
  if (isCountriesLoading) return <div>Loading countries...</div>

  const formattedDate = new Date(current.modified_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });
return (
  <div className="flex flex-col flex-1 p-6 border rounded-lg space-y-4 bg-surface">

    <h2 className="text-lg font-semibold">
      Amendment ID: {current.amendment_id}
    </h2>

    <p className="text-sm leading-relaxed text-gray-700">
      {current.content}
    </p>

    <div className="text-xs text-gray-500 space-y-1">
      <p>Created at: {formattedDate}</p>
      <p>Submitter: {countriesData?.find(country => country.country_id === current.submitter)?.name ?? current.submitter}</p>
    </div>

    <div className="flex flex-col gap-2 pt-2">
      <label htmlFor="rejectReason" className="text-sm font-medium">
        Reason for Rejection
      </label>

      <input
        id="rejectReason"
        type="text"
        value={rejectMessage}
        name="rejectReason"
        placeholder="Enter rejection reasoning here"
        onChange={(e) => setRejectMessage(e.target.value)}
        className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring"
      />
    </div>

    <div className="flex gap-3 pt-4 mt-auto">
      <Button
        variant="primary"
        onClick={handleReject}
        disabled={approveOrRejectMutation.isPending}
      >
        Reject
      </Button>

      <Button
        variant="primary"
        onClick={handleApprove}
        disabled={approveOrRejectMutation.isPending}
      >
        Approve
      </Button>
    </div>

    {actionError && (
      <p className="text-sm text-red-600">
        {actionError}
      </p>
    )}

  </div>
  );

}

export default ReviewAmendments