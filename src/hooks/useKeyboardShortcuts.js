// src/hooks/useKeyboardShortcuts.js
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKeyboardShortcuts = ({ onNewTask, onSearch, onSave, onCancel }) => {
    const navigate = useNavigate();

    const handleKeyPress = useCallback((event) => {
        const { key, ctrlKey, metaKey } = event;
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const isModifier = isMac ? metaKey : ctrlKey;

        // Prevent shortcuts when typing in input fields
        const isInputField = ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName);

        // Ctrl/Cmd + N - New Task
        if (isModifier && key === 'n') {
            event.preventDefault();
            if (onNewTask) {
                onNewTask();
            } else {
                navigate('/add-task');
            }
        }

        // Ctrl/Cmd + K - Quick Search
        if (isModifier && key === 'k') {
            event.preventDefault();
            if (onSearch) {
                onSearch();
            } else {
                const searchInput = document.querySelector('input[type="text"]');
                searchInput?.focus();
            }
        }

        // Ctrl/Cmd + S - Save Form
        if (isModifier && key === 's') {
            event.preventDefault();
            if (onSave) {
                onSave();
            }
        }

        // Escape - Cancel/Close
        if (key === 'Escape' && !isInputField) {
            event.preventDefault();
            if (onCancel) {
                onCancel();
            } else {
                navigate(-1);
            }
        }

        // Ctrl/Cmd + / - Show shortcuts help
        if (isModifier && key === '/') {
            event.preventDefault();
            const shortcutsModal = document.getElementById('shortcuts-modal');
            if (shortcutsModal) {
                shortcutsModal.classList.toggle('hidden');
            }
        }
    }, [navigate, onNewTask, onSearch, onSave, onCancel]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    return null;
};

// Shortcuts Help Modal Component
export const ShortcutsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modKey = isMac ? '⌘' : 'Ctrl';

    const shortcuts = [
        { keys: `${modKey} + N`, description: 'Create new task' },
        { keys: `${modKey} + K`, description: 'Quick search' },
        { keys: `${modKey} + S`, description: 'Save form' },
        { keys: 'Esc', description: 'Cancel/Go back' },
        { keys: `${modKey} + /`, description: 'Show shortcuts' },
    ];

    return (
        <div
            id="shortcuts-modal"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        ⌨️ Keyboard Shortcuts
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-3">
                    {shortcuts.map((shortcut, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                        >
                            <span className="text-gray-300">{shortcut.description}</span>
                            <kbd className="px-3 py-1 bg-gray-900 text-gray-300 rounded border border-gray-600 font-mono text-sm">
                                {shortcut.keys}
                            </kbd>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                    <p className="text-gray-400 text-sm text-center">
                        Press <kbd className="px-2 py-0.5 bg-gray-900 rounded text-xs">{modKey} + /</kbd> anytime to toggle this menu
                    </p>
                </div>
            </div>
        </div>
    );
};