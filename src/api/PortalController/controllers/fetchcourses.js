
import { Link } from 'react-router-dom';
import { useApi } from "./hook/useApi";

// Function to convert course name into a URL-friendly slug
const slugify = (text) => {
    return text
        .toLowerCase()                   // Convert to lowercase
        .replace(/\s+/g, '-')            // Replace spaces with hyphens
        .replace(/[^\w-]+/g, '');        // Remove all non-word characters
};

const StudentCourses = () => {
    const { courses, error, loading } = useApi();

    return (
        <div>
            <h3>Enrolled Courses</h3>
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching data: {error.message}</p>}

            {!loading && !error && (
                <div>
                    {courses && courses.length > 0 ? (
                        courses.map(course => (
                            <div key={course.program_name} className="">
                                {/* <Link to={`/courses/shs/${slugify(course.program_name)}`}>
                                {course.program_code} - {course.program_name}
                                </Link> */}

                                <Link to={`/portal/courses/shs/${course.id}`}>
                                    {course.program_code} - {course.program_name}
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No courses found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export { StudentCourses };
