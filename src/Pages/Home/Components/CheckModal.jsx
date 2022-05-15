import React, { useEffect, useState } from "react";
import { Modal } from 'antd';
import Axios from "axios";

const CheckModal = ({ isModalVisible, handleOk, handleCancel }) => {

    const users = JSON.parse(sessionStorage.getItem('users'))

    const [time, setTime] = useState('')
    const [onwork, setonwork] = useState('')
    const [offwork, setoffwork] = useState('')

    const getTime = async () => {
        const currentTime = await Axios.get('http://localhost:9191/getCurrentTime')
        let current = currentTime.data.split(" ")
        setTime(current[1])
    }

    const check = async () => {
        await Axios.post('http://localhost:9191/users/check', { phone: users.phone })
        const checkGet = await Axios.get(`http://localhost:9191/users/check?phone=${users.phone}`)
        try {
            setonwork(checkGet.data.onWork);
            setoffwork(checkGet.data.offWork)
        } catch (error) {
            console.log(error);
        }
    }

    const getData = () => {
        Axios.get(`http://localhost:9191/users/check?phone=${users.phone}`)
            .then((res) => {
                console.log(res);
                setonwork(res.data.onWork);
                setoffwork(res.data.offWork)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getData()
        setInterval(() => {
            getTime()
        }, 1000)
    });

    return (
        <Modal title="打卡上班" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <div className="mdContainer">
                <h1>員工編號:{users.id}</h1>
                <h1>員工名稱:{users.name}</h1>
                <h1>上班打卡:{onwork}</h1>
                <h1>下班打卡:{offwork}</h1>
                <h1>現在時間:{time}</h1>
            </div>
            <div className="btnContainer">
                <button onClick={check} className="check" >打卡</button>
            </div>
        </Modal>
    )
}

export default CheckModal
