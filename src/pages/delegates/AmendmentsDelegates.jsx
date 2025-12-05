import CreateAmendment from "../../components/delegates/CreateAmendment.jsx";
import { useState } from "react";

const AmendmentsDelegates = () => {
    const [createNewAmendment, setCreateNewAmendment] = useState(false);

    return (
    <div>
        <button onClick={()=> setCreateNewAmendment(!createNewAmendment)}>Create</button>
        {createNewAmendment && <CreateAmendment setCreateNewAmendment={setCreateNewAmendment}/>}
    </div>
    )
    }

export default AmendmentsDelegates;