import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root";
import App from "../App";
import TotalJoinRequest from "../Pages/TotalJoinRequest.jsx";
import DriverProfile from "../Pages/DriverProfile";
import UserTable from "../Components/Dashboard/UserTable";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import Terms from "../Pages/Terms";
import Profile from "../Pages/Profile";
// import FeedBack from "../Pages/FeedBack";
// import CreateProject from "../Pages/CreateProject";
import CreateSurvey from "../Pages/CreateSurvey";
import ManageCompany from "../Pages/ManageCompany";
import AddProject from "../Pages/AddProject";
import ManageEvent from "../Pages/ManageEvent";
import ArchiveProject from "../Pages/ArchiveProject";
import SurveyResult from "../Pages/SurveyResult";
import Notification from "../Pages/Notification.jsx";
import ProjectDetails from "../Pages/ProjectDetails.jsx";
import SurveyComment from "../Pages/SurveyComment.jsx";
import SurveyBasedUser from "../Pages/SurveyBasedUser.jsx";
// import Login from "../Pages/Auth/Login.jsx";
import ProjectUsers from "../Pages/ProjectUsers.jsx";
import Login from "../Pages/Auth/Login.jsx";
import ForgotPassword from "../Pages/Auth/ForgotPassword.jsx";
import SuperAdminDashboard from "../Pages/SuperAdmin/SuperAdminDashboard.jsx";
import SCompanyManage from "../Pages/SuperAdmin/CompanyManage.jsx";
import SCompanyDetails from "../Pages/SuperAdmin/SCompanyDetails.jsx";
import Otp from "../Pages/Auth/Otp.jsx";
import UpdatePassword from "../Pages/Auth/UpdatePassword.jsx";
import SingleUserDetails from "../Pages/SingleUserDetails.jsx";
import Income from "../Pages/Income.jsx";
import Subscription from "../Pages/Subscription.jsx";
import UserDetails from "../Pages/UserDetails.jsx";
import ManageItems from "../Pages/ManageItems.jsx";
import MediaSettings from "../Pages/MediaSettings/MediaSettings.jsx";
import RulesAndRegulation from "../Pages/RulesAndRegulation.jsx";
import Facts from "../Pages/Facts.jsx";
import TransactionHistory from "../Pages/TransactionHistory.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import PrivateLogin from "./PrivateLogin.jsx";
import Reporting from "../Pages/Reporting/Reporting.jsx";
// import Otp from "../Pages/Auth/Otp.jsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element:<PrivateRoute> <Root /> </PrivateRoute>,
        //   errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <App />,
            },
            {
                path: '/total-join-request',
                element: <TotalJoinRequest />,
            },
            {
                path : "/transaction-history",
                element : <TransactionHistory/>
            },
            {
                path: '/income',
                element: <Income />,
            },
            {
                path : '/subscription',
                element : <Subscription/>
            },
            {
                path : '/user-details',
                element : <UserDetails/>
            },
            {
                path : '/manage-items',
                element : <ManageItems/>
            },
            {
                path : '/media-settings',
                element : <MediaSettings/>
            },

            {
                path: '/driver-details/:id',
                element: <DriverProfile />,
            },
            {
                path: '/total-user',
                element: <UserTable />,
            },
            {
                path: '/privacy-policy',
                element: <PrivacyPolicy />,
            },
            {
                path: '/facts',
                element: <Facts />,
            },
            {
                path: '/terms',
                element: <Terms />,
            },
            {
                path: '/rules-regulation',
                element: <RulesAndRegulation />,
            },
            {
                path: '/profile',
                element: <Profile />,
            }, 
            {
                path : 'reporting',
                element : <Reporting/>
            },
            // {
            //     path: '/create-project',
            //     element: <CreateProject />,
            // },
            {
                path: '/create-survey',
                element: <CreateSurvey />,
            },
            {
                path: '/manage-company',
                element: <ManageCompany />,
            },
            {
                path: '/manage-event',
                element: <ManageEvent />,
            },
            {
                path: '/archive',
                element: <ArchiveProject />,
            },
            {
                path: '/add-project',
                element: <AddProject />,
            },

            {
                path: '/survey-result',
                element: <SurveyResult />,
            },

            {
                path: '/notification',
                element: <Notification />,
            },

            {
                path: '/project-details/:id',
                element: <ProjectDetails />,
            },

            {
                path: '/project-users/:id',
                element: <ProjectUsers/>,
            },
            {
                path: '/survey-comments/:id',
                element: <SurveyComment/>,
            },

            {
                path: '/line-chart/id',
                element: <chart/>,
            },

            {
                path: '/survey-user/id',
                element: <SurveyBasedUser/>,
            },

            // super admin dashboard pages
            {
                path: '/super-admin',
                element: <SuperAdminDashboard/>,
            },

            {
                path: '/super-admin/company-manage',
                element: <SCompanyManage />,
            },

            {
                path: '/super-admin/company-details',
                element: <SCompanyDetails />,
            },

            {
                path: '/single-user-details/:id',
                element: <SingleUserDetails />,
            }

        ]
    },
    {
        path: '/auth/login',
        element: <PrivateLogin><Login/></PrivateLogin>
    },
    {
        path: '/auth/forgot-password',
        element: <ForgotPassword/>
    },

    {
        path: '/auth/otp',
        element: <Otp/>
    },
    {
        path: '/auth/update-password',
        element: <UpdatePassword/>
    }
]);