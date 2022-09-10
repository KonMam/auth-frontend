import '../styles/NavBar.css'

export default function NavBar() {
    
    const handleSignOut = () => {
        localStorage.clear()
    }

    return (
        <div className='nav'>
            <div className="nav-logo">
                Task Tracker Prototype
            </div>
            <div className="nav-links">
                <div className='nav-element'>
                    <a href='http://localhost:5173/tasks'>Home</a>
                </div>
                <div className='nav-element'>
                    <a href='#'>Profile</a>
                </div>
                <div className='nav-element'>
                    <a href='http://localhost:5173/login' onClick={handleSignOut}>Sign Out</a>
                </div>
            </div>
        </div>
    )
}