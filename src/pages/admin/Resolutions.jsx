import ListResolutions from "../../components/admin/DisplayResolutions.jsx";
import CreateResolution from "../../components/admin/CreateResolutionForm.jsx";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const ResolutionsView = () => {
    const [createNewResolution, setCreateNewResolution] = useState(false);
    const context = useOutletContext()
    const councilScopedId = context?.councilId ?? null
    return (
    <div>
        <button onClick={()=> setCreateNewResolution(!createNewResolution)}>Create</button>
        {createNewResolution && <CreateResolution isAddOpen={createNewResolution} setIsAddOpen={setCreateNewResolution} councilScopedId={councilScopedId}/>}
        {!createNewResolution && <ListResolutions councilScopedId={councilScopedId} />}
    </div>
    )
    }

export default ResolutionsView;