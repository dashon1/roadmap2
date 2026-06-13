import Landing from './pages/Landing';
import Success from './pages/Success';
import HeroDemo from './pages/HeroDemo';
import AdminDashboard from './pages/AdminDashboard';
import Blog from './pages/Blog';
import Portfolio from './pages/Portfolio';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Landing": Landing,
    "Success": Success,
    "HeroDemo": HeroDemo,
    "AdminDashboard": AdminDashboard,
    "Blog": Blog,
    "Portfolio": Portfolio,
}

export const pagesConfig = {
    mainPage: "Landing",
    Pages: PAGES,
    Layout: __Layout,
};