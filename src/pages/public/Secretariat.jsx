import { useGetSecretariat } from "../../hooks/useSecretariat.js";
import useStore from '../../contexts/store.js'
import { useState } from 'react';
import Button from '../../components/UI/Button.jsx';
import Card from '../../components/UI/Card.jsx';

const Secretariat = () => {
    const [modifyMode, setModifyMode] = useState(false);
    const { data: secretariatData, isLoading, isError } = useGetSecretariat();
    const OpenEdit = (item) => {
    }
    const OpenDelete = (item) => {
    }
    const isLogged = useStore((state) => state.isLogged);
    const role = useStore((state) => state.role);
    if (isLoading && !modifyMode) return <div className='h-screen w-full text-center'> Loading...</div>
    if (isError && !modifyMode) return <div className='bg-red-500 min-h-screen w-full text-center'>Error loading secretariat data.</div>

// inline-block does accept margin-top 
// uses mb on the flex container because flex collapses margins when you apply
// attach items-center to the div so that the block element "Edit" button is vertically centered and wont stretch to meet margin always margin bottom or something
    return (<>
        <div className="pt-25 px-25 mb-10">
            <div className='flex justify-between items-center'> 
            <h1 className="text-3xl font-bold">Secretariat</h1>
            {isLogged && role === 'admin' && !modifyMode && (
                <Button variant={"primary"} onClick={() => setModifyMode(true)}>Edit</Button> )}
            </div>
            {modifyMode && <div className='flex mt-5 gap-x-5'><Button className="" onClick={() => setModifyMode(false)} variant='secondary'>Back</Button><Button className=''>New +</Button></div>}
            <div className="grid grid-cols-4 gap-6 mt-5 auto-rows-fr">
                {secretariatData.map((item, index) => (
                    <Card header={item.name} actions={modifyMode && (<><button className="transition transform hover:scale-110" onClick={()=>OpenEdit(item)}>✏️</button><button className="transition transform hover:scale-110" onClick={()=>OpenDelete(item)}>🗑️</button></>)} className="h-full backdrop-blur-md border border-white/10 transition duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.35)]" key={index}>
                        <p className="text-sm opacity-75">{item.position}</p>
                    </Card>
                ))}
            </div>
        </div>
    </>)
}
// somehow mr- doesnt work on the two buttons but flex is needed. visual and css can be different
export default Secretariat
