
import { Link } from 'react-router-dom';
import {useApi} from "./hook/useApi";


const StudentCourses = () => {
    const { userData, error, loading } = useApi();

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching data: {error.message}</p>}

            <div>
            <h3>Enrolled Courses</h3>
                {userData["courses"] && userData["courses"].map(course => (
                    <div key={course.id} className="">
                        <Link to={`/#details/${course.program_id}`}>
                            {course.program_code} - {course.program_name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};


export { StudentCourses }