import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setPath }) => {

    const navigate = useNavigate()

    const pathChange = (event) => {
        let path = event.target.dataset.path
        setPath(path);
        navigate(`/${path}`)
    }
    return (
        <div className="sidebar">
            <ul>
                <li>出勤管理系統</li>
                <li data-path="Attendance" onClick={pathChange}>個人出勤狀況</li>
                <li data-path="leave" onClick={pathChange}>請假管理</li>
                <li>登出</li>
            </ul>
        </div>
    )
}

export default Sidebar