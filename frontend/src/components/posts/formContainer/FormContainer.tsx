import postsService from "../../../services/apiServices/posts/postsService.ts";
import {useState } from "react";
import { LoadingPage } from "../../../pages/loadingPage/LoadingPage.tsx";
import './postFormStyles.scss'
import PostForm from "./form/PostForm.tsx";


const FormContainer = () => {

    const [loading, setLoading] = useState(false);


    return (
        <>
            {loading ?
                <LoadingPage />
                :
                <div className="Post-form">
                    <PostForm setLoading={setLoading} service={postsService.createPost}/>
                </div>
            }
        </>
    );
};

export default FormContainer;
