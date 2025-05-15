import React, { useRef, useState, useEffect } from 'react';

const toolbarCommands = [
  { command: 'bold', label: 'B', title: 'Bold' },
  { command: 'italic', label: 'I', title: 'Italic' },
  { command: 'underline', label: 'U', title: 'Underline' },
  { command: 'insertUnorderedList', label: '• List', title: 'Unordered List' },
  { command: 'createLink', label: '🔗', title: 'Insert Link' },
];

const Notepad = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState('');
  const [activeCommands, setActiveCommands] = useState({});

  // Check which commands are active at caret position
  const updateActiveCommands = () => {
    const newActive = {};
    toolbarCommands.forEach(({ command }) => {
      if (command === 'createLink') {
        // For links, queryCommandState does not work, skip
        return;
      }
      newActive[command] = document.queryCommandState(command);
    });
    setActiveCommands(newActive);
  };


  console.log('Active commands:', activeCommands);

  const format = (command, value = null) => {
    if (command === 'createLink') {
      const url = prompt('Enter the link URL:');
      if (url) {
        document.execCommand(command, false, url);
      }
    } else if (command === 'fontSize') {
      document.execCommand('fontSize', false, value);
    } else {
      document.execCommand(command, false, null);
    }
    setContent(editorRef.current.innerHTML);
    updateActiveCommands();
  };

  const handleInput = () => {
    setContent(editorRef.current.innerHTML);
    updateActiveCommands();
  };

  // Also update active commands on selection change (caret moves)
  useEffect(() => {
    document.addEventListener('selectionchange', updateActiveCommands);
    return () => {
      document.removeEventListener('selectionchange', updateActiveCommands);
    };
  }, []);

  return (
    <div className="p-6 font-sans bg-gray-900 min-h-screen text-gray-100">

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-4">
        {toolbarCommands.map(({ command, label, title }) => (
          <button
            key={command}
            onClick={() => format(command)}
            title={title}
            className={`px-3 py-1 border border-gray-700 rounded hover:bg-gray-700 ${
              activeCommands[command] ? 'bg-gray-700' : ''
            }`}
          >
            {label}
          </button>
        ))}

        {/* Font Size Selector */}
        <select
          onChange={(e) => format('fontSize', e.target.value)}
          defaultValue=""
          className="px-3 py-1 border border-gray-700 rounded bg-gray-800 text-gray-100 hover:bg-gray-700"
          title="Font Size"
        >
          <option value="" disabled>
            Font size
          </option>
          <option value="1">Very Small</option>
          <option value="2">Small</option>
          <option value="3">Normal</option>
          <option value="4">Large</option>
          <option value="5">Very Large</option>
          <option value="6">Huge</option>
        </select>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="border border-gray-700 rounded min-h-[200px] p-3 bg-gray-800 text-gray-100 focus:outline-none
          [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
        suppressContentEditableWarning={true}
      >
        Start typing here...
      </div>
    </div>
  );
};

export default Notepad;
