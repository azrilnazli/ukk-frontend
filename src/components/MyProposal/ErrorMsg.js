import React from 'react';

const ErrorMsg = ({title,message}) => {
    return (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
                
                    <span><strong><i class="fas fa-exclamation"></i> {title}</strong> </span>             
           
                    <span className='ms-1'>{message}</span>            
            
        </div>
        // <div className="alert alert-danger d-flex align-items-center" role="alert">
           
        //     <div>
        //     <i class="fas fa-exclamation"></i> <strong>{title}</strong> 
        //     {/* {message} */}
        //     <p>Assalamualaikum dan Salam Sejahtera,</p>

        //     <p>Syarikat masih gagal untuk memenuhi keperluan pendaftaran, dan status masih belum berjaya berdaftar sebagai pembekal yang berdaftar di dalam Sistem RTM TVCMS.</p>

        //     <p>Sila rujuk kepada Urusetia TVCMS.</p>

        //     <p>Sekian, terima kasih.</p>
        //     </div>
        // </div>
    );
};

export default ErrorMsg;