// BookPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import mammoth from 'mammoth';

export default function BookPage() {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDocx() {
            try {
                const response = await fetch(`/books/${id}.docx`);
                const arrayBuffer = await response.arrayBuffer();
                const result = await mammoth.convertToHtml({ arrayBuffer });
                setContent(result.value);
            } catch (err) {
                setContent('<p>\u26A0\uFE0F Книга не найдена или ошибка загрузки.</p>');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadDocx();
    }, [id]);

    return (
        <div className="min-h-screen bg-prune text-peach p-8 font-kode">
            <h1 className="text-3xl mb-6 tracking-widest">{id.replace(/-/g, ' ').toUpperCase()}</h1>
            {loading ? <p>\uD83D\uDCD6 Загрузка...</p> : <div dangerouslySetInnerHTML={{ __html: content }} />}
        </div>
    );
}
