import React, { useState } from 'react';
import MatchingForm from '../../components/matching/MatchingForm';
import { createRegularly, createTemporary, createSelf } from '../../api/matchingBoardApi';
import styles from '../../assets/styles/matching/CreateMatching.module.scss';
import Swal from 'sweetalert2';


const CreateMatching = () => {
    const [matchingType, setMatchingType] = useState(1); // 기본값: 정기모임

    const handleSubmit = async (formData) => {
        try {
            console.log('폼 데이터 제출 중:', formData);

            // 폼 데이터 안에 있는 모든 key-value 쌍을 콘솔에 출력합니다.
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            let response;
            if (matchingType === 1) {
                response = await createRegularly(formData);
                console.log('정기모임 생성 응답:', response); // 디버깅을 위한 콘솔 로그
                Swal.fire('성공!', '정기모임이 성공적으로 생성되었습니다.', 'success');
            } else if (matchingType === 2) {
                response = await createTemporary(formData);
                console.log('번개모임 생성 응답:', response); // 디버깅을 위한 콘솔 로그
                Swal.fire('성공!', '번개모임이 성공적으로 생성되었습니다.', 'success');
            } else if (matchingType === 3) {
                response = await createSelf(formData);
                console.log('셀프 소개팅 생성 응답:', response); // 디버깅을 위한 콘솔 로그
                Swal.fire('성공!', '셀프 소개팅이 성공적으로 생성되었습니다.', 'success');
            }
        } catch (error) {
            console.error('모임 생성 중 오류 발생:', error); // 디버깅을 위한 콘솔 로그
            Swal.fire('오류!', error.response.data, 'error');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleBar}>
                <div className={styles.titleBarLine}></div>
                <div className={styles.titleBarText}>모임 만들기</div>
            </div>
            <div className={styles.categorySelector}>
                <label htmlFor="category">카테고리</label>
                <select
                    id="category"
                    value={matchingType}
                    onChange={(e) => setMatchingType(Number(e.target.value))}
                >
                    <option value={1}>정기 모임</option>
                    <option value={2}>번개</option>
                    <option value={3}>셀프 소개팅</option>
                </select>
            </div>
            <MatchingForm onSubmit={handleSubmit} initialValues={{}} matchingType={matchingType} />
        </div>
    );
};

export default CreateMatching;
