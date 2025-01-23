import { useState, useEffect } from 'react';

const ScrollTracker = () => {
    const [scrollOffsetY, setScrollOffsetY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollOffsetY(window.scrollY);
            console.log(`Vertical Scroll Offset: ${window.scrollY}px`);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{ height: '2000px', padding: '20px' }}>
            <div style={{ position: 'fixed', top: 10, left: 10, background: 'black', color: 'white', padding: '10px' }}>
                Scroll Y: {scrollOffsetY}px
            </div>
        </div>
    );
};

export default ScrollTracker;
