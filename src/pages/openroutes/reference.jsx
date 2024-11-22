import React from 'react';
// import jsPDF from 'jspdf';
import FormReceipt from './openapi/receipts/formReceipt';

const Reference = () => {
  
  

  return (
    <div className="container center">
        <FormReceipt/>

    </div>
  );
};
export default Reference;


// import React from 'react';
// import jsPDF from 'jspdf';
// import FormReceipt from './openapi/receipts/formReceipt';

// const Reference = ({ receiptDetails }) => {
  
//   const generatePDF = () => {
//     const doc = new jsPDF();

//     // Use the provided receipt details or fallback values
//     const { reference, date, amount, email, phone } = receiptDetails || {
//       reference: 'REF123456',
//       date: new Date().toLocaleDateString(),
//       amount: '100.00',
//       email: 'user@example.com',
//       phone: '123-456-7890'
//     };

//     // Add receipt details to the PDF
//     doc.setFontSize(16);
//     doc.text('Receipt', 10, 10);
//     doc.setFontSize(12);
//     doc.text(`Reference: ${reference}`, 10, 20);
//     doc.text(`Date: ${date}`, 10, 30);
//     doc.text(`Amount: $${amount}`, 10, 40);
//     doc.text(`Email: ${email}`, 10, 50);
//     doc.text(`Phone: ${phone}`, 10, 60);

//     // Save the PDF as "receipt.pdf"
//     doc.save('receipt.pdf');
//   };

//   return (
//     <div className="container center">
//         <FormReceipt/>
        
//       <h2>Receipt Details</h2>
//       <div className="receipt-info">
//         <p><strong>Reference:</strong> {receiptDetails?.reference || 'REF123456'}</p>
//         <p><strong>Date:</strong> {receiptDetails?.date || new Date().toLocaleDateString()}</p>
//         <p><strong>Amount:</strong> ${receiptDetails?.amount || '100.00'}</p>
//         <p><strong>Email:</strong> {receiptDetails?.email || 'user@example.com'}</p>
//         <p><strong>Phone:</strong> {receiptDetails?.phone || '123-456-7890'}</p>
//       </div>
//       <button onClick={generatePDF} className="btn btn-primary">
//         Download Receipt
//       </button>
//     </div>
//   );
// };

// export default Reference;

// // import React from 'react';
// // import jsPDF from 'jspdf';

// // const Reference = ({ receiptDetails }) => {
  
// //   const generatePDF = () => {
// //     const doc = new jsPDF();

// //     // Set company logo (replace with a base64-encoded image or a placeholder)
// //     const logoBase64 = "data:image/png;base64,..."; // Add base64 logo image here

// //     // Use provided receipt details or default values
// //     const { reference, date, amount, email, phone } = receiptDetails || {
// //       reference: 'REF123456',
// //       date: new Date().toLocaleDateString(),
// //       amount: '100.00',
// //       email: 'user@example.com',
// //       phone: '123-456-7890'
// //     };

// //     // Add header and logo
// //     doc.addImage(logoBase64, 'PNG', 10, 10, 30, 30); // Logo positioned at top left
// //     doc.setFontSize(20);
// //     doc.text('Company Name', 50, 20); // Company name or header
// //     doc.setFontSize(12);
// //     doc.text('Official Receipt', 50, 30);

// //     // Watermark
// //     doc.setTextColor(150);
// //     doc.setFontSize(40);
// //     doc.text('CONFIDENTIAL', 35, 150, { angle: 45, opacity: 0.1 });
// //     doc.setTextColor(0); // Reset text color

// //     // Receipt details
// //     doc.setFontSize(16);
// //     doc.text('Receipt Details', 10, 50);
// //     doc.setFontSize(12);
// //     doc.text(`Reference: ${reference}`, 10, 60);
// //     doc.text(`Date: ${date}`, 10, 70);
// //     doc.text(`Amount: $${amount}`, 10, 80);
// //     doc.text(`Email: ${email}`, 10, 90);
// //     doc.text(`Phone: ${phone}`, 10, 100);

// //     // Footer
// //     doc.setFontSize(10);
// //     doc.text('Thank you for your purchase!', 10, 130);
// //     doc.text('Company Address | Contact: +123 456 7890', 10, 140);

// //     // Save the PDF as "receipt.pdf"
// //     doc.save('receipt.pdf');
// //   };

// //   return (
// //     <div className="container">
// //       <h2>Receipt Details</h2>
// //       <div className="receipt-info">
// //         <p><strong>Reference:</strong> {receiptDetails?.reference || 'REF123456'}</p>
// //         <p><strong>Date:</strong> {receiptDetails?.date || new Date().toLocaleDateString()}</p>
// //         <p><strong>Amount:</strong> ${receiptDetails?.amount || '100.00'}</p>
// //         <p><strong>Email:</strong> {receiptDetails?.email || 'user@example.com'}</p>
// //         <p><strong>Phone:</strong> {receiptDetails?.phone || '123-456-7890'}</p>
// //       </div>
// //       <button onClick={generatePDF} className="btn btn-primary">
// //         Download Receipt
// //       </button>
// //     </div>
// //   );
// // };

// // export default Reference;

// // // import React from "react";
// // // // import { AdmissionFormData } from "../../api/AdmissionFormController.js/admissionFormData";
// // // // import DocumentTitle from "../../components/DocumentTitle";
// // // // export {AdmissionFormData}


// // // const Reference = () => {

// // //   return (
// // //     <div className="container">

// // //     download receipt
// // //     </div>
// // //   );
// // // };

// // // export default Reference;
