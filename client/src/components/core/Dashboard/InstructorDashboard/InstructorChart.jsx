import React, { useState } from 'react'

const InstructorChart = () => {

    const [currentChart, setCurrentChart] = useState("students");

    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i = 0; i < numColors; i++) {
            const colors = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
        }
        return colors;
    }

    //create data for chart display student info
    const chartDataForStudents ={
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }

    //create data for chart display income info
    const chartDataForIncome = {
        labels: courses.map((course) =>course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }

    //create options

    const options = {

    };
  return (
    <div>
        <p>Visulaize</p>
        <div>
            <button onClick={() => setCurrentChart("students")}>
                Student
            </button>

            <button onClick={() => setCurrentChart("income")}>
                Income
            </button>
        </div>

        <div>
            <Pie
                data={currentChart === "students" ? chartDataForStudents : chartDataForIncome}
                options={options}
            />
        </div>
    </div>
  )
}

export default InstructorChart
