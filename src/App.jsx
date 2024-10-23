import { useState, useContext } from "react";

import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import { AuthContext } from "./context/auth.context";
import Navbar from "./components/Navbar";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProjectPage from "./pages/ProjectPage";
import AddProjectPage from "./pages/AddProjectPage";
import EditProjectPage from "./pages/EditProjectPage";
import FavouriteProjectsPage from "./pages/FavouriteProjectsPage";
import MyNetworkPage from "./pages/MyNetworkProjectsPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditUserPage from "./pages/EditUserPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import SearchUserPage from "./pages/SearchUserPage";
import SearchTechPage from "./pages/SearchTechPage";
import BannerLogin from "./components/BannerLogin"


function App() {
  const { isLoggedIn, loggedUserId } = useContext(AuthContext);


  return (
    <div>
      <Navbar />

      <BannerLogin />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/projects/new-project" element={<AddProjectPage />} />
        <Route path="/projects/:projectId" element={<ProjectPage />} />
        <Route
          path="/projects/:projectId/update"
          element={<EditProjectPage />}
        />
        <Route
          path="/projects/favourites"
          element={<FavouriteProjectsPage />}
        />
        <Route path="/projects/my-network" element={<MyNetworkPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile/:userId/my-info" element={<EditUserPage />} />
        <Route
          path="/profile/:userId/change-password"
          element={<ChangePasswordPage />}
        />
        <Route path="/search" element={<SearchUserPage />} />
        <Route path="/tech/:tech" element={<SearchTechPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {isLoggedIn && (
        <Link to="/projects/new-project">
          <button className="addProjectBtn"><span className="plusBtn" >+</span> Add Project</button>
        </Link>
      )}
    </div>
  );
}

export default App;
