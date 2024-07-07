import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLocalPostOffice } from "react-icons/md";

const BoardDropDown = ({ id, onSelect, openMsg }) => {
    const navigate = useNavigate();

    const handleModifyButtonClick = () => {
        navigate(`/board/modify/${id}`);
    };

    const handleOpenMsg = () => {
        openMsg();
    };

    return (
        <>
            <div className="board-dropdown-wrapper">
                <div className="board-dropdown-list">
                    <div className='board-dropdown'>
                        <div className='board-report-icon'></div>
                        <div className='board-report-text'>신고하기</div>
                    </div>
                    <div className='board-dropdown'>
                    <MdOutlineLocalPostOffice className='board-msg-icon'/>
                        <div className='board-msg-text' onClick={handleOpenMsg}>쪽지 전송</div>
                    </div>
                    <div className='board-dropdown'>
                        <div className='board-modify-icon'></div>
                        <div className='board-modify-text' onClick={handleModifyButtonClick}>수정하기</div>
                    </div>
                </div>
            </div>
            {/* {openMsgModal && <MsgModal/>} */}
        </>
    );
}

export default BoardDropDown;
