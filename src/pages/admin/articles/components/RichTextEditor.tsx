
import { useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $insertNodes, EditorState } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import ToolbarPlugin from './ToolbarPlugin';
import { ImageNode } from './ImageNode';
import ImagePlugin from './ImagePlugin';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

// Plugin to set initial content from HTML
function InitialContentPlugin({ content }: { content: string }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (content) {
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(content, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        const root = $getRoot();
        root.clear();
        root.select();
        $insertNodes(nodes);
      });
    }
  }, []); // Only run once on mount

  return null;
}

// Plugin to handle content changes
function OnChangeContentPlugin({ onChange }: { onChange: (value: string) => void }) {
  const [editor] = useLexicalComposerContext();

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      const htmlString = $generateHtmlFromNodes(editor);
      onChange(htmlString);
    });
  };

  return <OnChangePlugin onChange={handleChange} />;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const initialConfig = {
    namespace: 'ArticleEditor',
    theme: {
      paragraph: 'mb-3 text-base leading-relaxed text-white',
      heading: {
        h1: 'text-3xl font-bold mb-4 mt-6 text-white',
        h2: 'text-2xl font-bold mb-3 mt-5 text-white',
        h3: 'text-xl font-bold mb-2 mt-4 text-white',
      },
      list: {
        ul: 'list-disc ml-6 mb-3 space-y-1 text-white',
        ol: 'list-decimal ml-6 mb-3 space-y-1 text-white',
        listitem: 'ml-2',
        nested: {
          listitem: 'list-none',
        },
      },
      quote: 'border-l-4 border-cyan-400 pl-4 italic my-4 text-gray-300 bg-cyan-500/10 py-2',
      code: 'bg-gray-800 text-cyan-400 rounded px-1 py-0.5 font-mono text-sm',
      codeHighlight: {
        atrule: 'text-purple-400',
        attr: 'text-blue-400',
        boolean: 'text-orange-400',
        builtin: 'text-cyan-400',
        cdata: 'text-gray-400',
        char: 'text-green-400',
        class: 'text-yellow-400',
        'class-name': 'text-yellow-400',
        comment: 'text-gray-500',
        constant: 'text-orange-400',
        deleted: 'text-red-400',
        doctype: 'text-gray-400',
        entity: 'text-orange-400',
        function: 'text-blue-400',
        important: 'text-red-400',
        inserted: 'text-green-400',
        keyword: 'text-purple-400',
        namespace: 'text-yellow-400',
        number: 'text-orange-400',
        operator: 'text-cyan-400',
        prolog: 'text-gray-400',
        property: 'text-blue-400',
        punctuation: 'text-gray-300',
        regex: 'text-orange-400',
        selector: 'text-green-400',
        string: 'text-green-400',
        symbol: 'text-orange-400',
        tag: 'text-red-400',
        url: 'text-blue-400',
        variable: 'text-orange-400',
      },
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
        underlineStrikethrough: 'underline line-through',
        code: 'bg-gray-800 text-cyan-400 rounded px-1 py-0.5 font-mono text-sm',
      },
    },
    onError: (error: Error) => {
      console.error(error);
    },
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      CodeNode,
      CodeHighlightNode,
      LinkNode,
      ImageNode
    ],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border border-cyan-500/30 rounded-xl overflow-hidden bg-black/50">
        <ToolbarPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[400px] max-h-[600px] overflow-y-auto px-6 py-4 focus:outline-none text-sm prose prose-sm max-w-none text-white" />
            }
            placeholder={
              <div className="absolute top-4 left-6 text-gray-500 text-sm pointer-events-none">
                Start writing your article content...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <ListPlugin />
        <ImagePlugin />
        <OnChangeContentPlugin onChange={onChange} />
        <InitialContentPlugin content={value} />
      </div>
    </LexicalComposer>
  );
};

export default RichTextEditor;
