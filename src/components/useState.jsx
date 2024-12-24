import { useState } from "react";

export default function  Func({children}) {
const {ketmon, setKetmon} = useState(500)

const handleClick = () => {
    setKetmon(213)
}

return <>
<h1>Ours inglesh level {ketmon}</h1>
<button onClick={handleClick}>iNFLATSIYA</button>
</>

}

