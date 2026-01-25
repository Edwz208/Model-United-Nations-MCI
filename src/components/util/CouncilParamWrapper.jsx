import { Outlet, useParams, Navigate } from "react-router-dom";

function CouncilParamWrapper() {
  const { councilId } = useParams();
  const id = Number(councilId);
  if (!Number.isFinite(id)) return <Navigate to="/Admin/Dashboard" replace />;
 // this outlet does not affect styling for the flex-grow 
  return <Outlet context={{ councilId: id }} />;
}

export default CouncilParamWrapper;