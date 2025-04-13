import postsService from "../../../services/apiServices/posts/postsService.ts";
import './postFormStyles.scss'
import PostForm from "./form/PostForm.tsx";


const FormContainer = () => {



    return (
            <div className="Post-form">
                <PostForm  service={postsService.createPost}/>
            </div>
    );
};

export default FormContainer;
