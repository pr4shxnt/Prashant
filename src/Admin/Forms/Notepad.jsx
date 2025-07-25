import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {  setProjectData } from '../../Features/Project/projectSlice';

const Notepad = () => {
  const dispatch = useDispatch();
  const { projectData } = useSelector(state => state.projects);
  const editorRef = useRef(null);
  const [activeCommands, setActiveCommands] = useState({});

  const toolbarCommands = [
  { command: 'bold', label: 'B', title: 'Bold' },
  { command: 'italic', label: 'I', title: 'Italic' },
  { command: 'underline', label: 'U', title: 'Underline' },
  { command: 'strikeThrough', label: 'S', title: 'Strike Through' },
  { command: 'justifyLeft', label: 'Left', title: 'Align Left' },
  { command: 'justifyCenter', label: 'Center', title: 'Align Center' },
  { command: 'justifyRight', label: 'Right', title: 'Align Right' },
  { command: 'insertOrderedList', label: 'OL', title: 'Ordered List' },
  { command: 'insertUnorderedList', label: 'UL', title: 'Unordered List' },
  { command: 'createLink', label: 'Link', title: 'Insert Link' },
];


  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = projectData.description || '';
    }
  }, []);

  const updateActiveCommands = () => {
    const newActive = {};
    toolbarCommands.forEach(({ command }) => {
      if (command === 'createLink') return;
      newActive[command] = document.queryCommandState(command);
    });
    setActiveCommands(newActive);
  };

  

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

    const html = editorRef.current.innerHTML;
    dispatch(setProjectData({ ...projectData, description: html }));
    updateActiveCommands();
  };

  const handleInput = () => {
    const html = editorRef.current.innerHTML;
    dispatch(setProjectData({ ...projectData, description: html }));
    updateActiveCommands();
  };

  useEffect(() => {
    document.addEventListener('selectionchange', updateActiveCommands);
    return () => {
      document.removeEventListener('selectionchange', updateActiveCommands);
    };
  }, []);

  return (
    <div className="font-sans bg-gray-900 text-gray-100">
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

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="border h-96 overflow-auto custom-scrollbar border-gray-700 rounded min-h-[300px] p-3 bg-gray-800 text-gray-100 focus:outline-none
          [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
        suppressContentEditableWarning={true}
        data-placeholder="Start typing here..."
      />
    </div>
  );
};

export default Notepad;
