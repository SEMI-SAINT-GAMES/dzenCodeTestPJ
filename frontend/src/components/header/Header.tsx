import './headerStyles.scss'
import {Link} from "react-router-dom";
const Header = () => {
    return (
        <div className='Header'>
            <div className='Header-container'>
                <Link className='Header-link' to='/main'>Posts</Link>
                <Link className='Header-link' to='/create_post'>Create post</Link>
            </div>
        </div>
    );
};

export default Header;