import {FC, PropsWithChildren} from "react";
import {IPost} from "../../../../interfaces/postsInterfaces/postsInterfaces.ts";
import DOMPurify from "dompurify";

interface IProps extends PropsWithChildren{
    post:IPost;
}
const Post:FC<IProps> = ({post}) => {
    return (
        <div className="Post">
            <div className="Post-header">
                <h4>{post.id}</h4>
                <span className="Post-info">{post.username}</span>
                <span className="Post-info">{post.email}</span>
                <span className="Post-info">{new Date(post.created_at).toLocaleString()}</span>
            </div>
            <div className="Post-content">
                {post.image && (
                    <div className="Post-image">
                        <img src={post.image.toString()} alt="Post image"/>
                    </div>
                )}
                <div className="Post-text">
                    <p
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post?.text || ""),
                        }}
                    />
                    {post.text_file && (
                        <div className="Post-file">
                            <a
                                href={`download_file/${post.text_file.toString()}`}
                                download
                                className="Download-button"
                            >
                                Download file .txt
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Post;