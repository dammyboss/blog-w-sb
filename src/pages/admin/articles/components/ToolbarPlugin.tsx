import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from 'lexical';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $createCodeNode } from '@lexical/code';
import { INSERT_IMAGE_COMMAND } from './ImagePlugin';

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const formatBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  };

  const formatItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
  };

  const formatUnderline = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
  };

  const formatStrikethrough = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
  };

  const formatCode = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
  };

  const formatLeft = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
  };

  const formatCenter = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
  };

  const formatRight = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
  };

  const formatJustify = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
  };

  const formatHeading = (headingSize: 'h1' | 'h2' | 'h3') => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  const formatCodeBlock = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createCodeNode());
      }
    });
  };

  const insertBulletList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  const insertNumberedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  };

  const undo = () => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  };

  const redo = () => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  };

  const insertImage = () => {
    const src = prompt('Enter image URL:');
    if (src) {
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, { src, altText: '' });
    }
  };

  return (
    <div className="flex items-center flex-wrap gap-1 p-3 border-b border-cyan-500/30 bg-gray-900/50">
      {/* Undo/Redo */}
      <button
        type="button"
        onClick={undo}
        className="w-9 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer"
        title="Undo"
      >
        <i className="ri-arrow-go-back-line text-lg text-cyan-400"></i>
      </button>
      <button
        type="button"
        onClick={redo}
        className="w-9 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer"
        title="Redo"
      >
        <i className="ri-arrow-go-forward-line text-lg text-cyan-400"></i>
      </button>

      <div className="w-px h-6 bg-cyan-500/30 mx-1"></div>

      {/* Headings */}
      <button
        type="button"
        onClick={() => formatHeading('h1')}
        className="px-3 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer font-bold text-sm text-white"
        title="Heading 1"
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => formatHeading('h2')}
        className="px-3 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer font-bold text-sm text-white"
        title="Heading 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => formatHeading('h3')}
        className="px-3 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer font-bold text-sm text-white"
        title="Heading 3"
      >
        H3
      </button>

      <div className="w-px h-6 bg-cyan-500/30 mx-1"></div>

      {/* Text Formatting */}
      <button
        type="button"
        onClick={formatBold}
        className="w-9 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer"
        title="Bold"
      >
        <i className="ri-bold text-lg text-cyan-400"></i>
      </button>
      <button
        type="button"
        onClick={formatItalic}
        className="w-9 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer"
        title="Italic"
      >
        <i className="ri-italic text-lg text-cyan-400"></i>
      </button>
      <button
        type="button"
        onClick={formatUnderline}
        className="w-9 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer"
        title="Underline"
      >
        <i className="ri-underline text-lg text-cyan-400"></i>
      </button>
      <button
        type="button"
        onClick={formatStrikethrough}
        className="w-9 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer"
        title="Strikethrough"
      >
        <i className="ri-strikethrough text-lg text-cyan-400"></i>
      </button>
      <button
        type="button"
        onClick={formatCode}
        className="w-9 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer"
        title="Inline Code"
      >
        <i className="ri-code-line text-lg text-cyan-400"></i>
      </button>

      <div className="w-px h-6 bg-cyan-500/30 mx-1"></div>

      {/* Lists */}
      <button
        type="button"
        onClick={insertBulletList}
        className="w-9 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer"
        title="Bullet List"
      >
        <i className="ri-list-unordered text-lg text-cyan-400"></i>
      </button>
      <button
        type="button"
        onClick={insertNumberedList}
        className="w-9 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer"
        title="Numbered List"
      >
        <i className="ri-list-ordered text-lg text-cyan-400"></i>
      </button>

      <div className="w-px h-6 bg-cyan-500/30 mx-1"></div>

      {/* Alignment */}
      <button
        type="button"
        onClick={formatLeft}
        className="w-9 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer"
        title="Align Left"
      >
        <i className="ri-align-left text-lg text-cyan-400"></i>
      </button>
      <button
        type="button"
        onClick={formatCenter}
        className="w-9 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer"
        title="Align Center"
      >
        <i className="ri-align-center text-lg text-cyan-400"></i>
      </button>
      <button
        type="button"
        onClick={formatRight}
        className="w-9 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer"
        title="Align Right"
      >
        <i className="ri-align-right text-lg text-cyan-400"></i>
      </button>
      <button
        type="button"
        onClick={formatJustify}
        className="w-9 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer"
        title="Justify"
      >
        <i className="ri-align-justify text-lg text-cyan-400"></i>
      </button>

      <div className="w-px h-6 bg-cyan-500/30 mx-1"></div>

      {/* Image */}
      <button
        type="button"
        onClick={insertImage}
        className="w-9 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer"
        title="Insert Image"
      >
        <i className="ri-image-line text-lg text-cyan-400"></i>
      </button>

      <div className="w-px h-6 bg-cyan-500/30 mx-1"></div>

      {/* Special Blocks */}
      <button
        type="button"
        onClick={formatQuote}
        className="w-9 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer"
        title="Quote"
      >
        <i className="ri-double-quotes-l text-lg text-cyan-400"></i>
      </button>
      <button
        type="button"
        onClick={formatCodeBlock}
        className="w-9 h-9 flex items-center justify-center hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer"
        title="Code Block"
      >
        <i className="ri-code-box-line text-lg text-cyan-400"></i>
      </button>
    </div>
  );
};

export default ToolbarPlugin;