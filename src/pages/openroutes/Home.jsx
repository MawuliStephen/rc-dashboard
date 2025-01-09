// import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Carousel from '../../components/utility/carousel';
import DocumentTitle from '../../components/DocumentTitle';
import HeroSection from '../../components/utility/herosection/mobile';
// import { faImage } from '@fortawesome/free-solid-svg-icons';
import emma from '../../assets/emmanuel.jpg'
import wins from '../../assets/windows.jpg'
// import seth from '../assets/seth-ebenezer.jpg';  
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const image = 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'


const API = process.env.REACT_APP_BASE_URL;


const pageTitle = 'Royal Institute of Science and Entrepreneurship | Home';
const pageDescription = 'The Royal College of Science and Entrepreneurship (RISE) aims to create an environment that promotes innovation, critical thinking, and the practical application of knowledge...';



const contentData = [
  {
    title: "Why choose us ? ",
    paragraph: "Your Lifelong Journey of becoming... starts with us",

    points: [
      {
        title: "Expert Faculty:",
        description: "Learn from passionate educators who are experts in their fields and dedicated to your growth and success."
      },
      {
        title: "Comprehensive Curriculum:",
        description: "Explore a robust curriculum designed to foster critical thinking, creativity, and leadership skills, preparing you for a dynamic future."
      },
      {
        title: "Cutting-Edge Facilities:",
        description: "Access state-of-the-art facilities and resources that enhance your learning experience and support your academic and personal development."
      },
      {
        title: "Supportive Community:",
        description: "Join a diverse and inclusive community of students and mentors who will inspire and empower you to achieve your goals."
      }
    ]
  }
];


const coursesData = [
  {
    title: "Available Courses",
    paragraph: "Your Lifelong Journey of becoming... starts with us",


    points: [
      {
        title: "WASSCE",
        image:"https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "We recognize the pivotal role of the West African Senior School Certificate Examination (WASSCE) in shaping students' academic futures. As part of that, we provide tuition in all examinable  subjects by WAEC for students seeking to leverage technology to learn.",
        duration: "3 years"
      },
      {
        title: "NOV/DEC",
        image:"https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Explore the options of improving your academic credentials, an important option to meet the entry requirement for higher education in most tertiary institutions. Stay home, get taught and write the WASSCE private examination.",
        duration: "1 year"
      }

    ]
  }
];




class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const res = await axios.get(`${API}`);
      this.setState({ data: res.data });
      console.log(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  render() {
    return (
      <div className='background' style={{ background: "yelow" }}>
        {/* <DocumentTitle title="Home" /> */}
        <DocumentTitle title={pageTitle} description={pageDescription} />

        <div className='mobile'>
          <HeroSection />
        </div>

        <section className='background-image'>


          <div className="content-overlay">
            <div className="container desktop pt-5" style={{ marginBottom: '100px' }}>
              <div className="row">
                <div className="col-12 col-md-6">
                  {/* Shape Your Future <br /> */}
                  <h1>  Unlock Your Potential <br /> with  Excellence in <br /> <span style={{ color: 'tomato' }}>Education</span> </h1>

                  <p>
                    We are dedicated to nurturing the leaders, innovators, and thinkers of tomorrow.
                    <br />
                    Step into an environment where learning knows no bounds and excellence is the standard.
                  </p>
                  <div className="button-group">
                    <button className='primary-button'><Link to={'/register'}>  Get Started</Link></button>
                    <button className='secondary-button'><Link to={'/about-us'}>Learn More</Link></button>
                  </div>
                </div>

                <div className="col-12 col-md-6 ">
                  <div className='bg-dark' style={{ width: '70%', borderBottomRightRadius: '50%', borderTopLeftRadius: '40px' }}>

                  </div>
                  <img style={{ width: '70%', borderBottomRightRadius: '50%', borderTopLeftRadius: '40px' }} src={image} alt="" />
                  <img style={{ width: '30%', borderBottomRightRadius: '50%', borderTopRightRadius: '40px' }} src={wins} alt="" />

                  <img style={{ width: '50%', borderBottomRightRadius: '50%', borderTopRightRadius: '40px' }} src={emma} alt="" />



                  <svg width="0" height="0">
                    <defs>
                      <clipPath id="myClip">
                        <img style={{ width: '30%', borderBottomRightRadius: '50%', borderTopRightRadius: '40px' }} src={wins} alt="" />

                        <circle cx="50" cy="50" r="50" />
                      </clipPath>
                    </defs>
                  </svg>



                </div>
              </div>
            </div>



            <div className="container  pb-5">

              <div className="clipped d-flex justify-content-between">
                <div className="clipped-element"></div>
                <div className="clipped-element1"></div>
                <div className="clipped-element2"></div>
                <div className="clipped-element"></div>
                <div className="clipped-element1"></div>
                <div className="clipped-element2"></div>
              </div>


            </div>

            <div className='container pb-5 mb-2'>
              <div className="cx">
                {contentData.map((section, index) => (
                  <div className='col-12' key={index}>
                    <h1 className='start'>{section.title} </h1>
                    <p>{section.paragraph}</p>

                    <div className='row-x'>
                      {/* <Carousel> */}
                      {section.points.map((point, idx) => (
                        <div key={idx} className='card-x bg-white'>
                          <h5>{point.title}</h5>
                          <p>{point.description}</p>
                        </div>
                      ))}
                      {/* </Carousel> */}
                    </div>

                  </div>
                ))}


              </div>
            </div>
          </div>

        </section>


        <section className=" bg-light p-5">
          <div className="container  pb-5 mb-4">
            <div className="row" style={{ flexDirection: 'row-reverse' }}>
              <div className="col-12 col-md-6">
                <h1>Become a part of <br /></h1>
                <p> the thousands redefining their paths through Education  </p>
                <br />

                <button className='primary-button'><Link to={'/register'}>  Get Started</Link></button>
              </div>

              <div className="col-12 col-md-6 centered">
                <div className="clipped ">
                  <div className="clipped-element"></div>
                  <div className="clipped-element1"></div>
                  <div className="clipped-element2"></div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="p-5 mt-4">
          <div className="container  pb-5">
            <div className="text-center">
              <div className="cx">
                {coursesData.map((section, index) => (
                  <div className='' key={index}>
                    <h1>{section.title}</h1>
                    <p>{section.paragraph}</p>

                 

                    <div className="row justify-content-center">
                      {section.points.map((point, idx) => (
                        <div key={idx} className="col-12 col-lg-6 mb-4">
                          <Card className="shadow-card">
                            <Card.Body>
                              <div className="card-image-wrapper">
                                <img
                                  src={point.image}
                                  alt={point.title}
                                  className="card-img-top"
                                  style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                                />
                              </div>
                              <Card.Title>{point.title}</Card.Title>
                              <hr />
                              <Card.Text>{point.description}</Card.Text>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center">
                                <p>Duration: {point.duration}</p>
                                <a href="#">More</a>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      ))}
                    </div>


                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>
      </div >
    );
  }
}

export default Home;
