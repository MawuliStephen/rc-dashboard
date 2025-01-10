import React from "react";
import { Link } from "react-router-dom";
import useApi from "./hook/useApi";

const UsersAll = () => {
    const {
        userData,
        error,
        loading,
        totalPages,
        currentPage,
        setCurrentPage,
        search,
        setSearch,
        setSortBy,
        order,
        setOrder
    } = useApi(); // Make sure all required functions and state are destructured

    // Handle loading state
    if (loading) return <p>Loading...</p>;

    // // Handle error state
    if (error) return <p>Error fetching data: {error}</p>;

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);  // Reset to page 1 on new search
    };

    // Handle sorting
    const handleSortChange = (newSortBy) => {
        setSortBy(newSortBy);
        setOrder(order === 'ASC' ? 'DESC' : 'ASC'); // Toggle order
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);  // Set new page number
        }
    };

    return (
        <div>
            <h2>All Users</h2>

            {/* <div className="container"> */}
                <div className="row">
                    {/* Search input */}
                    <div className="col-12 col-lg-6 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search users..."
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {/* Sorting */}
                    <div className="col-12 col-lg-6 mb-3 mt-3 d-flex flex-column flex-lg-row justify-content-start align-items-start">
                        <button
                            className="btn btn-outline-primary mb-2 mb-lg-0 me-lg-2"
                            onClick={() => handleSortChange('firstname')}
                        >
                            Sort by First Name
                        </button>
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => handleSortChange('email')}
                        >
                            Sort by Email
                        </button>
                    </div>
                </div>
            {/* </div> */}

            {/* Displaying list of users */}
            {userData.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <div>
                    {userData.map((user) => (

                        <div key={user.id} className="user-card">
                            <div className="user-card-header">

                                <Link to={`/users/${user.id}`} className="user-card-link">
                                    <h3 className="user-name">
                                        {user.firstname} {user.middlename} {user.surname}
                                    </h3>
                                    <span className="user-email">
                                        {user.email}

                                    </span>

                                </Link>

                                <div>
                                    {/* Badge (can be dynamic based on user role or status) */}
                                    {/* More Options Button (3 dots) */}
                                    <span className="user-badge">Active</span>

                                    <div className="more-options">
                                        <button className="dots-button">
                                            <span className="dots">...</span>
                                        </button>
                                        <div className="dropdown">
                                            <ul>
                                                <li>Edit</li>
                                                <li>Delete</li>
                                                <li>View Details</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UsersAll;
