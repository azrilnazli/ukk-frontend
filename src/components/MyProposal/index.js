import React , { useState }  from 'react';
import apiClient from '../../services/api';
const collect = require('collect.js'); 

const MyProposal = () => {

    const [file,setFile] = useState('');
    const [filename,setFilename] = useState('Choose file');
    const [uploaded, setUploaded] = useState('');
    const [errors, setErrors] = useState('');

    const handleChange = (e) => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors('')
        const formData = new FormData(); // JavaScript
        formData.append('file', file) // selected file

        // axios 
        apiClient({
            method: "post",
            url: "/api/company/upload_proposal_video",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(response => {
            console.log('uploaded')
            setUploaded('File successfully uploaded')
       
        }).catch(error => {
            if (error.response.status === 500) {
                console.log('Error 500'); 
                setErrors('Server Error : 500');
            }
            if (error.response.status === 422) {
                console.log(error.response)
                setErrors(error.response.data.errors.file[0]);
            }
        })
    }


    return (
        <div className='container container-fluid bg-light rounded p-3 col-md-12'>
            <h2>My Proposal</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input 
                    type="file"
                    className={"form-control" + (errors ? ' is-invalid' : uploaded ? ' is-valid' : '' )}
                    onChange={handleChange} 
                    />
                    
                    <>
                    { errors ? 
                        <div className="invalid-feedback">
                            {errors}
                        </div> 
                    :
                        <>
                        { uploaded ? 
                            <div  className="valid-feedback">
                                {uploaded}
                            </div> 
                        :
                            null 
                        }
                        </> 
                    }
                    </>

          
                  
                </div>
            <button type="submit" className="btn btn-primary btn-block mt-1">Upload</button>
            </form>
        </div>
    );
};

export default MyProposal;