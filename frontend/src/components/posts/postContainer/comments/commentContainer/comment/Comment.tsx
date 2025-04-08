import {FC, PropsWithChildren, useState} from "react";
import {IComment} from "../../../../../../interfaces/postsInterfaces/postsInterfaces.ts";
import DOMPurify from "dompurify";

interface IProps extends PropsWithChildren{
    comment: IComment;
}

const Comment:FC<IProps> = ({ comment }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [photo, setPhoto] = useState<File | null>(null);

    const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReplyText(e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleSubmitReply = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Reply:", replyText, email, username, file, photo);
        setReplyText("");
        setEmail("");
        setUsername("");
        setFile(null);
        setPhoto(null);
        setIsReplying(false);
    };

    return (
        <div className="Comment">
            <div className="Comment-header">
                <h5>{comment?.username}</h5>
                <span>{new Date(comment?.created_at).toLocaleDateString()}</span>
            </div>
            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment?.text || '') }} />
            {comment?.text_file && (
                <div className="Comment-file">
                    <a href={`/posts/download_file/${comment.text_file}`} target="_blank" rel="noopener noreferrer">
                        Скачать файл
                    </a>
                </div>
            )}
            {comment?.image && (
                <div className="Comment-image">
                    <img src={`/media/${comment.image}`} alt="comment" width="320" height="240" />
                </div>
            )}
            <button onClick={() => setIsReplying(!isReplying)}>
                {isReplying ? "Hide formContainer" : "Answer"}
            </button>
            {isReplying && (
                <form className="Comment-form" onSubmit={handleSubmitReply}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail"
                        required
                    />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <textarea
                        value={replyText}
                        onChange={handleReplyChange}
                        placeholder="Ваш коментар..."
                        required
                    />
                    <div className="file-input-container">
                        <label htmlFor="image" className="custom-file-label">
                            {photo ? photo.name : "Виберіть фото"}
                        </label>
                        <input
                            type="file"
                            id="image"
                            onChange={handlePhotoChange}
                            style={{ display: "none" }}
                            accept="image/*"
                        />
                    </div>

                    <div className="file-input-container">
                        <label htmlFor="text_file" className="custom-file-label">
                            {file ? file.name : "Виберіть файл"}
                        </label>
                        <input
                            type="file"
                            id="text_file"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            accept=".txt,.pdf,.doc,.docx"
                        />
                    </div>

                    <button type="submit">Send</button>
                </form>
            )}

            <div className="Comment-replies">
                {comment.replies?.map(reply => (
                    <Comment key={reply.id} comment={reply} />
                ))}
            </div>
        </div>
    );
};

export default Comment;