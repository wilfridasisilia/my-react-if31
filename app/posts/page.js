"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Posts() {
    const [posts, setPosts] = useState([]);

    const fetchRecords = async () => {
        const response = await axios.get('http://localhost:3001/posts');
        setPosts(response.data);
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            await axios.delete(`http://localhost:3001/posts/${id}`);
            const filterData = posts.filter((post) => post.id !== id);
            setPosts(filterData);
            fetchRecords();
        }
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-3xl font-bold text-gray-800">Blog Posts</h1>
                <Link href="/posts/create" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200">
                    Create Post
                </Link>
            </div>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full text-center">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Content</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{post.id}</td>
                                <td className="py-2 px-4 border-b">{post.title}</td>
                                <td className="py-2 px-4 border-b">{post.content}</td>
                                <td className="py-2 px-4 border-b">
                                    <Link href={`/posts/${post.id}?mode='read`}><button className="text-blue-500 hover:text-blue-700 mr-2">Read</button></Link>
                                    <Link href={`/posts/${post.id}?mode='edit`}><button className="text-yellow-500 hover:text-yellow-700 mr-2">Edit</button></Link>
                                    <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:text-red-700">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
