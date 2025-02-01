const cursor = document.createElement('div');
const style = document.createElement('style');
cursor.id = 'omegaCursor';
document.body.append(cursor);

style.textContent = `
    #omegaCursor {
        pointer-events: none;
        position: absolute;
        width: 30px;
        height: 30px;
        background: #ff00af;
        backdrop-filter: blur(8px) saturate(180%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        border: 2px solid #fff;
        transition: opacity 0.3s ease,
            transform 0.3s ease,
            width 0.25s,
            height 0.5s,
            left 0.1s,
            top 0.1s,
            backdrop-filter 0.5s,
            background-color 0.2s;
    }
`;
document.head.append(style);

let timeoutId;
let animationFrameId;
let isHoveringLink = false;

document.addEventListener('mousemove', (e) => {
    cancelAnimationFrame(animationFrameId);
    
    animationFrameId = requestAnimationFrame(() => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            cursor.style.opacity = '0.2';
        }, 1000);
        
        cursor.style.opacity = '0.9';
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;


        const hoveredElement = document.elementFromPoint(e.x, e.y);
        const link = hoveredElement?.closest('a');
        
        if (link) {
            const linkRect = link.getBoundingClientRect();
            isHoveringLink = true;
            cursor.style.zIndex = '-9999';
            cursor.style.background = '#b900ff';
            cursor.style.width = `${linkRect.width + 15}px`;
            cursor.style.height = `${linkRect.height + 5}px`;
            cursor.style.left = `${(linkRect.left + linkRect.right) / 2}px`;
            cursor.style.top = `${(linkRect.top + linkRect.bottom) / 2}px`;
            cursor.style.borderRadius = '5px';
            cursor.style.opacity = '0.3';
        } else if (isHoveringLink) {
            isHoveringLink = false;
            cursor.style.zIndex = '9999';
            cursor.style.background = '#ff00af';
            cursor.style.width = '35px';
            cursor.style.height = '35px';
            cursor.style.borderRadius = '50%';
            cursor.style.opacity = '0.9';
        }
    });
});

document.documentElement.style.cursor = 'none';
