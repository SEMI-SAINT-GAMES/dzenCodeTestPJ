import { SubmitHandler, useForm } from "react-hook-form";
import { IPost } from "../../../interfaces/postsInterfaces/postsInterfaces.ts";
import postsService from "../../../services/apiServices/posts/postsService.ts";
import { useRef, useState } from "react";
import { AxiosError } from "axios";
import { LoadingPage } from "../../../pages/loadingPage/LoadingPage.tsx";
import ReCAPTCHA from "react-google-recaptcha";
import './postFormStyles.scss'


const PostForm = () => {
    const { register, handleSubmit, reset, setValue } = useForm<IPost>();
    const [loading, setLoading] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [isVerified, setIsVerified] = useState(false);
    const [incorrectData, setIncorrectData] = useState(false);
    const [errorOther, setErrorOther] = useState(false);
    const siteKey = import.meta.env.VITE_CAPTCHA_KEY;
    const [fileName, setFileName] = useState<string>("Choose File (only .txt)");
    const [photoName, setPhotoName] = useState<string>("Choose Photo");
    const createPost: SubmitHandler<IPost> = async (post) => {
        if (!isVerified) {
            alert("Confirm you are not robot");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("text", post.text);
            formData.append("username", post.username);
            formData.append("email", post.email);
            if (post.image) {
                console.log(post.image);
                formData.append("image", post.image);
            }
            if (post.text_file) {
                console.log(post.text_file);
                formData.append("text_file", post.text_file);
            }

            setLoading(true);
            const res = await postsService.createPost(formData);
            setIncorrectData(false);
            setErrorOther(false);
            reset();
            return res;

        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                console.log(`Server error: ${err.response.status} - ${err.response.data}`);
                setIncorrectData(true);
            } else {
                console.error('Error: ', err.message);
                setErrorOther(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "image" | "text_file"
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue(type, file);
            if (type === "image") {
                setPhotoName(file.name);
            } else {
                setFileName(file.name);
            }
        }
    };

    return (
        <>
            {loading ?
                <LoadingPage />
                :
                <div className="Post-form">
                    <form className="Post-form" onSubmit={handleSubmit(createPost)}>
                        <input type="email" placeholder="E-mail" {...register("email")} required />
                        <input type="text" placeholder="Username" {...register("username")} required />
                        <input type="text" placeholder="Text..." {...register("text")} required />

                        <div className="file-input-container">
                            <label htmlFor="image" className="custom-file-label">
                                {photoName || "Choose Photo"}
                            </label>
                            <input
                                type="file"
                                id="image"

                                onChange={(e) => handleFileChange(e, "image")}
                                style={{ display: "none" }}
                                accept="image/*"
                            />
                        </div>

                        <div className="file-input-container">
                            <label htmlFor="text_file" className="custom-file-label">
                                {fileName || "Choose File (only .txt)"}
                            </label>
                            <input
                                type="file"
                                id="text_file"
                                onChange={(e) => handleFileChange(e, "text_file")}
                                style={{ display: "none" }}
                                accept=".txt,.pdf,.doc,.docx"
                            />
                        </div>

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
