//CUSTOM HOOKS
import { useState } from 'react'

const useSetForm = () => {
    const [value, setForm] = useState('') 
    return [value, event => { event.preventDefault();  setForm({ ...value, [event.target.name]: event.target.value }) }]
}
export default useSetForm
