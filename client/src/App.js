import React, { useEffect } from 'react'
import Navbar from './component/navbar/Navbar'
import { Route, Switch } from "react-router-dom"
import Login from './component/auth/Login'
import Home from './component/home/Home'
import Register from "./component/auth/Register"
import { loadUser } from "./redux/action/userAction"
import store from "./redux/store"
import ProtectedRoute from './component/utils/ProtectedRoute'
import Profile from './component/profile/Profile'
import NewHome from './component/admin/crreateProduct/NewHome'
import AllHomes from './component/allHomes/AllHomes'
import UpdateHome from './component/admin/crreateProduct/UpdateHome'
import DashBoard from './component/admin/DashBoard'
import AdminHomes from './component/admin/AdminHomes'
import EditProfile from './component/profile/EditProfile'
import UpdatePassword from './component/profile/UpdatePassword'
import SearchPost from './component/home/SearchPost'
import UsersList from './component/admin/user/UsersList'
import UpdateRole from './component/admin/user/UpdateRole'
import HomeDetails from './component/allHomes/HomeDetails'
import Footer from './component/footer/Footer'
import ForgotPassword from './component/auth/ForgotPassword'
import ResetPassword from './component/auth/ResetPassword'
import Adds from './component/admin/adds/Adds'

import CreateNews from './component/admin/news/CreateNews'
import NewsList from './component/admin/news/NewsList'
import UpdateNews from './component/admin/news/UpdateNews'
import NewsDetails from './component/home/news/NewsDetails'
import Contact from './component/contact/Contact'

import PostList from './component/subAdmin/PostList'
import SubDashBoard from './component/subAdmin/SubDashboard'
import NewPost from './component/subAdmin/NewPost'
import Updatepost from './component/subAdmin/Updatepost'
import UpdateStock from './component/admin/crreateProduct/UpdateStock'
import PutStock from './component/subAdmin/PutStock'

import Reviews from './component/admin/reviews/Reviews'

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot_password" component={ForgotPassword} />
          <Route exact path="/user/reset/:token" component={ResetPassword} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/all_homes" component={AllHomes} />
          <Route exact path="/home/category/:id" component={SearchPost} />
          <Route exact path="/news/details/:id" component={NewsDetails} />

          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/edit_profile" component={EditProfile} />
          <ProtectedRoute exact path="/update_password" component={UpdatePassword} />

          <ProtectedRoute isAdmin={true} exact path="/dashboard" component={DashBoard} />
          <ProtectedRoute isAdmin={true} exact path="/newProduct" component={NewHome} />
          <ProtectedRoute isAdmin={true} exact path="/update/home/:id" component={UpdateHome} />
          <ProtectedRoute isAdmin={true} exact path="/admin/homes" component={AdminHomes} />
          <ProtectedRoute isAdmin={true} exact path="/update/stock/:id" component={UpdateStock} />

          <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UsersList} />
          <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateRole} />

          <ProtectedRoute isAdmin={true} exact path="/admin/adds" component={Adds} />
          <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={Reviews} />

          <ProtectedRoute isAdmin={true} exact path="/create/news" component={CreateNews} />
          <ProtectedRoute isAdmin={true} exact path="/admin/news" component={NewsList} />
          <ProtectedRoute isAdmin={true} exact path="/admin/news/:id" component={UpdateNews} />

          <ProtectedRoute exact path="/homeDetails/:id" component={HomeDetails} />

          <ProtectedRoute isSubAdmin={true} exact path="/sub_dashboard" component={SubDashBoard} />
          <ProtectedRoute isSubAdmin={true} exact path="/subAdmin/newPost" component={NewPost} />
          <ProtectedRoute isSubAdmin={true} exact path="/subAdmin/update_post/:id" component={Updatepost} />
          <ProtectedRoute isSubAdmin={true} exact path="/subAdmin/allPost" component={PostList} />
          <ProtectedRoute isSubAdmin={true} exact path="/put/stock/:id" component={PutStock} />



        </Switch>
      </div>
      <Footer />
    </>
  )
}

export default App