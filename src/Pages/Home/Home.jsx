import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../Stylesheets/Home.css'
import CheckModal from "./Components/CheckModal";
import Axios from "axios";

const Home = () => {

    const navigate = useNavigate()

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const getTime = async () => {
        const currentTime = await Axios.get('http://localhost:9191/getCurrentTime')
        let current = currentTime.data.split(" ")
        setTime(current[1])
    }

    const [phone, setPhone] = useState('');

    const [phone2, setPhone2] = useState('');

    const [time, setTime] = useState('')

    const inputOnchange = (event) => {
        setPhone(event.target.value)
    }

    const inputOnchange2 = (event) => {
        setPhone2(event.target.value)
    }

    const loginCheck = async (event) => {
        let result = await Axios.get(`http://localhost:9191/users/check?phone=${phone}`)
        let users = result.data.user
        try {
            sessionStorage.setItem('users', JSON.stringify(users))
            setIsModalVisible(true);
        } catch (error) {
            console.log(error);
        }
    }

    const divClick = (event) => {
        let index = parseInt(event.target.dataset.category)
        let input = document.getElementsByTagName('input')
        input[index].focus()
    }

    const loginFunc = async () => {
        let result = await Axios.post('http://localhost:9191/users/login', { phone: phone2 })
        try {
            sessionStorage.setItem('token', result.data.token)
            setTimeout(() => {
                navigate('/Attendance')
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setInterval(() => {
            getTime()
        }, 1000)
    }, []);

    return (
        <>
            <div className="Home">
                <div className="Info">
                    <div className="Title">
                        <h1>??????????????????</h1>
                        <h1>????????????:{time}</h1>
                    </div>
                </div>
                <div className="do">
                    <div data-category="0" className="CheckContainer" onClick={divClick}>
                        <h1>?????????/??????</h1>
                        <input onChange={inputOnchange} value={phone} placeholder="??????????????????" type="text" />
                        <button onClick={loginCheck}>????????????</button>
                    </div>
                    <div data-category="1" className="BackendContainer" onClick={divClick}>
                        <h1>????????????</h1>
                        <input onChange={inputOnchange2} value={phone2} placeholder="??????????????????" type="text" />
                        <button onClick={loginFunc}>????????????</button>
                    </div>
                </div>
            </div>
            {isModalVisible && <CheckModal
                isModalVisible={isModalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />}
        </>
    )
}

export default Home