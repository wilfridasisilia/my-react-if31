"use client";
import React from 'react';
import { useRouter } from 'next/navigation'; // Pastikan ini dari next/navigation
import axios from 'axios';

const Create = () => {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const router = useRouter(); // Pastikan useRouter dikelola dengan benar

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            if (response.ok) {
                setTitle('');
                setContent('');
                alert('Post created successfully!');
                router.push('/posts'); // Redirect to posts page
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className='flex flex-col items-center py-20'>
            <h1 className='text-3xl font-bold mb-6'>Create New Post</h1>
            <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-md bg-white shadow-md rounded-lg p-6'>
                <input
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='border border-gray-300 p-2 rounded-lg m-2'
                    required
                />
                <textarea
                    placeholder='Content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='border border-gray-300 p-2 rounded-lg m-2'
                    rows="5"
                    required
                />
                <button
                    type='submit'
                    className='bg-blue-500 text-white p-2 rounded-lg m-2 hover:bg-blue-600 transition duration-200'
                >
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default Create;
