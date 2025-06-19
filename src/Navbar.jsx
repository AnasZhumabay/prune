// Navbar.jsx
import React from 'react';
import TypewriterEffect from './TypewriterEffect';
import Dock from './Dock';
import { VscHome, VscBook, } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
    const navigate = useNavigate();
    const items = [
        { icon: <VscHome size={18} />, label: 'Home', onClick: () => navigate('/') },
        { icon: <VscBook size={18} />, label: 'Library', onClick: () => navigate('/library') },
    ];

    return (
        <nav className="relative w-full h-[150px] px-6 py-4 bg-prune text-peach font-kode flex justify-between items-center overflow-hidden">
            <div className="text-2xl tracking-widest">
                <TypewriterEffect text="PRUNE" />
            </div>
            <Dock
                items={items}
                panelHeight={64}
                dockHeight={200}
                baseItemSize={46}
                magnification={55} // reduced
                distance={120} // reduced
                spring={{ mass: 0.3, stiffness: 60, damping: 18 }} // smoother
            />
        </nav>
    );
}
