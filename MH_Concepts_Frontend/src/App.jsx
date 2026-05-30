
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import { AppLayout } from './layout/AppLayout'
import { Error } from './pages/Error'
import {Home} from "./pages/Home"
import {CategoryPage} from "./pages/CategoryPage"
import {ProductDetail} from "./pages/ProductDetail"
import {AdminLogin} from "./pages/AdminLogin"
import {AdminDashboard} from "./pages/AdminDashboard"
import {AdminPanel} from "./pages/AdminPanel"
import {ProtectedRoute} from "./pages/ProtectedRoute"
import {Contact} from "./pages/Contact"
function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<AppLayout/>,
      errorElement:<Error/>,
      children:[
        {
          path:"/",
          element:<Navigate to="/homepage" replace/>,index:true
        },
        {
          path:"/homepage",
          element:<Home/>
        },
        {
          path:"/categorypage/:categoryName",
          element:<CategoryPage/>
        },
            {
          path:"/productdetail/:productCode",
          element:<ProductDetail/>
        },
          {
          path:"/adminlogin",
          element:<AdminLogin/>
        },{
          path:"/contact",
          element:<Contact/>
        },
          {
          path:"/admindashboard",
          element:(
            <ProtectedRoute>
              <AdminDashboard/>
            </ProtectedRoute>

          )
        }
        //    {
        //   path: "*",
        //   element: <Navigate to="/homepage" replace />
        // }
      ]
    }
  ])
  return <RouterProvider router={router}/>
 
}

export default App
