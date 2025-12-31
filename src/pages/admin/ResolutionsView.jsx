import ListResolutions from "../../components/admin/ListResolutions.jsx";
import CreateResolution from "../../components/admin/CreateResolution.jsx";
import { useState } from "react";

const ResolutionsView = () => {
    const [createNewResolution, setCreateNewResolution] = useState(false);

    return (
    <div>
        <button onClick={()=> setCreateNewResolution(!createNewResolution)}>Create</button>
        {createNewResolution && <CreateResolution setCreateNew={setCreateNewResolution}/>}
        {!createNewResolution && <ListResolutions />}
    </div>
    )
    }

export default ResolutionsView;