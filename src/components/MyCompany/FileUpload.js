import React from 'react';
import apiClient from '../../services/api';

const FileUpload = () => {

    const [selectedFile, setSelectedFile] = React.useState(null);

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("selectedFile", selectedFile);
        try {
        const response = apiClient({
            method: "post",
            url: "/api/company/upload",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });
        } catch(error) {
        //console.log(error)
        }

        
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
        handleSubmit(event)
    }


    return (
        <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileSelect}/>
        <input type="submit" value="Upload File" />
        </form>
    );
};

export default FileUpload;