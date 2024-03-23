document.addEventListener('DOMContentLoaded', function() {
    const editor = document.getElementById('editor');
    const contextMenu = document.getElementById('context-menu');

    // Function to handle printing
    function printDocument() {
        window.print();
    }

    // Function to handle opening files
    function openFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt'; // Specify the accepted file types here if needed
        input.onchange = function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                editor.textContent = e.target.result;
            };
            reader.readAsText(file);
        };
        input.click();
    }

    // Function to handle saving files
    function saveFile(filename = 'document.txt') {
        const content = editor.textContent || '';
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename; // Specify the filename here
        a.click();
        URL.revokeObjectURL(url);
    }

    // Function to handle saving as files
    function saveAsFile() {
        const filename = prompt('Enter file name:', 'document.txt');
        if (filename !== null) {
            saveFile(filename);
        }
    }

    // Function to handle creating a new document
    function createNewDocument() {
        editor.textContent = ''; // Clear the editor
    }

    // Keyboard event listeners
    editor.addEventListener('keydown', function(event) {
        // Handle keyboard events here
    });

    // Right-click context menu
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        contextMenu.style.display = 'block';
        contextMenu.style.left = event.clientX + 'px';
        contextMenu.style.top = event.clientY + 'px';
    });

    // Close context menu on click outside
    document.addEventListener('click', function(event) {
        contextMenu.style.display = 'none';
    });

    // Event listeners for buttons
    document.getElementById('print-btn').addEventListener('click', printDocument);
    document.getElementById('open-btn').addEventListener('click', openFile);
    document.getElementById('save-btn').addEventListener('click', saveFile);
    document.getElementById('save-as-btn').addEventListener('click', saveAsFile);
    document.getElementById('new-btn').addEventListener('click', createNewDocument);
});

