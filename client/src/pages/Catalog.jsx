import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Course_Card from '../components/core/Catalog/Course_Card';

const Catalog = () => {
    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    useEffect(() => {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const categoryId = res?.data?.data.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(categoryId);
        }
        getCategories();
    }, [catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try {
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);
            }catch(error) {
                console.log(error);
            }
            getCategoryDetails();
        }
    },[categoryId])
  return (
    <div>
        
        <div>
            <p>
                Home / Catalog
                <span>{catalogPageData?.data?.selectedCategory?.name}</span>
            </p>
            
            <p>{catalogPageData?.data?.selectedCategory?.name}</p>

            <p>{catalogPageData?.data?.selectedCategory?.description}</p>
        </div>

        <div>
            {/* Section 1 */}
            <div>
                <div>Courses to get you started</div>

                <div>
                    <p>Most Popular</p>
                    <p>New</p>
                </div>

                <div>
                    <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}    />
                </div>
            </div>

            {/* Section 2 */}
            <div>
                <p>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</p>
                <div>
                    <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses}/>
                </div>
            </div>

            {/* Section 3 */}
            <div>
                <div>Frequently Bought</div>
                
                <div>
                    <div className='grid grid-cols-1 lg:grid-cols-2'>
                        {
                            catalogPageData?.data?.mostSellingCourses.slice(0,4).map((course, index) => {
                                <Course_Card course={course} key={index} Height={"h-[400px]"}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
    </div>
  )
}

export default Catalog
