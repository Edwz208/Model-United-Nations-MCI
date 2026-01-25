import { useGetSecretariat, usePostSecretariat, useDeleteSecretariat, usePatchSecretariat } from "../../hooks/useSecretariat.js";
import useStore from '../../contexts/store.js'
import { useState } from 'react';
import Button from '../../components/UI/Button.jsx';
import Card from '../../components/UI/Card.jsx';
import FormModal from "../../components/UI/FormModal.jsx";
import ConfirmModal from "../../components/UI/ConfirmModal.jsx";
import { validateCharExists } from "../../utils/validators.js"

const Secretariat = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [error, setError] = useState('');

    const [modifyMode, setModifyMode] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [openedExec, setOpenedExec] = useState({})

    const { data: secretariatData = [], isLoading, isError } = useGetSecretariat();

    const patchSecretariatMutation = usePatchSecretariat();
    const onEditSubmit = () => {
        if (validateCharExists(name) && validateCharExists(position)){
        patchSecretariatMutation.mutate(
            { name: name, position: position, secretariat_id: openedExec.secretariat_id },
            {
                onSuccess: () => {
                    setError('')
                    setName('');
                    setPosition('');
                    setIsUpdateOpen(false);
                    setOpenedExec({})
                },
                onError: (error) => {
                    setError(error?.response ? (error.response.data?.detail || error.response.status) : error?.request ? "Server unreachable. Check your connection." : (error?.message || "Unexpected error"));
            }}
        );
    }
    }

    const deleteMutation = useDeleteSecretariat()
    const onDeleteConfirm = () =>{
        deleteMutation.mutate(openedExec.secretariat_id, {
            onSuccess: () => {
                setError('')
                setIsDeleteOpen(false);
                setOpenedExec({});
            },
            onError: (error) => {
                setError(error?.response ? (error.response.data?.detail || error.response.status) : error?.request ? "Server unreachable. Check your connection." : (error?.message || "Unexpected error"));
            }
        })
    }

    const onCancel = () =>{
        setOpenedExec({})
        setName('')
        setPosition('')
        setError('')
        setIsAddOpen(false)
        setIsDeleteOpen(false)
        setIsUpdateOpen(false)
    }
    const isLogged = useStore((state) => state.isLogged);
    const role = useStore((state) => state.role);
    

// inline-block does accept margin-top 
// uses mb on the flex container because flex collapses margins when you apply
// attach items-center to the div so that the block element "Edit" button is vertically centered and wont stretch to meet margin always margin bottom or something
    const postSecretariatMutation = usePostSecretariat();
    const handleAddNew = () => {
        if (validateCharExists(name) && validateCharExists(position)){
            postSecretariatMutation.mutate(
                { name: name, position: position },
                {
                    onSuccess: () => {
                        setError('')
                        setName('');
                        setPosition('');
                        setIsAddOpen(false);
                    },
                    onError: (error) => {
                        setError(error?.response ? (error.response.data?.detail || error.response.status) : error?.request ? "Server unreachable. Check your connection." : (error?.message || "Unexpected error"));
                }}
            );
    }
}

    if (isLoading && !modifyMode) return <div className='h-screen w-full text-center'> Loading...</div>
    if (isError && !modifyMode) return <div className='h-screen w-full text-center'>Error loading secretariat data.</div>

    return (<>
        <FormModal open={isUpdateOpen} setOpen={setIsUpdateOpen} title={"Update Secretariat Member"} description={"Modify secretariat member information."} onSubmit={onEditSubmit} onCancel={onCancel}>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='name' className='flex items-center gap-5'>Name
                        <input
                            name="name"
                            className={`flex-1 rounded border px-3 py-2 border-border`}
                            placeholder='Enter name here'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='position' className='flex items-center gap-5'>Position
                        <input
                            name="position"
                            className={`flex-1 rounded border px-3 py-2 border-border`}
                            placeholder='Enter position here'
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                    </label>
                </div>
                {error && <p className='text-sm text-red-600'>{error}</p>}
            </div>
        </FormModal>
        <ConfirmModal open={isDeleteOpen} setOpen={setIsDeleteOpen} title={"Delete secretariat member?"} description={`Are you sure you want to delete ${openedExec.name}? This action cannot be undone.`} onConfirm={onDeleteConfirm}></ConfirmModal>
        <FormModal open={isAddOpen} setOpen={setIsAddOpen} title={"Add Secretariat Member"} description={"Enter new secretariat member information."} onSubmit={handleAddNew} onCancel={onCancel}>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='name' className='flex items-center gap-5'>Name
                        <input
                            name="name"
                            className={`flex-1 rounded border px-3 py-2 border-border`}
                            placeholder='Enter name here'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='position' className='flex items-center gap-5'>Position
                        <input
                            name="position"
                            className={`flex-1 rounded border px-3 py-2 border-border`}
                            placeholder='Enter position here'
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                    </label>
                </div>
                {error && <p className='text-sm text-red-600'>{error}</p>}
            </div>
        </FormModal>
        <div className="pt-25 px-25 mb-10">
            <div className='flex justify-between items-center'> 
            <h1 className="text-3xl font-bold">Secretariat</h1>
            {isLogged && role === 'admin' && !modifyMode && (
                <Button variant={"primary"} onClick={() => setModifyMode(true)}>Edit</Button> )}
            </div>
            {modifyMode && <div className='flex mt-5 gap-x-5'><Button className="" onClick={() => setModifyMode(false)} variant='secondary'>Back</Button><Button className='' onClick={()=> setIsAddOpen(true)}>New +</Button></div>}
            <div className="grid grid-cols-4 gap-6 mt-5 auto-rows-fr">
                {secretariatData.map((item) => (
                    <Card header={item.name} actions={modifyMode && (<><button className="transition transform hover:scale-110" onClick={()=>{setIsUpdateOpen(true); setName(item.name); setPosition(item.position); setOpenedExec(item)}}>✏️</button><button className="transition transform hover:scale-110" onClick={()=>{setIsDeleteOpen(true); setOpenedExec(item)}}>🗑️</button></>)} className="h-full backdrop-blur-md border border-white/10 transition duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.35)]" key={item.secretariat_id}>
                        <p className="text-sm opacity-75">{item.position}</p>
                    </Card>
                ))}
            </div>
        </div>
    </>)
}

// somehow mr- doesnt work on the two buttons but flex is needed. visual and css can be different
export default Secretariat
