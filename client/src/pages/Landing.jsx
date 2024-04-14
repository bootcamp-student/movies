import styled  from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from '../assets/images/main.svg';
import { Link }  from "react-router-dom";
import Logo from "../components/Logo";
const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        Social <span> Movie Reviewers </span> app
                    </h1>
                    <p>
                        sdlkgjsegjerl;gjersjgserkgjerl;g
                        slgksjelrgjesrkgjerlkgjergjre
                        s;dklgjlgjesrgjesrlgj
                    </p>
                    <Link to='/register' className='btn register-link'>
                        Register
                    </Link>
                    <Link to='/login' className='btn '>
                        Login / Sneak Peak
                    </Link>
                </div>
                <img src={main} alt="movies" className='img main-img' />
            </div>
        </Wrapper>
    );
};


export default Landing;