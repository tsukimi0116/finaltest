import React, { useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
import Attendance from "./Components/Attendance";
import Leave from "./Components/Leave";

const Backend = () => {

    const [path, setPath] = useState('')

    const [element, setElement] = useState()

    useEffect(() => {
        switch (path) {
            case 'leave':
                setElement(<Leave path={path} />)
                break;
            default:
                setElement(<Attendance path={path} />)
                break;
        }
    }, [path]);

    return (
        <div className="Backend">
            <Sidebar path={path} setPath={setPath} />
            <div>
                {element}
            </div>
        </div>

    )
}

export default Backend