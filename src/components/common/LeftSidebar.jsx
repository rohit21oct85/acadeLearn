export default function LeftSidebar(){
    return(
        <div className="main-menu menu-fixed menu-light menu-accordion    menu-shadow " data-scroll-to-active="true">
            <div className="main-menu-content">
                <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
                    <li className=" nav-item active mt-2"><a href="index.php"><img src="/images/principal.png" className="img-fluid"/><span className="menu-title">Principal</span></a>   </li> 
                    <li className=" nav-item"><a href="teacher.php"><img src="/images/teacher.png" className="img-fluid"/><span className="menu-title">Teacher</span></a>   </li>
                    <li className=" nav-item"><a href="student.php"><img src="/images/student.png" className="img-fluid"/><span className="menu-title">Student</span></a>   </li>
                </ul>
            </div>
        </div>
    )
}