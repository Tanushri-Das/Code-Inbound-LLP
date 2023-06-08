import ConfirmationScreen from "../../Pages/ConfirmationScreen/ConfirmationScreen";
import SurveyScreen from "../../Pages/SurveyScreen/SurveyScreen";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../Layout/Main");
const { default: Home } = require("../../Pages/Home/Home");

const routes=createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/survey',
                element:<SurveyScreen/>
            },
            {
                path:'/confirmation',
                element:<ConfirmationScreen/>
            }
        ]
    }
])
export default routes;