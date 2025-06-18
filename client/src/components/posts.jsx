import {useEffect, useState} from 'react'
import axios from 'axios'


export default function Posts(){

    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        async function fetchPosts(){
            try{
                const res = await axios.get("http://localhost:3000/posts");

                setPosts(res.data.posts); // .post is to access array from backend res which is an obj

            } catch(err){
                console.log(err);
            }
        }

        fetchPosts();
    },[]);

    

    return (
        <div className="bg-slate-200 min-h-[70vh] flex items-start justify-center py-10">
            <div className="w-full max-w-2xl px-4">
                <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">Screams</h1>

                <div className="bg-slate-300 rounded-xl p-6 space-y-4 shadow">
                {posts.map((post, index) => (
                    <div
                    key={index}
                    className="bg-slate-100 p-4 rounded-lg shadow-sm relative"
                    >
                        <p className="text-sm text-slate-500 mb-1 font-semibold">
                            {post.author.username}
                        </p>

                        <p className="text-slate-800 mb-3">{post.content}</p>

                        <p className="text-xs text-slate-500 absolute bottom-2 right-4">
                            {new Date(post.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );


}

