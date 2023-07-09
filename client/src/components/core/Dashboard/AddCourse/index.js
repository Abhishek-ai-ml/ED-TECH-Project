import RenderSteps from "./RenderSteps";


export default function AddCourse() {
    return (
        <>
            <div className="flex w-full mx-auto justify-center gap-5">
                <div className="w-[60%]">
                    <h1>Add Course</h1>
                    <div>
                        <RenderSteps/>
                    </div>
                </div>

                <div className="text-richblack-5 bg-richblack-800 border-[1px] border-richblack-700 h-fit p-6 rounded-lg flex flex-col gap-y-[19px]">
                    <p className="text-lg font-semibold">Course Upload Tips</p>
                    <ul className="font-medium text-xs flex flex-col gap-y-[11px]">
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