import React from 'react';
import TiltedCard from './TiltedCard';
import AnimatedTitle from './AnimatedTitle';
import { useNavigate } from 'react-router-dom';

const books = [
    {
        id: 'little-prince',
        title: 'Little Prince',
        image: 'https://m.media-amazon.com/images/I/71OZY035QKL._UF1000,1000_QL80_.jpg',
        description: 'Little Prince',

    },
    {
        id: 'lifofpi',
        title: 'Life of Pi',
        image: 'https://cgassets-1d48b.kxcdn.com/site/assets/files/447359/getimage.jpg',
        description: 'Life of Pi',
    },
    {
        id: 'dune',
        title: 'Dune',
        image: 'https://m.media-amazon.com/images/I/41rrXYM-wHL._SL500_.jpg',
        description: 'Dune',
    },
    {
        id: 'crime',
        title: 'Crime and Punishment',
        image: 'https://ritikart.com/cdn/shop/files/41CsDeyZ3xL.jpg?v=1697261730',
        description: 'Crime and Punishment',

    },
    {
        id: 'alice',
        title: 'Alice’s Adventures in Wonderland / Through the Looking-Glass',
        image: 'https://www.penguinreaders.co.uk/wp-content/uploads/2023/02/9780241588864.jpeg',
        description: 'Alice’s Adventures in Wonderland / Through the Looking-Glass',
    },
    {
        id: 'hobbit',
        title: 'The Hobbit, or There and Back Again',
        image: 'https://m.media-amazon.com/images/I/61mjnP-qt6L._UF894,1000_QL80_.jpg',
        description: 'The Hobbit, or There and Back Again',
    },
    {
        id: '1984',
        title: '1984',
        image: 'https://tankmuseumshop.org/cdn/shop/products/1984.jpg?crop=center&height=1200&v=1748334435&width=1200',
        description: '1984',

    },
    {
        id: 'they',
        title: 'They Both Die at the End',
        image: 'https://images.sobrief.com/social/cover_they-both-die-at-the-end_360px_1747145871.webp',
        description: 'They Both Die at the End',
    },
    {
        id: 'thefirst',
        title: 'The first word',
        image: 'https://s.f.kz/prod/2213/2212027_240.jpg',
        description: 'The first word',
    },
    {
        id: 'thesecond',
        title: 'The second word',
        image: 'https://s.f.kz/prod/2213/2212027_240.jpg',
        description: 'The second word',
    },
    {
        id: 'thethird',
        title: 'The third word',
        image: 'https://s.f.kz/prod/2213/2212027_240.jpg',
        description: 'The third word',
    },
    {
        id: 'thetenth',
        title: 'The tenth word',
        image: 'https://s.f.kz/prod/2213/2212027_240.jpg',
        description: 'The tenth word',
    },
];

export default function Library() {
    const navigate = useNavigate();

    const handleCardClick = (bookId) => {
        navigate(`/typeTrainer?file=${bookId}.docx`);
    };

    return (
        <div className="min-h-screen bg-prune text-peach p-8 font-kode">
            <h1 className="text-2xl mb-8 tracking-wider">
                <AnimatedTitle text="MY LIBRARY" />
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                {books.map((book, index) => (
                    <div
                        key={index}
                        onClick={() => handleCardClick(book.id)}
                        className="cursor-pointer"
                    >
                        <TiltedCard
                            imageSrc={book.image}
                            altText={book.title}
                            captionText={book.title}
                            containerHeight="300px"
                            containerWidth="300px"
                            imageHeight="300px"
                            imageWidth="300px"
                            rotateAmplitude={12}
                            scaleOnHover={1.2}
                            showMobileWarning={false}
                            showTooltip={true}
                            displayOverlayContent={true}
                            overlayContent={
                                <p className="tilted-card-demo-text text-center">
                                    {book.description}
                                </p>
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
