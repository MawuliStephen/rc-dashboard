// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Modal from 'react-modal';
// import axios from 'axios';

// const API = process.env.REACT_APP_BASE_URL;

// const BuyAdmissionForm = () => {
//     // const { userData, error, loading } = useApi(); // Assume useApi fetches user data
//     const [selectedForm, setSelectedForm] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [acceptTerms, setAcceptTerms] = useState(false);
//     const [purchaseSuccess, setPurchaseSuccess] = useState(false);
//     const [checkoutUrl, setCheckoutUrl] = useState('');
//     const [formData, setFormData] = useState({
//         type: '',
//         admission_cost: 0
//     });
//     const [purchaseError, setPurchaseError] = useState(null);

//     // Function to handle form selection
//     const handleFormSelect = (form) => {
//         setSelectedForm(form);
//         setFormData({
//             type: form.type,
//             admission_cost: form.admission_cost
//         });
//         setShowModal(true);
//     };

//     // Function to handle form purchase and call the API endpoint
//     const handleFormPurchase = async () => {
//         if (!acceptTerms) {
//             alert('Please accept the terms and conditions to proceed.');
//             return;
//         }

//         try {
//             // Make the API call to purchase the selected form
//             const response = await axios.post(`${API}/buy-admission-forms`, {
//                 type: formData.type,
//                 admission_cost: formData.admission_cost
//             });
//             setCheckoutUrl(response.data.checkout_url); // Set the checkout URL from the backend response
//             setPurchaseSuccess(true);
//         } catch (error) {
//             console.error('Error purchasing form:', error);
//             setPurchaseError(error.response?.data?.message || 'Error during purchase'); // Handle error from backend
//         }
//     };

//     return (
//         <div>
//             {loading && <p>Loading...</p>}
//             {error && <p>Error fetching userData: {error.message}</p>}
            
//             <h2>Admission Forms:</h2>
//             <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1">
//                 {userData && userData.forms && userData.forms.map(form => (
//                     <div key={form.id}>
//                         <div className="card p-4 mb-5">
//                             <span>
//                                 <p>You are buying <b>{form.type}</b> and the cost is ${form.admission_cost}</p>
//                             </span>
//                             <button onClick={() => handleFormSelect(form)}>Buy</button>
//                             <br />
//                             <Link to={form.id}>Instructions</Link>
//                         </div>
//                     </div>
//                 ))}
//                 <Container className="py-5">

// <h3 className="text-center mb-4">Choose Your Admission Form</h3>

// {/* Display loading spinner */}
// {loading && <Spinner animation="border" variant="primary" className="d-block mx-auto" />}

// {/* Display error message */}
// {error && <p className="text-danger text-center">{error}</p>}

// {/* Buy Admission Form Section */}
// <div className="d-flex flex-wrap justify-content-center">
//     {forms.length > 0 ? (
//         forms.map((form) => (
//             <Card key={form.id} style={{ width: '18rem', margin: '10px' }}>
//                 <Card.Body>
//                     <Card.Title>{form.name}</Card.Title>
//                     <Card.Text>Type: {form.type}</Card.Text>
//                     <Card.Text>Admission Cost: ${form.admission_cost}</Card.Text>
//                     <Card.Text>Tuition Fee: ${form.tuition_fee}</Card.Text>
//                     <Link to={`/buy-form/${form.id}`}>
//                         <Button variant="primary">Buy {form.name} Form</Button>
//                     </Link>
//                 </Card.Body>
//             </Card>
//         ))
//     ) : (
//         !loading && <p>No forms available at the moment.</p>
//     )}
// </div>
// </Container>
//             </div>

//             {/* Modal to display form details and purchase */}
//             <Modal isOpen={showModal}>
//                 {purchaseSuccess ? (
//                     <div className="modal-content">
//                         <h2>Completing your Form Purchase!</h2>
//                         <p>Pay to complete your {formData.type} form purchase.</p>

//                         {checkoutUrl && (
//                             <button onClick={() => window.open(checkoutUrl, '_blank')} rel="noopener noreferrer">
//                                 Pay With Paystack
//                             </button>
//                         )}

//                         <button onClick={() => setShowModal(false)}>Close</button>
//                     </div>
//                 ) : (
//                     <div className="react-modal-overlay">
//                         <div className="modal-content">
//                             <p>You are buying</p>
//                             <h2>{formData.type}</h2>
//                             <p>Cost of Admission Form: ${formData.admission_cost}</p>

//                             <Link to="#tnc">Terms and conditions</Link>

//                             <label>
//                                 <input
//                                     type="checkbox"
//                                     checked={acceptTerms}
//                                     onChange={() => setAcceptTerms(!acceptTerms)}
//                                 />
//                                 I accept the terms and conditions
//                             </label>

//                             <div className="d-flex button-group justify-space-between">
//                                 <button onClick={handleFormPurchase}>Check out</button>
//                                 <button onClick={() => setShowModal(false)}>Cancel</button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </Modal>
//         </div>
//     );
// };

// export { BuyAdmissionForm };
