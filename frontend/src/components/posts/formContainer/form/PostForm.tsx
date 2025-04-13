import {ChangeEvent, FC, PropsWithChildren, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {ICaptcha, IPost} from "../../../../interfaces/postsInterfaces/postsInterfaces.ts";
import {AxiosError} from "axios";
import {IRes} from "../../../../services";
import postsService from "../../../../services/apiServices/posts/postsService.ts";

interface IProps  extends PropsWithChildren{
    service: (post: FormData, post_id?:number, parent?:string) => IRes<IPost>;
    setLoading?: (value:boolean) => void;
    post_id?:number;
    parent?: string;
}

const PostForm:FC<IProps> = ({service, post_id, parent}) => {
    const { register, handleSubmit, reset, setValue } = useForm<IPost>();
    const [incorrectData, setIncorrectData] = useState(false);
    const [incorrectCaptcha, setIncorrectCaptcha] = useState(false)
    const [errorOther, setErrorOther] = useState(false);
    const [fileName, setFileName] = useState<string>("Choose File (only .txt)");
    const [photoName, setPhotoName] = useState<string>("Choose Photo");
    const [captcha, setCaptcha] = useState<ICaptcha>()
    const loadCaptcha = async () => {
        try {
            const response = await postsService.getCaptcha()
            setCaptcha(response.data)
        } catch (e){
            console.log(e)
        }
    }
    useEffect(() => {
       loadCaptcha()
    }, []);
    const createPost: SubmitHandler<IPost> = async (post) => {
        try {
            const formData = new FormData();
            formData.append("text", post.text);
            formData.append("username", post.username);
            formData.append("email", post.email);
            if (captcha) {
                formData.append("captcha_id", captcha.captcha_id);
            }
            if (post.captcha_text) {
                formData.append("captcha_text", post.captcha_text);
            } else {
                console.error("Captcha text is missing");
                return;
            }
            if (post.image) {
                console.log(post.image);
                formData.append("image", post.image);
            }
            if (post.text_file) {
                console.log(post.text_file);
                formData.append("text_file", post.text_file);
            }
            let res
            if (post_id){
                res = await service(formData, post_id, parent);
            }else{
                res = await service(formData);
            }
            setIncorrectData(false);
            setErrorOther(false);
            loadCaptcha()
            reset();
            return res;

        } catch (e) {
            const err = e as AxiosError;
            const detail = (err.response?.data as { detail?: string })?.detail;
            console.log(detail)
            if (detail === "Invalid captcha" || detail === "Captcha expired") {
                setIncorrectCaptcha(true);
                console.log("cap")}
            else if (err.response) {
                console.log(`Server error: ${err.response.status} - ${err.response.data}`);
                setIncorrectData(true);

            } else {
                console.error('Error: ', err.message);
                setErrorOther(true);
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
                <input type="email" placeholder="E-mail" {...register("email")} required/>
                <input type="text" placeholder="Username" {...register("username")} required/>
                <textarea
                    placeholder="Text..."
                    {...register("text")}
                    required
                    rows={4}
                />
                <div className="file-input-container">
                    <label htmlFor="image" className="custom-file-label">
                        {photoName || "Choose Photo"}
                    </label>
                    <input
                        type="file"
                        id="image"

                        onChange={(e) => handleFileChange(e, "image")}
                        style={{display: "none"}}
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
                        style={{display: "none"}}
                        accept=".txt,.pdf,.doc,.docx"
                    />
                </div>
                <img src={captcha?.captcha_image} onClick={loadCaptcha}/>
                <input type="text" placeholder="Write text above" {...register("captcha_text")} required/>

                <button type="submit">Send</button>
            </form>
            {incorrectCaptcha && <h2>Incorrect captcha</h2>}
            {incorrectData && <h2>Incorrect Data</h2>}
            {errorOther && <h2>Unknown error</h2>}
        </>
    );
};

export default PostForm;