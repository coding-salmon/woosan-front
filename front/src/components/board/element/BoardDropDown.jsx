import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MsgModal from "./MsgModal";

const BoardDropDown = ({ id, onSelect }) => {
    const navigate = useNavigate();

    const [openMsgModal, setOpenMsgModal] = useState(false);

    const handleModifyButtonClick = () => {
        navigate(`/board/modify/${id}`);
    };

    const openMsg = () => {
        setOpenMsgModal(true);
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
                        <div className='board-msg-icon'></div>
                        <div className='board-msg-text' onClick={openMsg}>쪽지 전송</div>
                    </div>
                    <div className='board-dropdown'>
                        <div className='board-modify-icon'></div>
                        <div className='board-modify-text' onClick={handleModifyButtonClick}>수정하기</div>
                    </div>
                </div>
            </div>
            {openMsg && <MsgModal/>}
        </>
    );
}

export default BoardDropDown;
