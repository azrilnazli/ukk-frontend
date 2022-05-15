import React,{ useState, useEffect } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
//import apiClient from '../../services/api';
//import { Redirect } from 'react-router-dom';
//import UserData from '../Widgets/UserData';
import CheckData from '../MyCompany/CheckData';
import RequestForApproval from '../MyCompany/RequestForApproval';
import ApprovalStatus from '../MyCompany/ApprovalStatus';
import Comment from '../MyCompany/Comment';

const Dashboard = () => {

  function Alert() {
    const [show, setShow] = useState(true);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}
  
        <Modal show={show} size="lg" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>MAKLUMAN</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <p>
          MAKLUMAN: Pendaftaran syarikat bagi pembekalan swasta & sambung siri 2023 akan tamat pada Jam 11:59 malam, 14 Mei 2022
          </p>
      
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

      
    <div className='container container-fluid bg-light rounded p-3'>
    <div className="row align-items-start pe-3">

      <div className="col-lg-6">
    
        <div className="alert alert-warning " role="alert">
         <h2><i className="fa fa-exclamation-triangle"></i> Info Terkini</h2>
           <p>
            Assalamualaikum & Salam Sejahtera kepada syarikat-syarikat yang telah mendapat pengesahan pendaftaran pada sistem RTM UKK TVCMS.
            <br />
            <br />
            Untuk makluman, pihak Urusetia mengambil kira cuti umum Wesak dan kerja-Kerja kemaskini yang sedang dijalankan oleh pihak teknikal sistem RTM UKK TVCMS bagi memastikan kelancaran proses penyerahan proposal secara muat naik dalam talian pada Sistem RTM UKK TVCMS dapat dilakukan, maka tarikh baru penyerahan proposal akan bermula pada Selasa 17 Mei 2022 Hingga Ahad 22 Mei 2022.
            <br />
            <br />
            Pihak syarikat yang telah mendapat pengesahan pendaftaran boleh  mengakses semula ke Sistem RTM UKK TVCMS mulai tarikh berkenaan. 
            <br />
            <br />
            Harap Maklum.
            <br />
            <br />
            Sekian, Terima Kasih.<br />
            Urusetia, Unit Kandungan Kreatif (UKK),<br />
            Radio Televisyen Malaysia (RTM)<br />
           </p>
          </div> 

          <div className="alert alert-warning text-danger" role="alert">
          <i className="fa fa-exclamation-triangle"></i> MAKLUMAN: Pendaftaran syarikat bagi pembekalan swasta & sambung siri 2023 akan tamat pada Jam 11:59 malam, 14/Mei/2022
          </div> 

          {/* <div className="alert alert-primary" role="alert">
          <i className='fas fa-exclamation-triangle' style={{color: 'red'}}></i> Please install Adobe Acrobat Reader.
          </div> */}


          <div className='row'>
            <ApprovalStatus />
          </div>
          <div className='row'>
            <Comment />
          </div>
        </div>

      <div className="col-lg-6">
        <div className='row'>

{/* 
          <div className="alert alert-primary" role="alert">
          New message from UKK.
          </div>
          <div className="alert alert-primary" role="alert">
          You've submitted for Approval to UKK.
          </div> */}

          <div className="card border-light">
   
            <div className="card-body">
              
              <h5 className="card-title">Company Profile</h5>
              <p className="card-text">Please complete all the required fields before you're able to apply for approval.
              Please check the minimal requirements for submission.</p>
              <ul className='list-group mb-3'>
                  <CheckData module="check_profile" title="Profile" />
                  <CheckData module="check_board_of_directors" title="Board Of Directors" />
                  <CheckData module="check_experiences" title="Experiences" />

                  <CheckData module="check_ssm" title="SSM" />
                  <CheckData module="check_mof" title="MOF" />

                  <CheckData module="check_finas_fp" title="FINAS (PF)" />
                  {/* <CheckData module="check_finas_fd" title="FINAS (DF)" /> */}

                  <CheckData module="check_kkmm_swasta" title="KKMM ( Swasta )" />
                  {/* <CheckData module="check_kkmm_syndicated" title="KKMM ( Syndicated )" /> */}
                
                  {/* <CheckData module="check_bumiputera" title="Bumiputera Status" /> */}
                  <CheckData module="check_audit" title="Audit Informations" />
                  <CheckData module="check_bank" title="Banking Informations" />
                  {/* <CheckData module="check_credit" title="Credit Facilities" /> */}
              </ul>
              <div className="d-flex justify-content-end">
                <RequestForApproval />
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>



      

    </div>
    );
};

export default Dashboard;
