import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodes, COMMAND_PRIORITY_EDITOR, createCommand, LexicalCommand, PASTE_COMMAND } from 'lexical';
import { useEffect } from 'react';
import { $createImageNode, ImageNode } from './ImageNode';

export const INSERT_IMAGE_COMMAND: LexicalCommand<{
  src: string;
  altText?: string;
  width?: number;
  height?: number;
}> = createCommand('INSERT_IMAGE_COMMAND');

export default function ImagePlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      console.error('ImagePlugin: ImageNode not registered on editor');
    }

    const removeCommand = editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      ({ src, altText = '', width, height }) => {
        const imageNode = $createImageNode(src, altText, width, height);
        $insertNodes([imageNode]);
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    // Handle paste of images (HTML img tags)
    const removePaste = editor.registerCommand(
      PASTE_COMMAND,
      (event: ClipboardEvent) => {
        const { clipboardData } = event;
        if (!clipboardData) return false;

        const html = clipboardData.getData('text/html');
        if (!html) return false;

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const imgElements = doc.querySelectorAll('img');
        if (imgElements.length === 0) return false;

        event.preventDefault();
        editor.update(() => {
          for (const img of Array.from(imgElements)) {
            const src = img.getAttribute('src');
            const alt = img.getAttribute('alt') || '';
            const width = parseInt(img.getAttribute('width') || '0') || undefined;
            const height = parseInt(img.getAttribute('height') || '0') || undefined;
            if (src) {
              const imageNode = $createImageNode(src, alt, width, height);
              $insertNodes([imageNode]);
            }
          }
        });
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      removeCommand();
      removePaste();
    };
  }, [editor]);

  return null;
}