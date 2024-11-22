import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import logo from '../../../../assets/logo.png';
import { useParams } from 'react-router-dom';
import {  Card, Container, Spinner, Alert } from 'react-bootstrap';

const API = process.env.REACT_APP_BASE_URL;

const FormReceipt = () => {
    const { reference } = useParams();
    const [receipt, setReceipt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const qrRef = useRef(null); // Reference for QR code container

    useEffect(() => {
        const fetchFormReceipt = async () => {
            try {
                const res = await axios.get(`${API}/openroute/success/${reference}`);
                setReceipt(res.data.receipt);
            } catch (err) {
                setError('Error fetching receipt data. Please try again later.');
                console.error('Error fetching receipt data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFormReceipt();
    }, [reference]);

    const generatePDF = async () => {
        if (!receipt) return;

        const doc = new jsPDF();
        const logoUrl = logo;

        // Convert QR code to an image
        const qrCodeCanvas = qrRef.current.querySelector('canvas');
        const qrImage = await html2canvas(qrCodeCanvas).then(canvas => canvas.toDataURL('image/png'));

        // Add header with logo, title, and QR code
        doc.addImage(logoUrl, 'PNG', 155, 10, 45, 20);
        doc.addImage(qrImage, 'PNG', 10, 10, 20, 20);
        doc.setFontSize(18);
        doc.text('Receipt', 105, 15, { align: 'center' });
        doc.setFontSize(10);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 20, { align: 'center' });

        // Horizontal line
        doc.setLineWidth(0.5);
        doc.line(10, 35, 200, 35);
        // doc.line(0, 35, 200, 35);


        // Receipt details
        doc.setFontSize(12);
        const detailsY = 60;
        doc.text(`Status: ${receipt.status}`, 10, detailsY);
        doc.text(`Reference: ${receipt.reference}`, 10, detailsY + 10);
        doc.text(`Receipt Number: ${receipt.receipt_number}`, 10, detailsY + 20);
        // doc.text(`Amount: $${receipt.amount}`, 10, detailsY + 30);
        doc.text(`Amount: Ghs${receipt.amount}`, 10, detailsY + 30);

        doc.text(`Channel: ${receipt.channel}`, 10, detailsY + 40);
        doc.text(`Currency: ${receipt.currency}`, 10, detailsY + 50);
        doc.text(`Bank: ${receipt.bank}`, 10, detailsY + 60);

        // Watermark
        doc.setTextColor(200);
        doc.setFontSize(40);
        doc.text (`Status: ${receipt.status}`, 105, 120, { align: 'center', angle: 45 });
        doc.setTextColor(0);

        // Footer with organization info
        doc.setLineWidth(0.5);
        doc.line(10, 140, 200, 140);
        doc.setFontSize(10);
        doc.text('Royal Institute of Science and Technology', 10, 150);
        doc.text('Contact: +123456789', 105, 150, { align: 'center' });
        doc.text(`Year: ${new Date().getFullYear()}`, 200, 150, { align: 'right' });

        // Save PDF
        doc.save('receipt.pdf');
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    // return (
    //     <Container className="mt-5 form-receipt">
    //         <Card className="p-3">
    //             <div className="d-flex align-items-center justify-content-between mb-2">
    //                 <div ref={qrRef}>
    //                     <QRCodeCanvas value={receipt.reference} size={64} />
    //                 </div>
    //                 <h3 className="text-center m-0">Receipt</h3>
    //                 <img src={logo} alt="logo" width="100" />
    //             </div>
    //             <hr />
    //             <Card.Body>
    //                 {receipt ? (
    //                     <div className="receipt-details">
    //                         <p><strong>Status:</strong> {receipt.status}</p>
    //                         <p><strong>Reference:</strong> {receipt.reference}</p>
    //                         <p><strong>Receipt Number:</strong> {receipt.receipt_number}</p>
    //                         <p><strong>Amount:</strong> ${receipt.amount}</p>
    //                         <p><strong>Channel:</strong> {receipt.channel}</p>
    //                         <p><strong>Currency:</strong> {receipt.currency}</p>
    //                         <p><strong>Bank:</strong> {receipt.bank}</p>
    //                     </div>
    //                 ) : (
    //                     <p>No receipt data available.</p>
    //                 )}
    //             </Card.Body>
    //             <hr />
    //             <div className="footer">
    //                 <p>Organization Name</p>
    //                 <p>Contact: +123456789</p>
    //                 <p>{new Date().getFullYear()}</p>
    //             </div>
    //         </Card>
    //         <div className="pt-4 d-flex justify-content-between">
    //             <Button variant="primary" onClick={generatePDF}>Download</Button>
    //             <Button variant="secondary" onClick={() => window.print()}>Print</Button>
    //         </div>
    //     </Container>
    // );

    return (
        <Container className="mt-5 form-receipt">
            <div className=' printable-receipt'>
            <Card className="p-3 ">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <div ref={qrRef}>
                        <QRCodeCanvas value={receipt.reference} size={64} />
                    </div>
                    <h3 className="text-center m-0">Receipt</h3>
                    <img src={logo} alt="logo" width="100" />
                </div>
                <hr />
                <Card.Body>
                    {receipt ? (
                        <div className="receipt-details">
                            <p><strong>Status:</strong> {receipt.status}</p>
                            <p><strong>Reference:</strong> {receipt.reference}</p>
                            <p><strong>Receipt Number:</strong> {receipt.receipt_number}</p>
                            <p><strong>Amount:</strong> Ghs {receipt.amount}</p>
                            <p><strong>Channel:</strong> {receipt.channel}</p>
                            <p><strong>Currency:</strong> {receipt.currency}</p>
                            <p><strong>Bank:</strong> {receipt.bank}</p>
                        </div>
                    ) : (
                        <p>No receipt data available.</p>
                    )}
                </Card.Body>
                <hr />
                <div className="footer">
                    <p>Royal Institute of Science and Technology</p>
                    <p>Contact: +123456789</p>
                    <p>{new Date().getFullYear()}</p>
                </div>
            </Card>
            </div>

            <div className="pt-4 d-flex ">
             <button onClick={generatePDF} className="primary-button  mr-4"> Download  </button>

             <button className=' secondary-button'  onClick={() => window.print()}>Print </button>

                {/* <Button variant="primary" onClick={generatePDF}>Download</Button>
                <Button variant="secondary" onClick={() => window.print()}>Print</Button> */}
            </div>
        </Container>
    );
    
};

export default FormReceipt;


// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import JsBarcode from 'jsbarcode';
// import html2canvas from 'html2canvas';
// import logo from '../../../../assets/logo.png';
// import { useParams } from 'react-router-dom';
// import { Button, Card, Container, Spinner, Alert } from 'react-bootstrap';
// // import './FormReceipt.css';

// const API = process.env.REACT_APP_BASE_URL;

// const FormReceipt = () => {
//     const { reference } = useParams();
//     const [receipt, setReceipt] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const barcodeRef = useRef(null); // Reference for barcode canvas

//     useEffect(() => {
//         const fetchFormReceipt = async () => {
//             try {
//                 const res = await axios.get(`${API}/openroute/success/${reference}`);
//                 setReceipt(res.data.receipt);
//             } catch (err) {
//                 setError('Error fetching receipt data. Please try again later.');
//                 console.error('Error fetching receipt data:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchFormReceipt();
//     }, [reference]);

//     useEffect(() => {
//         // Generate the barcode based on receipt reference if available
//         if (receipt && barcodeRef.current) {
//             JsBarcode(barcodeRef.current, receipt.reference, {
//                 format: 'CODE128',
//                 displayValue: true,
//                 fontSize: 14,
//             });
//         }
//     }, [receipt]);

//     const generatePDF = async () => {
//         if (!receipt) return;

//         const doc = new jsPDF();
//         const logoUrl = logo;

//         // Convert barcode canvas to an image
//         const barcodeCanvas = barcodeRef.current;
//         const barcodeImage = await html2canvas(barcodeCanvas).then(canvas => canvas.toDataURL('image/png'));

//         // Add header with logo, title, and barcode
//         doc.addImage(logoUrl, 'PNG', 160, 10, 30, 30);
//         doc.addImage(barcodeImage, 'PNG', 10, 10, 50, 20);
//         doc.setFontSize(18);
//         doc.text('Receipt', 105, 25, { align: 'center' });
//         doc.setFontSize(12);
//         doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 35, { align: 'center' });

//         // Horizontal line
//         doc.setLineWidth(0.5);
//         doc.line(10, 45, 200, 45);

//         // Receipt details
//         doc.setFontSize(12);
//         const detailsY = 60;
//         doc.text(`Status: ${receipt.status}`, 10, detailsY);
//         doc.text(`Reference: ${receipt.reference}`, 10, detailsY + 10);
//         doc.text(`Receipt Number: ${receipt.receipt_number}`, 10, detailsY + 20);
//         doc.text(`Amount: $${receipt.amount}`, 10, detailsY + 30);
//         doc.text(`Channel: ${receipt.channel}`, 10, detailsY + 40);
//         doc.text(`Currency: ${receipt.currency}`, 10, detailsY + 50);
//         doc.text(`Bank: ${receipt.bank}`, 10, detailsY + 60);

//         // Watermark
//         doc.setTextColor(200);
//         doc.setFontSize(40);
//         doc.text('CONFIDENTIAL', 105, 120, { align: 'center', angle: 45 });
//         doc.setTextColor(0);

//         // Footer with organization info
//         doc.setLineWidth(0.5);
//         doc.line(10, 140, 200, 140);
//         doc.setFontSize(10);
//         doc.text('Organization Name', 10, 150);
//         doc.text('Contact: +123456789', 105, 150, { align: 'center' });
//         doc.text(`Year: ${new Date().getFullYear()}`, 200, 150, { align: 'right' });

//         // Save PDF
//         doc.save('receipt.pdf');
//     };

//     if (loading) {
//         return (
//             <Container className="text-center mt-5">
//                 <Spinner animation="border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </Spinner>
//             </Container>
//         );
//     }

//     if (error) {
//         return (
//             <Container className="text-center mt-5">
//                 <Alert variant="danger">{error}</Alert>
//             </Container>
//         );
//     }

//     return (
//         <Container className="mt-5 form-receipt">
//             <Card className="p-3">
//                 <div className="d-flex align-items-center justify-content-between mb-2">
//                     <img src={logo} alt="logo" width="100" />
//                     <h3 className="text-center m-0">Receipt</h3>
//                     <canvas ref={barcodeRef} style={{ width: 100, height: 50 }} /> {/* Barcode Canvas */}

//                 </div>
//                 <hr />
//                 <Card.Body>
//                     {receipt ? (
//                         <div className="receipt-details">
//                             <p><strong>Status:</strong> {receipt.status}</p>
//                             <p><strong>Reference:</strong> {receipt.reference}</p>
//                             <p><strong>Receipt Number:</strong> {receipt.receipt_number}</p>
//                             <p><strong>Amount:</strong> ${receipt.amount}</p>
//                             <p><strong>Channel:</strong> {receipt.channel}</p>
//                             <p><strong>Currency:</strong> {receipt.currency}</p>
//                             <p><strong>Bank:</strong> {receipt.bank}</p>
//                         </div>
//                     ) : (
//                         <p>No receipt data available.</p>
//                     )}
//                 </Card.Body>
//                 <hr />
//                 <div className="footer">
//                     <p>Organization Name</p>
//                     <p>Contact: +123456789</p>
//                     <p>{new Date().getFullYear()}</p>
//                 </div>
//             </Card>
//             <div className="pt-4 d-flex justify-content-between">
//                 <Button variant="primary" onClick={generatePDF}>Download</Button>
//                 <Button variant="secondary" onClick={() => window.print()}>Print</Button>
//             </div>
//         </Container>
//     );
// };

// export default FormReceipt;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import jsPDF from 'jspdf';
// // import logo from '../../../../assets/logo.png';
// // import barcode from '../../../../assets/logos/logo192.png'; // Import barcode image
// // import { useParams } from 'react-router-dom';
// // import { Button, Card, Container, Spinner, Alert } from 'react-bootstrap';
// // // import './FormReceipt.css'; // Create a CSS file for styling

// // const API = process.env.REACT_APP_BASE_URL;

// // const FormReceipt = () => {
// //     const { reference } = useParams();
// //     const [receipt, setReceipt] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         const fetchFormReceipt = async () => {
// //             try {
// //                 const res = await axios.get(`${API}/openroute/success/${reference}`);
// //                 setReceipt(res.data.receipt);
// //             } catch (err) {
// //                 setError('Error fetching receipt data. Please try again later.');
// //                 console.error('Error fetching receipt data:', err);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchFormReceipt();
// //     }, [reference]);

// //     const generatePDF = () => {
// //         if (!receipt) return;

// //         const doc = new jsPDF();
// //         const logoUrl = logo;
// //         const barcodeUrl = barcode;

// //         // Add header with logo, title, and barcode
// //         doc.addImage(logoUrl, 'PNG', 160, 10, 30, 30);
// //         doc.addImage(barcodeUrl, 'PNG', 10, 10, 30, 30);
// //         doc.setFontSize(18);
// //         doc.text('Receipt', 105, 25, { align: 'center' });
// //         doc.setFontSize(12);
// //         doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 35, { align: 'center' });

// //         // Horizontal line
// //         doc.setLineWidth(0.5);
// //         doc.line(10, 45, 200, 45);

// //         // Receipt details
// //         doc.setFontSize(12);
// //         const detailsY = 60;
// //         doc.text(`Status: ${receipt.status}`, 10, detailsY);
// //         doc.text(`Reference: ${receipt.reference}`, 10, detailsY + 10);
// //         doc.text(`Receipt Number: ${receipt.receipt_number}`, 10, detailsY + 20);
// //         doc.text(`Amount: $${receipt.amount}`, 10, detailsY + 30);
// //         doc.text(`Channel: ${receipt.channel}`, 10, detailsY + 40);
// //         doc.text(`Currency: ${receipt.currency}`, 10, detailsY + 50);
// //         doc.text(`Bank: ${receipt.bank}`, 10, detailsY + 60);

// //         // Watermark
// //         doc.setTextColor(200);
// //         doc.setFontSize(40);
// //         doc.text('CONFIDENTIAL', 105, 120, { align: 'center', angle: 45 });
// //         doc.setTextColor(0);

// //         // Footer with organization info
// //         doc.setLineWidth(0.5);
// //         doc.line(10, 140, 200, 140);
// //         doc.setFontSize(10);
// //         doc.text('Organization Name', 10, 150);
// //         doc.text('Contact: +123456789', 105, 150, { align: 'center' });
// //         doc.text(`Year: ${new Date().getFullYear()}`, 200, 150, { align: 'right' });

// //         // Save PDF
// //         doc.save('receipt.pdf');
// //     };

// //     if (loading) {
// //         return (
// //             <Container className="text-center mt-5">
// //                 <Spinner animation="border" role="status">
// //                     <span className="visually-hidden">Loading...</span>
// //                 </Spinner>
// //             </Container>
// //         );
// //     }

// //     if (error) {
// //         return (
// //             <Container className="text-center mt-5">
// //                 <Alert variant="danger">{error}</Alert>
// //             </Container>
// //         );
// //     }

// //     return (
// //         <Container className="mt-5 form-receipt">
// //             <Card className="p-3">
// //                 <div className="d-flex align-items-center justify-content-between mb-2">
// //                     <img src={barcode} alt="barcode" width="100" />
// //                     <h3 className="text-center m-0">Receipt</h3>
// //                     <img src={logo} alt="logo" width="100" />
// //                 </div>
// //                 <hr />
// //                 <Card.Body>
// //                     {receipt ? (
// //                         <div className="receipt-details">
// //                             <p><strong>Status:</strong> {receipt.status}</p>
// //                             <p><strong>Reference:</strong> {receipt.reference}</p>
// //                             <p><strong>Receipt Number:</strong> {receipt.receipt_number}</p>
// //                             <p><strong>Amount:</strong> ${receipt.amount}</p>
// //                             <p><strong>Channel:</strong> {receipt.channel}</p>
// //                             <p><strong>Currency:</strong> {receipt.currency}</p>
// //                             <p><strong>Bank:</strong> {receipt.bank}</p>
// //                         </div>
// //                     ) : (
// //                         <p>No receipt data available.</p>
// //                     )}
// //                 </Card.Body>
// //                 <hr />
// //                 <div className="footer">
// //                     <p>Organization Name</p>
// //                     <p>Contact: +123456789</p>
// //                     <p>{new Date().getFullYear()}</p>
// //                 </div>
// //             </Card>
// //             <div className="pt-4 d-flex justify-content-between">
// //                 <Button variant="primary" onClick={generatePDF}>Download</Button>
// //                 <Button variant="secondary" onClick={() => window.print()}>Print</Button>
// //             </div>
// //         </Container>
// //     );
// // };

// // export default FormReceipt;

// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import jsPDF from 'jspdf';
// // // import logo from '../../../../assets/logo.png';
// // // import { useParams } from 'react-router-dom';
// // // import { Button, Card, Container, Spinner, Alert } from 'react-bootstrap';

// // // const API = process.env.REACT_APP_BASE_URL;

// // // const FormReceipt = () => {
// // //     const { reference } = useParams(); // Get reference from URL parameters
// // //     const [receipt, setReceipt] = useState(null);
// // //     const [loading, setLoading] = useState(true);
// // //     const [error, setError] = useState(null);

// // //     useEffect(() => {
// // //         const fetchFormReceipt = async () => {
// // //             try {
// // //                 const res = await axios.get(`${API}/openroute/success/${reference}`);
// // //                 console.log(res);
// // //                 setReceipt(res.data.receipt); // Set receipt data from response
// // //             } catch (err) {
// // //                 setError('Error fetching receipt data. Please try again later.');
// // //                 console.error('Error fetching receipt data:', err);
// // //             } finally {
// // //                 setLoading(false);
// // //             }
// // //         };

// // //         fetchFormReceipt();
// // //     }, [reference]);

// // //     const generatePDF = () => {
// // //         if (!receipt) return;

// // //         const doc = new jsPDF();
// // //         const logoUrl = logo ; // Replace with your logo URL
// // //         // Add logo image
// // //         doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30);

// // //         // Add title and date
// // //         doc.setFontSize(18);
// // //         doc.text('Receipt', 105, 25, null, null, 'center');
// // //         doc.setFontSize(12);
// // //         doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 35, null, null, 'center');

// // //         // Add receipt details
// // //         doc.setFontSize(12);
// // //         doc.text(`Status: ${receipt.status}`, 10, 50);
// // //         doc.text(`Reference: ${receipt.reference}`, 10, 60);
// // //         doc.text(`Receipt Number: ${receipt.receipt_number}`, 10, 70);
// // //         doc.text(`Amount: $${receipt.amount}`, 10, 80);
// // //         doc.text(`Channel: ${receipt.channel}`, 10, 90);
// // //         doc.text(`Currency: ${receipt.currency}`, 10, 100);
// // //         doc.text(`Bank: ${receipt.bank}`, 10, 110);

// // //         // Add watermark
// // //         doc.setTextColor(150);
// // //         doc.setFontSize(40);
// // //         doc.text('CONFIDENTIAL', 105, 150, null, null, 'center');
// // //         doc.setTextColor(0); // Reset text color

// // //         // Save PDF
// // //         doc.save('receipt.pdf');
// // //     };

// // //     if (loading) {
// // //         return (
// // //             <Container className="text-center mt-5">
// // //                 <Spinner animation="border" role="status">
// // //                     <span className="visually-hidden">Loading...</span>
// // //                 </Spinner>
// // //             </Container>
// // //         );
// // //     }

// // //     if (error) {
// // //         return (
// // //             <Container className="text-center mt-5">
// // //                 <Alert variant="danger">{error}</Alert>
// // //             </Container>
// // //         );
// // //     }

// // //     return (
// // //         <Container className="mt-5">
// // //             <Card>
// // //                 <Card.Header>Thanks for your purchase</Card.Header>
// // //                 <Card.Body>
// // //                     {receipt ? (
// // //                         <div>
// // //                             <p><strong>Status:</strong> {receipt.status}</p>
// // //                             <p><strong>Reference:</strong> {receipt.reference}</p>
// // //                             <p><strong>Receipt Number:</strong> {receipt.receipt_number}</p>
// // //                             <p><strong>Amount:</strong> ${receipt.amount}</p>
// // //                             <p><strong>Channel:</strong> {receipt.channel}</p>
// // //                             <p><strong>Currency:</strong> {receipt.currency}</p>
// // //                             <p><strong>Bank:</strong> {receipt.bank}</p>
// // //                         </div>
// // //                     ) : (
// // //                         <p>No receipt data available.</p>
// // //                     )}
// // //                 </Card.Body>
// // //             </Card>
// // //             <div className='pt-4 d-flex '>
// // //             <button onClick={generatePDF} className="primary-button  mr-4"> Download  </button>

// // //             <button className=' secondary-button'  onClick={() => window.print()}>Print </button>

// // //             </div>
          
// // //         </Container>
// // //     );
// // // };

// // // export default FormReceipt;
