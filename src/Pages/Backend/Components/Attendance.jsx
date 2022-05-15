import React, { useState } from "react";
import Axios from "axios";
import { Table, DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const { Column } = Table;

const Attendance = () => {

    const [userDate, setUserDate] = useState([])

    const [attendance, setAttendance] = useState([])

    const onChange = (date, dateString) => {
        setUserDate(dateString)
    }

    const searchClick = async () => {
        let result = await Axios.get(`http://localhost:9191/attendance?startDate=${userDate[0]}&endDate=${userDate[1]}`)
        let dataArr = []
        try {
            let data = result.data.rows
            for (let i = 0; i < data.length; i++) {
                switch (data[i].type) {
                    case 'on':
                        dataArr.push(data[i])
                        break;
                    case 'off':
                        let copy = dataArr.filter(fakedata => fakedata.date === data[i].date)
                        copy[0].offtime = data[i].time
                        copy[0].checkofftime = data[i].check
                        break;
                    default:
                        return
                }
            }
            setAttendance(dataArr);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="Attendance">
            <Space direction="vertical" size={20}>
                <RangePicker size="large" onChange={onChange} />
            </Space>
            <button className="searchBtn" onClick={searchClick}>搜尋</button>

            <Table dataSource={attendance}>
                <Column title="日期" dataIndex="date" key="date" />
                <Column title="預定上班時間" dataIndex="time" key="time" />

                <Column title="預定下班時間" dataIndex="offtime" key="offtime" />
                <Column title="實際上班時間" dataIndex="check" key="check" />
                <Column title="實際下班時間" dataIndex="checkofftime" key="checkofftime" />
                <Column title="功能"
                    key="action"
                    render={(text, record) => (
                        <a>請假</a>
                    )} />
            </Table>
        </div>
    )
}

export default Attendance