import React , { useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import pdf_requirements from './pdf/220420_SYARAT_PENYERTAAN_PEROLEHAN_SWASTA_BAHARU_2023.pdf';
import pdf_need_statement from './pdf/need_statement.pdf';

const Requirements = () => {

    function PDFRequirements() {
        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const [fullscreen, setFullscreen] = React.useState(true);
    
        return (
            <>
            <Button variant="primary" onClick={handleShow}>
             Requirements
            </Button>
      
            <Modal fullscreen={fullscreen}  show={show} size="lg" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>PDF VIEWER</Modal.Title>
              </Modal.Header>
              <Modal.Body>
    
              <embed
                src={pdf_requirements}
                type="application/pdf"
                frameBorder="0"
                scrolling="auto"
                height="100%"
                width="100%"
            ></embed>
          
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
         
              </Modal.Footer>
            </Modal>
          </>
        );
      }

      
    function PDFNeedStatement() {
        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const [fullscreen, setFullscreen] = React.useState(true);
    
        return (
          <>
            <Button variant="primary" onClick={handleShow}>
             NEED STATEMENT
            </Button>
      
            <Modal fullscreen={fullscreen}  show={show} size="lg" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>PDF VIEWER</Modal.Title>
              </Modal.Header>
              <Modal.Body>
    
              <embed
                src={pdf_need_statement}
                type="application/pdf"
                frameBorder="0"
                scrolling="auto"
                height="100%"
                width="100%"
            ></embed>
          
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
         
              </Modal.Footer>
            </Modal>
          </>
        );
      }

    return (
        <>
   

        <div className='container container-fluid bg-light rounded p-3 col-md-12 mt-3'>
            <h1>Syarat Penyertaan</h1>
        <p>
        Sorotan penting daripada dokumen syarat penyertaan perolehan Request for Proposal (RFP) Pembekalan Program TV Terbitan Tempatan (Swasta Baharu) Bagi Tahun 2022/2023
        </p>

        <p>Jumlah maksimum penghantaran proposal yang dibenarkan adalah seperti berikut:</p>
        <ol>
            <li>Perolehan <b>Swasta Baharu: 2 Tajuk</b> untuk mana-mana Kategori</li>
            <li>Perolehan <b>Sambung Siri : 1 Tajuk</b></li>
        </ol>

        <p>
        Dokumen-dokumen rujukan penting bagi semua pembekal bagi memastikan mematuhi keperluan pembekalan seperti yang tersiar di laman sesawang KKMM, sebelum memuatnaik proposal di dalam bentuk Video Trailer atau/dan dokumen PDF
        </p>

        <ol>
            <li>Dokumen-dokumen rujukan penting bagi semua pembekal bagi memastikan mematuhi keperluan pembekalan seperti yang tersiar di laman sesawang KKMM, sebelum memuatnaik proposal di dalam bentuk Video Trailer atau/dan dokumen PDF</li>
            <li>Keperluan Perolehan Program TV Tempatan (Swasta Baharu & Sambung Siri) Bagi 2022 / 2023</li>
        </ol>

        <p>Langkah-langkah penting bagi muat-naik proposal:</p>

        <ol>
            <li>Memilih kod program yang betul dengan tepat mengikut “Need Statement” seperti tersenarai di dalam sistem TVCMS:

                <ul>
                  
                   <li>	Saluran </li>
                   <li>	Kategori </li>
                   <li>	Kod Kategori </li>
                   <li>	Bahasa </li>
                   <li>	Jumlah Episod </li>
                   <li>	Durasi </li>
                   <li>	Need Statement </li>

                </ul>
            </li>

            <li>Memasukkan maklumat seperti dibawah yang diperlukan bagi setiap penyerahan sebelum melampirkan dan memuatnaik konten proposal di dalam format video atau/dan PDF dokumen. 
            <ul>
                  
                  <li>	Tema </li>
                  <li>	Genre </li>
                  <li>  Konsep </li>
                  <li>	Sinopsis </li>
          
               </ul>

            </li>
        </ol>


        <div className="d-flex bf-highlight">
            <div className="p-2 bd-highlight"> <PDFRequirements /></div>
            <div className="p-2 bd-highlight"> <PDFNeedStatement /></div>
        </div>
      
        {/* <ShowPDFDocument title="Syarat Penyertaan" file={pdf_requirements}/>
        <ShowPDFDocument title="Need Statements" file={pdf_need_statement}/> */}
        </div>
        </>
    );
};

export default Requirements;