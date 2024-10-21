"use client";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PostDetail({ params }) {
    const id = params.id;

    const searhQuery = useSearchParams();
    const mode = searhQuery.get("mode");

    const [post, setPost] = useState(null);
    const [editing, setEditing] = useState(mode === "edit");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id]);

    useEffect(() => {
        setEditing(mode === "edit");
    }, [mode]);

    const fetchPost = async () => {
        const response = await axios.get(`http://localhost:3001/posts/${id}`);
        setPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3001/posts/${id}`, {title, content});
        setEditing(false);
        fetchPost();
    }

    const handleDelete = async () => {
        await axios.delete(`http://localhost:3001/posts/${id}`);
        router.push("/");
    }

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3x1 text-center">{editing ? 'Edit Post' : 'Read Post'}</h1>
            {post && (
                <div className="mb-6">
                    {editing ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <textarea
                                    value={content}
                                    placeholder="Content"
                                    className="w-full px-4 py-2 border rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                                    Save
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">{post.title}</h3>
                            <p className="mt-2 text-gray-600">{post.content}</p>
                        </div>
                    )}
                </div>
            )}
    
            <div className="flex space-x-4 mt-4">
                <button onClick={() => router.push('/')} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                    Home
                </button>
                <button
                    onClick={() => setEditing(!editing)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                    {editing ? 'Cancel' : 'Edit'}
                </button>
                <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    Delete
                </button>
            </div>
        </div>
    );
    
}
