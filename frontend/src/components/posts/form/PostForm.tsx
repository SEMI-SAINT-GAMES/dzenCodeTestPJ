import {SubmitHandler, useForm} from "react-hook-form";
import {IPost} from "../../../interfaces/postsInterfaces/postsInterfaces.ts";
import postsService from "../../../services/apiServices/posts/postsService.ts";
import {useRef, useState} from "react";
import {AxiosError} from "axios";
import {LoadingPage} from "../../../pages/loadingPage/LoadingPage.tsx";
import ReCAPTCHA from "react-google-recaptcha";

const PostForm = () => {
    const {register, handleSubmit, reset} = useForm<IPost>()
    const [loading, setLoading] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null)
    const [isVerified, setIsVerified] = useState(false);
    const [incorrectData, setIncorrectData] = useState(false)
    const [errorOther ,setErrorOther] = useState(false)
    const siteKey = import.meta.env.VITE_CAPTCHA_KEY;
    const createPost:SubmitHandler<IPost> = async (post)=> {
        if (!isVerified){
            alert("Confirm you are not robot")
            return;
        }
        try{
            console.log(post)
            setLoading(true);
            const res = await postsService.createPost(post);
            setIncorrectData(false)
            setErrorOther(false)
            return res;
        } catch (e) {
            const err = e as AxiosError
            if (err.response) {
                console.log(`Помилка сервера: ${err.response.status} - ${err.response.data}`)
                console.log(err.response.data)
                setIncorrectData(true)
            } else {
                console.error('Помилка: ', err.message);
                setErrorOther(true)
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            {loading ?
                <LoadingPage/>
                :
                <div className='Post-form'>
                    <form className='PostForm' onSubmit={handleSubmit(createPost)}>
                        <input type='email' placeholder='E-mail' {...register('email')} required/>
                        <input type='text' placeholder='Username' {...register('username')} required/>\
                        <input type='text' placeholder='Text...' {...register('text')} required/>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={siteKey}
                            onChange={() => setIsVerified(true)}
                            onExpired={() => setIsVerified(false)}
                        />
                        <button type="submit">Надіслати</button>
                    </form>
                    {incorrectData && <h2>Incorrect Data</h2>}
                    {errorOther && <h2>Unknown error</h2>}
                </div>
            }

        </>

    );
};

export default PostForm;