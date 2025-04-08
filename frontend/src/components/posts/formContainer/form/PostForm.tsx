import {ChangeEvent, FC, PropsWithChildren, useRef, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {IPost} from "../../../../interfaces/postsInterfaces/postsInterfaces.ts";
import {AxiosError} from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import {IRes} from "../../../../services";

interface IProps  extends PropsWithChildren{
    service: (post: FormData, post_id?:number, parent?:string) => IRes<IPost>;
    setLoading?: (value:boolean) => void;
    post_id?:number;
    parent?: string;
}

const PostForm:FC<IProps> = ({setLoading, service, post_id, parent}) => {
    const { register, handleSubmit, reset, setValue } = useForm<IPost>();
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
            if (setLoading){
                setLoading(true);
            }
            let res
            if (post_id){
                res = await service(formData, post_id, parent);
            }else{
                res = await service(formData);
            }
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
            if (setLoading){
                setLoading(false);
            }

        }

    };
    const handleFileChange = (
        e: ChangeEvent<HTMLInputElement>,
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
                <button type="submit">Send</button>
            </form>
            {incorrectData && <h2>Incorrect Data</h2>}
            {errorOther && <h2>Unknown error</h2>}
        </>
    );
};

export default PostForm;