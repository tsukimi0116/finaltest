import React from 'react'
import { Modal } from 'antd';

const LeaveModal = ({ isModalVisible, handleOk, handleCancel }) => {

    const data = JSON.parse(sessionStorage.getItem('seeLeaveData'))

    console.log(data);

    return (
        <Modal title="打卡上班" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <div className="mdContainer">
                <h1>請假起日:{data.startTime}</h1>
                <h1>請假迄日:{data.endTime}</h1>
                <h1>請假類別:{data.category}</h1>
                <h1>請假原因:{data.reason}</h1>
            </div>
            <div className="btnContainer">
                {/* <button onClick={check} className="check" >打卡</button> */}
            </div>
        </Modal>
    )
}

export default LeaveModal