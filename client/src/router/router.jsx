import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from "../App";
import Addmission from "../screens/Admission";
import StudentsAttendences from "../screens/StudentsAttendences";
import Attendences from "../screens/Attendences";
import ExamsStudents from "../screens/ExamsStudents";
import Exams from "../screens/Exams";
import ExamTypes from "../screens/ExamTypes";
import Courses from "../screens/Courses";
import Subjects from "../screens/Subjects";
import Topics from "../screens/Topics";
import Staffs from "../screens/Staffs";
import Students from "../screens/Students";
import Branches from "../screens/Branches";
import BranchForm from "../components/branch_form/BranchForm";
  export const router = createBrowserRouter([
    {
      path: "/",
      element:<App/>,
      children: [
        {
          path: "/admission",
          element:<Addmission/>,
        },
        {
          path: "/students_attendences",
          element:<StudentsAttendences/>,
        },
        {
          path: "/attendences",
          element:<Attendences/>,
        },
        {
          path: "attendences/students_attendences/:attendenceId",
          element:<StudentsAttendences/>
        },
        {
          path: "exams/exams_students/:examId",
          element:<ExamsStudents/>
        },
        {
          path: "/exams_students",
          element:<ExamsStudents/>,
        },
        {
          path: "/exams",
          element:<Exams/>,
        },
        {
          path: "/exam_types",
          element:<ExamTypes/>,
        },
        {
          path: "/courses",
          element:<Courses/>,
        },
        {
          path: "/subjects",
          element:<Subjects/>,
        },
        {
          path: "/topics",
          element:<Topics/>,
        },
        {
          path: "/staffs",
          element:<Staffs/>,
        },
        {
          path: "/students",
          element:<Students/>,
        },
        {
          path: "/branches",
          element:<Branches/>,
          // children:[
          //   {
          //     path:"edit",
          //     element:<BranchForm/>
          //   }
          // ]
        },
      ],
    },
  ]);

