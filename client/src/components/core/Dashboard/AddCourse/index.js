import RenderSteps from "./RenderSteps";


export default function AddCourse() {
    return (
        <>
            <div>
                <div>
                    <h1>Add Course</h1>
                    <div>
                        <RenderSteps/>
                    </div>
                </div>

                <div>
                    <p>Course Upload Tips</p>
                    <ul>
                        <li>Set the course price option or make it free</li>
                        <li>Standard size for the course thumbnail is 1024 x 576</li>
                        <li>Course Builder is where you create and organize a course</li>
                        <li>Add topics in the code builder section</li>
                    </ul>
                </div>
            </div>
        </>
    )
}