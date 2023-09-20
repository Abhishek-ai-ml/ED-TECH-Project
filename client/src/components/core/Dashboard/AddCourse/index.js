import RenderSteps from "./RenderSteps";


export default function AddCourse() {
    return (
        <div className="w-full relative">
            <div className="flex w-full  lg:ml-24 ml-10 mx-auto pt-10">
                <div className="flex flex-col w-full items-start">
                    <h1 className="text-richblack-5 text-3xl font-medium pb-3 w-full flex pl-10 mx-auto">Add Course</h1>
                    <div className="lg:w-[55%] w-full pr-10 lg:pr-0">
                        <RenderSteps/>
                    </div>
                </div>

                <div className="text-richblack-5 max-w-max bg-richblack-800 border-[1px] border-richblack-700 h-fit p-6 rounded-lg flex flex-col gap-y-[19px] lg:fixed opacity-0 lg:opacity-100 right-16">
                    <p className="text-lg font-semibold">Course Upload Tips</p>
                    <ul className="font-medium text-xs flex flex-col gap-y-[11px]">
                        <li>Set the course price option or make it free</li>
                        <li>Standard size for the course thumbnail is 1024 x 576</li>
                        <li>Course Builder is where you create and organize a course</li>
                        <li>Add topics in the code builder section</li>
                        <li>Set the course price option or make it free</li>
                        <li>Standard size for the course thumbnail is 1024 x 576</li>
                        <li>Course Builder is where you create and organize a course</li>
                        <li>Add topics in the code builder section</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}