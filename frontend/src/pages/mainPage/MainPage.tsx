import Posts from "../../components/posts/Posts.tsx";
import FormContainer from "../../components/posts/formContainer/FormContainer.tsx";

const MainPage = () => {
    return (
        <div className='Main-page'>
            <FormContainer/>
            <Posts/>
        </div>
    );
};

export default MainPage;