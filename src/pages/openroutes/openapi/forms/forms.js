// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { Button, Card, Container, Spinner, Modal, Form } from 'react-bootstrap';

// const API = process.env.REACT_APP_BASE_URL;

// function Forms() {
//     const [forms, setForms] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedForm, setSelectedForm] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [acceptTerms, setAcceptTerms] = useState(false);
//     const [purchaseSuccess, setPurchaseSuccess] = useState(false);
//     const [checkoutUrl, setCheckoutUrl] = useState('');
//     const [purchaseError, setPurchaseError] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false); // track if the user is logged in
//     const [email, setEmail] = useState(''); // collect email if user is not logged in
//     const [phone, setPhone] = useState(''); // collect phone number if user is not logged in

//     // Fetch forms data
//     useEffect(() => {
//         const fetchForms = async () => {
//             try {
//                 const res = await axios.get(`${API}/openroute/admission-forms`);
//                 setForms(res.data.forms);
//             } catch (err) {
//                 setError('Error fetching forms data. Please try again later.');
//                 console.error('Error fetching forms data:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchForms();
//     }, []);

//     // Function to handle form selection
//     const handleFormSelect = (form) => {
//         setSelectedForm(form);
//         setShowModal(true);
//     };

//     // Function to handle form purchase
//     const handleFormPurchase = async () => {
//         if (!acceptTerms) {
//             alert('Please accept the terms and conditions to proceed.');
//             return;
//         }

//         // Prepare the request body data
//         const dataToSend = {
//             formType: selectedForm.type, // The type of form being purchased
//             admissionFee: selectedForm.admission_cost, // Admission cost from the selected form
//             email: isAuthenticated ? '' : email, // If authenticated, email will be fetched from the user session (else use the entered email)
//             phone: isAuthenticated ? '' : phone, // If authenticated, phone will be fetched from the user session (else use the entered phone)
//         };

//         try {
//             // Send the form data for purchase
//             const response = await axios.post(`${API}/openroute/buy-admission-forms`, dataToSend);

//             // Process the response from the backend
//             if (response.data.checkout_url) {
//                 setCheckoutUrl(response.data.checkout_url); // Set the checkout URL for payment
//                 setPurchaseSuccess(true);
//             }
//         } catch (error) {
//             console.error('Error purchasing form:', error);
//             setPurchaseError(error.response?.data?.message || 'Error during purchase');
//         }
//     };

//     return (
//         <Container className="py-5">
//             <h3 className="text-center mb-4">Choose Your Admission Form</h3>

//             {loading && <Spinner animation="border" variant="primary" className="d-block mx-auto" />}
//             {error && <p className="text-danger text-center">{error}</p>}

//             <div className="d-flex flex-wrap justify-content-center">
//                 {forms.length > 0 ? (
//                     forms.map((form) => (
//                         <Card key={form.id} style={{ width: '18rem', margin: '10px' }}>
//                             <Card.Body>
//                                 <Card.Title>{form.name}</Card.Title>
//                                 <Card.Text>Type: {form.type}</Card.Text>
//                                 {/* <Card.Text>Admission Cost: ${form.admission_cost}</Card.Text> */}
//                                 {/* <Card.Text>Admission Cost: ₵{form.admission_cost}</Card.Text> */}

//                                 <Card.Text>Admission Cost: ₵{form.admission_cost.toLocaleString()}</Card.Text>

//                                 {/* <Card.Text>Tuition Fee: ${form.tuition_fee}</Card.Text> */}
//                                 {/* <Button variant="primary" onClick={() => handleFormSelect(form)}> */}
//                                 <button className="primary-button mt-4"  type="submit" onClick={() => handleFormSelect(form)}  disabled={loading}>
//                                     Buy {form.type} Form                     </button>
//                             </Card.Body>
//                         </Card>
//                     ))
//                 ) : (
//                     !loading && <p>No forms available at the moment.</p>
//                 )}
//             </div>

//             {/* Modal for purchasing the form */}
//             <Modal show={showModal} onHide={() => setShowModal(false)}>
//                 {purchaseSuccess ? (
//                     <Modal.Body>
//                         <h2>Completing your Form Purchase!</h2>
//                         <p>Pay to complete your {selectedForm?.type} form purchase.</p>
//                         {checkoutUrl && (
//                             <Button
//                                 variant="primary"
//                                 onClick={() => window.open(checkoutUrl, '_blank')}
//                                 rel="noopener noreferrer"
//                             >
//                                 Pay With Paystack
//                             </Button>
//                         )}
//                         <Button variant="secondary" onClick={() => setShowModal(false)}>
//                             Close
//                         </Button>
//                     </Modal.Body>
//                 ) : (
//                     <Modal.Body>
//                         <p>You are buying</p>
//                         <h2>{selectedForm?.type}</h2>
//                         <p>Cost of Admission Form: ${selectedForm?.admission_cost}</p>

//                         {!isAuthenticated && (
//                             <>
//                                 <Form.Group>
//                                     {/* <Form.Label>Email</Form.Label> */}
//                                     <Form.Control
//                                         type="email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         placeholder="Enter your email"
//                                         required
//                                     />
//                                 </Form.Group>
//                                 <Form.Group>
//                                     {/* <Form.Label>Phone Number</Form.Label> */}
//                                     <Form.Control
//                                         type="tel"
//                                         value={phone}
//                                         onChange={(e) => setPhone(e.target.value)}
//                                         placeholder="Enter your phone number"
//                                         required
//                                     />
//                                 </Form.Group>
//                             </>
//                         )}

//                         <Link to="#tnc">Terms and conditions</Link>
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 checked={acceptTerms}
//                                 onChange={() => setAcceptTerms(!acceptTerms)}
//                             />
//                             I accept the terms and conditions
//                         </label>

//                         <div className="d-flex justify-content-between mt-3">

//                             <Button variant="primary" onClick={handleFormPurchase}>
//                                 Check out
//                             </Button>
//                             <Button variant="secondary" onClick={() => setShowModal(false)}>
//                                 Cancel
//                             </Button>
//                         </div>
//                         {purchaseError && <p className="text-danger mt-2">{purchaseError}</p>}
//                     </Modal.Body>
//                 )}
//             </Modal>
//         </Container>
//     );
// }

// export default Forms;
