import { Link } from "react-router-dom";
import React from "react";
const pageTitle = 'Not Found';
const pageDescription = 'The Royal College of Science and Entrepreneurship (RISE) is all in one institution that seeks to provide opportunity for everyone to learn'

import DocumentTitle from "../components/DocumentTitle";



const Missing = () => {
    return (
        <div className="wrapper">

            <DocumentTitle title={pageTitle} description={pageDescription} />
            <section className='background-image' style={{ height: '200px' }}>


                <div className="col-12 col-md-6 ">

                    <svg width="0" height="0">
                        <defs>
                            <clipPath id="myClip">

                                <circle cx="50" cy="50" r="50" />
                            </clipPath>
                        </defs>
                    </svg>

                    <div className="clipped-element"></div>


                </div>


            </section>

            <div className="container justify-content-center text-center pt-4">

                <h1>Oops!</h1>
                <p>Page Not Found</p>
                   <button className="primary-button"> <Link to="/">Visit Our Homepage</Link></button>

            </div>

        </div>
    )
}

export default Missing
