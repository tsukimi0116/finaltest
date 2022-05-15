import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, DatePicker, Space } from 'antd';
import LeaveModal from "./LeaveModal";

const { RangePicker } = DatePicker;
const { Column } = Table;

const Leave = () => {

    const [userDate, setUserDate] = useState([])

    const [leave, setLeave] = useState([])

    const [type, setType] = useState([])

    const onChange = (date, dateString) => {
        setUserDate(dateString)
    }

    const searchClick = async () => {
        let result = await Axios.get(`http://localhost:9191/leave?startDate=${userDate[0]}&endDate=${userDate[1]}`)
        try {
            let data = result.data.rows
            for (let i = 0; i <= data.length; i++) {
                if (data[i].approve) {
                    data[i].approve = 'v'
                }
                for (let j = 1; j <= 5; j++) {
                    if (data[i].category === j) {
                        data[i].category = type[j].name
                    }
                }
                setLeave(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getType = async () => {
        let result = await Axios.get('http://localhost:9191/leave/category')
        setType(result.data);
    }

    const seeLeave = async (event) => {
        let contain = event.nativeEvent.path[2].innerText
        let containArr = contain.split('\t')
        let result = await Axios.get(`http://localhost:9191/leave?startDate=${containArr[1]}&endDate=${containArr[2]}`)
        try {
            result.data.rows[0].category = containArr[0]
            sessionStorage.setItem('seeLeaveData', JSON.stringify(result.data.rows[0]))
            setIsModalVisible(true);
        } catch (error) {
            console.log(error);
        }

    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        getType()
    }, []);

    return (
        <div className="Leave">
            <Space direction="vertical" size={20}>
                <RangePicker size="large" onChange={onChange} />
            </Space>
            <button className="searchBtn" onClick={searchClick}>搜尋</button>

            <Table dataSource={leave}>
                {/* <Column title="日期" dataIndex="date" key="date" /> */}
                <Column title="請假類別" dataIndex="category" key="category" />
                <Column title="請假開始時間" dataIndex="startTime" key="startTime" />
                <Column title="請假結束時間" dataIndex="endTime" key="endTime" />
                <Column title="總核" dataIndex="approve" key="approve" />
                <Column title="功能"
                    key="action"
                    render={(text, record) => (
                        <button onClick={seeLeave} className="seeBtn">查看</button>
                    )} />
            </Table>
            {isModalVisible && <LeaveModal
                isModalVisible={isModalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />}
        </div>
    )
}

export default Leave