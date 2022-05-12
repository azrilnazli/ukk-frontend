import React , { useState }  from 'react';
import apiClient from '../../services/api';
import Progress from './Progress';
const collect = require('collect.js'); 

const Pdf = () => {

    const [file,setFile] = useState('');
    const [filename,setFilename] = useState('Choose file');
    const [uploaded, setUploaded] = useState('');
    const [errors, setErrors] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

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
            onUploadProgress: progressEvent => {
               setUploadPercentage(
                   parseInt(
                            Math.round(
                                        (progressEvent.loaded * 100 ) / (progressEvent.total)
                                    )
                            )
                    );
                
                    // clear percentage
                setTimeout( () => setUploadPercentage(0), 10000 );
            }

            
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
        <>
        <div className='container container-fluid bg-light rounded p-3 col-md-12 mt-5'>
      
            <div class="alert alert-secondary" role="alert">
                <h4 class="alert-heading">PDF</h4>
                <p>Please compress the video before uploading. Accepted codecs are H264/MP3 with .mov and .mp4 container.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input 
                    type="file"
                    accept="video/mp4,video/x-m4v,video/*"
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
                <div className="col-12 mb-3">
                <Progress percentage={uploadPercentage} />
                </div>
            <button type="submit" className="btn btn-primary btn-block mt-1">Upload</button>
            </form>
        </div>


</>

        
    );
};

export default Pdf;