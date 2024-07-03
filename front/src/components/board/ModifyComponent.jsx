import React, { useState, useEffect } from "react";
import { modifyBoard, getOne } from "../../api/boardApi";
import "../../assets/styles/App.scss";
import { useParams, useNavigate } from "react-router-dom";
import useCustomMove from "../../hooks/useCustomMove";

const categories = ["선택", "맛집", "청소", "요리", "재테크", "인테리어", "정책", "기타"];
const initState = {
    id: 0,
    writerId: 0,
    nickname: "",
    title: "",
    content: "",
    regDate: "",
    views: 0,
    likesCount: 0,
    categoryName: "",
    images: [],
    filePathUrl: [],
};

const ModifyComponent = () => {
    const { id } = useParams();
    const [board, setBoard] = useState(initState);
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("선택");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [existingFiles, setExistingFiles] = useState([]);
    const [newFiles, setNewFiles] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const { moveToList } = useCustomMove();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getOne(id);
                const { categoryName, title, content, filePathUrl } = response;
                setSelectedCategory(categoryName);
                setTitle(title);
                setContent(content);
                setExistingFiles(filePathUrl || []);
            } catch (error) {
                console.error("게시물 데이터를 불러오는데 실패했습니다.", error);
            }
        };
        fetchData();
    }, [id]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setShowDropdown(false);
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setNewFiles([...newFiles, ...selectedFiles]);
    };

    const handleFileRemove = (index, isExisting) => {
        if (isExisting) {
            const newExistingFiles = [...existingFiles];
            newExistingFiles.splice(index, 1);
            setExistingFiles(newExistingFiles);
        } else {
            const newFilesList = [...newFiles];
            newFilesList.splice(index, 1);
            setNewFiles(newFilesList);
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('categoryName', selectedCategory);
        formData.append('title', title);
        formData.append('content', content);

        // 기존 파일 경로 추가
        existingFiles.forEach(file => {
            formData.append('filePathUrl', file);
        });

        // 새로 추가된 파일 추가
        newFiles.forEach(file => {
            formData.append('images', file);
        });

        // FormData 내용을 콘솔에 출력
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            await modifyBoard(id, formData);
            console.log("수정 성공");
            navigate(`/board/${id}`);
        } catch (error) {
            console.error("수정 실패", error);
        }
    };

    const handleCancel = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <div className="modify-component">
            <div className="title-bar">
                <div className="title-bar-line"></div>
                <div className="title-bar-text">게시글 수정</div>
            </div>
            <div className="form">
                <div className="form-group">
                    <label>카테고리</label>
                    <div className="dropdown" onClick={() => setShowDropdown(!showDropdown)}>
                        <button className="dropdown-button">{selectedCategory}</button>
                        {showDropdown && (
                            <ul className="dropdown-list">
                                {categories.map((category, index) => (
                                    <li key={index} onClick={() => handleCategorySelect(category)}>
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="form-group">
                    <label>제목</label>
                    <input
                        type="text"
                        placeholder="제목을 입력해주세요."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>내용</label>
                    <textarea
                        placeholder="내용을 입력해주세요."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>첨부파일</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        multiple
                    />
                    <div className="file-list">
                        {existingFiles.map((file, index) => (
                            <div key={index} className="file-item">
                                <span>{file}</span>
                                <button type="button" onClick={() => handleFileRemove(index, true)}>삭제</button>
                            </div>
                        ))}
                        {newFiles.map((file, index) => (
                            <div key={index} className="file-item">
                                <span>{file.name}</span>
                                <button type="button" onClick={() => handleFileRemove(index, false)}>삭제</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-buttons">
                    <button className="cancel-button" onClick={() => moveToList()}>목록으로</button>
                    <button className="save-button" onClick={handleSave}>완료</button>
                    <button className="remove-button" onClick={handleCancel}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default ModifyComponent;
