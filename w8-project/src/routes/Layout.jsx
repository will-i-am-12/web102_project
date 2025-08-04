import { Outlet,Link } from "react-router-dom";
import './Layout.css'

const Layout = ()=>
{

    return(
        <div className="app-layout">
            <nav className="sidebar">
                <ul>
                    <li><Link to = '/'>Home</Link></li>
                    <li><Link to="/create">Create</Link></li>
                </ul>
            </nav>
            <main className="content">
                <Outlet />
            </main>
        </div>
    )

}
export default Layout