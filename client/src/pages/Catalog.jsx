import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Course_Card from '../components/core/Catalog/Course_Card';
import Footer from '../components/common/Footer'

const Catalog = () => {
    const {catalogName} = useParams();
    console.log("CATALOG nAME", catalogName);
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    useEffect(() => {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("CATEGORIES API RESPONSE", res);
            const filterData = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName);
            console.log("FILTER DATA", filterData);
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            console.log("pRINTING CATEGORY ID", category_id);
            console.log("CATEGORY ID TYPE", typeof(category_id));
            setCategoryId(category_id);
        }
        getCategories();
    }, [catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try {
                const res = await getCatalogPageData(categoryId);
                console.log("CATEGORY PAGE DATA RESPONSE", res);
                setCatalogPageData(res);
                console.log("Catalog page data",res)
            }catch(error) {
                console.log(error);
            }
        }
        getCategoryDetails();
    },[categoryId])
  return (
    <div className='relative top-14 w-full bg-richblack-900'>
        
        <div className='w-full text-richblack-200 bg-richblack-800'>
            <div className=' flex flex-col items-start w-11/12 mx-auto max-w-maxContent py-16 gap-y-5'>
                <p className='text-sm font-normal'>
                    Home / Catalog / <span  className='text-yellow-50'>{catalogPageData?.data?.selectedCategory?.name}</span>
                </p>
                
                <p className='text-3xl font-semibold text-richblack-5'>{catalogPageData?.data?.selectedCategory?.name}</p>

                <p className='text-ricblack-100'>{catalogPageData?.data?.selectedCategory?.description}</p>
            </div>
        </div>

        <div className='text-richblack-5 w-11/12 max-w-maxContent mx-auto'>
            {/* Section 1 */}
            <div className='flex flex-col gap-y-5 py-10'>
                <div className='text-4xl font-bold'>Courses to get you started</div>

                <div className='flex gap-x-5 border-b-[1px] border-richblack-700 text-sm'>
                    <p className='text-yellow-100 border-b-[1px] border-yellow-100 px-3'>Most Popular</p>
                    <p className='text-richblack-100'>New</p>
                </div>

                <div>
                    <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}    />
                </div>
            </div>

            {/* Section 2 */}
            <div className='w-full flex flex-col gap-y-5'>
                <p className='text-4xl font-semibold'>Top Courses in {catalogPageData?.data?.differentCategory?.name}</p>
                <div className='w-full'>
                    <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses}/>
                </div>
            </div>

            {/* Section 3 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab  py-12 lg:max-w-maxContent">
                <div className="section_heading text-4xl font-semibold">Frequently Bought</div>
                <div className="py-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {catalogPageData?.data?.mostSellingCourses
                    ?.slice(0, 4)
                    .map((course, i) => (
                        <Course_Card course={course} key={i} Height={"h-[400px]"} />
                    ))}
                </div>
                </div>
            </div>

      
        </div>

        {/* Footer */}
        <Footer/>
    </div>
  )
}

export default Catalog
