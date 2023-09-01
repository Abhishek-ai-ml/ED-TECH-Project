import RenderCartCourses from "./RenderCartCourses"
import {useSelector} from 'react-redux'
import RenderTotalAmount from "./RenderTotalAmount"


export default function Cart() {
    const {total, totalItems} = useSelector((state) => state.cart)
    console.log(total, totalItems);
    return(
        <div className="flex flex-col mx-auto w-10/12 pt-24 gap-y-3">
            <h1 className="text-3xl text-richblack-5 font-semibold">Your Cart</h1>
            <p className="text-richblack-300 text-base border-b-[1px] border-b-richblack-700">{totalItems} Courses in Cart</p>

            {
                total > 0 ? 
                (
                    <div className="flex justify-between gap-x-5 w-full">
                        <div className="w-[75%]"><RenderCartCourses/></div>
                        <div className="w-[25%] py-5"><RenderTotalAmount/></div>
                    </div>
                ) : 
                (<p>Your Cart is Empty</p>)
            }
        </div>
    )
}