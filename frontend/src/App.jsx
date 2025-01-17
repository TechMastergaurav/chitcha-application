
import Home from './components/Home'
import LeftSidebar from './components/leftSidebar'
import Login from './components/login'
import MainLayout from './components/MainLayout'
import Profile from './components/Profile'
import Signup from './components/signup'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
const browserRouter = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/profile',
        element:<Profile/>
      },
      
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  }
  
])
function App() {
 

  return (
    <>
  <RouterProvider router={browserRouter}/>
      
    </>
  )
}

export default App
