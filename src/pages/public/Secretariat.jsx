import styles from './Secretariat.module.css';
import useSecretariatData from "../../hooks/useSecretariatData.js";
import useStore from '../../contexts/store.js'
import { useState } from 'react';

const Secretariat = () => {
    const [modifyMode, setModifyMode] = useState(false);
    const { data: secretariatData, isLoading, isError } = useSecretariatData();

    const isLogged = useStore((state) => state.isLogged);
    const role = useStore((state) => state.role);
    if (isLoading && !modifyMode) return <div>Loading...</div>
    if (isError && !modifyMode) return <div>Error loading secretariat data.</div>
    if (modifyMode) return (<>
        <div className={styles.container}>
            <button onClick={() => setModifyMode(false)}>Back</button>
            <h1 className={styles.title}>Modify Secretariat</h1>
        </div>
    </>)
    return (<>
        <div className={styles.container}>
            {isLogged && role=='admin' &&
            <button onClick={()=>setModifyMode(true)}>Edit</button>}
            {modifyMode && <button onClick={()=>setModifyMode(false)}>Back</button>}
            <h1 className={styles.title}>Secretariat</h1>
            <div className={styles["grid-container"]}>
                {secretariatData.map((item, index) => (
                    <div className={styles["grid-item"]} key={index}>
                        <h3>{item.name}</h3>
                        <p>{item.position}</p>
                    </div>
                ))}
            </div>
        </div>
    </>)
}

export default Secretariat
