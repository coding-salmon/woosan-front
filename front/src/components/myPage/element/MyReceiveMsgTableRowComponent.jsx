import React from "react";
import { formatDate } from "../../../util/DateUtil";

const MyReceiveMsgTableRowComponent = ({ item, index, onClick }) => (
    <tr className="board-row" onClick={onClick}>
        <td>{index + 1}</td>
        <td>{item.senderNickname}</td>
        <td>{item.content}</td>
        <td>{formatDate(item.regDate)}</td>
        <td>삭제</td>
    </tr>
);

export default MyReceiveMsgTableRowComponent;
