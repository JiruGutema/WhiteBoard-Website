// Background options
const backgrounds = {
    white: {
        body: '#ffffff',
        grid: 'none'
    },
    grid: {
        body: '#ffffff',
        grid: 'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)'
    },
    dots: {
        body: '#ffffff',
        grid: 'radial-gradient(circle, rgba(0,0,0,0.3) 1px, transparent 2px)'
    },
    lines: {
        body: '#ffffff',
        grid: 'repeating-linear-gradient(0deg, transparent 0px, transparent 19px, rgba(0,0,0,0.2) 20px)'
    },
    dark: {
        body: '#1a1a1a',
        grid: 'none'
    },
    'dark-grid': {
        body: '#1a1a1a',
        grid: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)'
    },
    'dark-dots': {
        body: '#1a1a1a',
        grid: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 2px)'
    },
    'dark-lines': {
        body: '#1a1a1a',
        grid: 'repeating-linear-gradient(0deg, transparent 0px, transparent 19px, rgba(255,255,255,0.2) 20px)'
    }
};

// Size options
const sizes = {
    normal: '20px',
    large: '30px',
    'extra-large': '40px'
};

// DOM elements
let backgroundSelect, sizeSelect, gridBackground, instructions, whiteboardArea;

// Initialize DOM elements
function initializeElements() {
    backgroundSelect = document.getElementById('backgroundSelect');
    sizeSelect = document.getElementById('sizeSelect');
    gridBackground = document.querySelector('.grid-background');
    instructions = document.getElementById('instructions');
    whiteboardArea = document.getElementById('whiteboardArea');
}

// Load saved preferences
function loadPreferences() {
    const savedBackground = localStorage.getItem('whiteboard-background') || 'grid';
    const savedSize = localStorage.getItem('whiteboard-size') || 'normal';
    
    backgroundSelect.value = savedBackground;
    sizeSelect.value = savedSize;
    
    applyBackground(savedBackground);
    applySize(savedSize);
}

// Apply background
function applyBackground(type) {
    const bg = backgrounds[type];
    document.body.style.background = bg.body;
    
    if (bg.grid === 'none') {
        gridBackground.style.display = 'none';
    } else {
        gridBackground.style.display = 'block';
        gridBackground.style.backgroundImage = bg.grid;
        
        // Adjust grid patterns based on type
        if (type.includes('dots')) {
            gridBackground.style.backgroundSize = '20px 20px';
            gridBackground.style.backgroundPosition = '10px 10px';
        } else if (type.includes('lines')) {
            gridBackground.style.backgroundSize = '100% 20px';
            gridBackground.style.backgroundPosition = '0 0';
        } else {
            gridBackground.style.backgroundSize = '20px 20px';
            gridBackground.style.backgroundPosition = '0 0';
        }
    }
    
    // Adjust header and UI for dark mode variants
    const header = document.querySelector('.header');
    const controlGroups = document.querySelectorAll('.control-group');
    const controlLabels = document.querySelectorAll('.control-label');
    const instructionsDiv = document.getElementById('instructions');
    
    if (type.startsWith('dark')) {
        // Dark mode styling
        header.style.background = 'rgba(30, 30, 30, 0.95)';
        header.style.color = 'white';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        
        // Update control groups for dark mode
        controlGroups.forEach(group => {
            group.style.background = 'rgba(255, 255, 255, 0.1)';
            group.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        });
        
        // Update control labels for dark mode
        controlLabels.forEach(label => {
            label.style.color = '#ccc';
        });
        
        // Update instructions for dark mode
        instructionsDiv.style.background = 'rgba(30, 30, 30, 0.95)';
        instructionsDiv.style.color = 'white';
        instructionsDiv.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        
    } else {
        // Light mode styling
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.color = '#333';
        header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
        
        // Reset control groups for light mode
        controlGroups.forEach(group => {
            group.style.background = 'rgba(102, 126, 234, 0.1)';
            group.style.border = '1px solid rgba(102, 126, 234, 0.2)';
        });
        
        // Reset control labels for light mode
        controlLabels.forEach(label => {
            label.style.color = '#666';
        });
        
        // Reset instructions for light mode
        instructionsDiv.style.background = 'rgba(255, 255, 255, 0.95)';
        instructionsDiv.style.color = '#333';
        instructionsDiv.style.border = '1px solid rgba(0, 0, 0, 0.1)';
    }
    
    localStorage.setItem('whiteboard-background', type);
}

// Apply size
function applySize(size) {
    const gridSize = sizes[size];
    const currentBackground = backgroundSelect.value;
    
    // Apply size based on pattern type
    if (currentBackground.includes('dots')) {
        gridBackground.style.backgroundSize = `${gridSize} ${gridSize}`;
        gridBackground.style.backgroundPosition = `${parseInt(gridSize)/2}px ${parseInt(gridSize)/2}px`;
    } else if (currentBackground.includes('lines')) {
        gridBackground.style.backgroundSize = `100% ${gridSize}`;
        gridBackground.style.backgroundPosition = '0 0';
    } else if (currentBackground.includes('grid')) {
        gridBackground.style.backgroundSize = `${gridSize} ${gridSize}`;
        gridBackground.style.backgroundPosition = '0 0';
    }
    
    // Adjust whiteboard area height for larger sizes
    const multiplier = size === 'extra-large' ? 3 : size === 'large' ? 2 : 1;
    whiteboardArea.style.minHeight = `${100 * multiplier}vh`;
    
    localStorage.setItem('whiteboard-size', size);
}

// Show instructions
function showInstructions() {
    instructions.classList.remove('hidden');
}

// Hide instructions
function hideInstructions() {
    instructions.classList.add('hidden');
}

// Setup event listeners
function setupEventListeners() {
    backgroundSelect.addEventListener('change', (e) => {
        applyBackground(e.target.value);
        applySize(sizeSelect.value); // Reapply size to maintain pattern
    });
    
    sizeSelect.addEventListener('change', (e) => {
        applySize(e.target.value);
        applyBackground(backgroundSelect.value); // Reapply background to maintain pattern
    });
}

// Auto-hide instructions after delay
function setupInstructionsTimer() {
    setTimeout(() => {
        if (!localStorage.getItem('instructions-seen')) {
            setTimeout(hideInstructions, 5000);
            localStorage.setItem('instructions-seen', 'true');
        } else {
            hideInstructions();
        }
    }, 1000);
}

// Add some dynamic height to ensure scrolling works
function extendPage() {
    const currentHeight = document.body.scrollHeight;
    const viewportHeight = window.innerHeight;
    
    if (currentHeight < viewportHeight * 3) {
        whiteboardArea.style.minHeight = `${viewportHeight * 3}px`;
    }
}

// Initialize the application
function init() {
    initializeElements();
    loadPreferences();
    setupEventListeners();
    setupInstructionsTimer();
    extendPage();
    
    // Add some helpful console messages
    console.log('🎨 Page Marker Whiteboard loaded!');
    console.log('💡 Tip: Click the Page Marker extension icon to start drawing');
    console.log('⌨️  Keyboard shortcuts: Shift + D/H/E/T for Pen/Highlighter/Eraser/Text');
}

// Event listeners for page load and resize
window.addEventListener('load', () => {
    init();
    extendPage();
});

window.addEventListener('resize', extendPage);