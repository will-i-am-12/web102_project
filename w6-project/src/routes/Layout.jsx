import {Outlet,Link} from 'react-router-dom';

function Layout(){
    return(
        <div>
            <nav>
                <Link to ='/'>Dashboard</Link>
            </nav>
            <Outlet/>
        </div>
    )
}
export default Layout