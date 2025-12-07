import { DecoratorNode, DOMConversionMap, DOMConversionOutput, EditorConfig, LexicalEditor, NodeKey, SerializedLexicalNode, Spread } from 'lexical';
import React from 'react';
import { ReactNode } from 'react';

export type SerializedImageNode = Spread<
  {
    src: string;
    altText: string;
    width?: number;
    height?: number;
  },
  SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<ReactNode> {
  __src: string;
  __altText: string;
  __width?: number;
  __height?: number;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__altText, node.__width, node.__height, node.__key);
  }

  constructor(
    src: string,
    altText: string,
    width?: number,
    height?: number,
    key?: NodeKey,
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width;
    this.__height = height;
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { src, altText, width, height } = serializedNode;
    return new ImageNode(src, altText, width, height);
  }

  exportJSON(): SerializedImageNode {
    return {
      type: 'image',
      version: 1,
      src: this.__src,
      altText: this.__altText,
      width: this.__width,
      height: this.__height,
    };
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    const img = document.createElement('img');
    img.src = this.__src;
    img.alt = this.__altText;
    if (this.__width) img.width = this.__width;
    if (this.__height) img.height = this.__height;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    span.appendChild(img);
    return span;
  }

  updateDOM(prevNode: ImageNode, dom: HTMLElement, _config: EditorConfig): boolean {
    const img = dom.querySelector('img');
    if (!img) return false;
    if (this.__src !== prevNode.__src) img.src = this.__src;
    if (this.__altText !== prevNode.__altText) img.alt = this.__altText;
    if (this.__width !== prevNode.__width) img.width = this.__width || 0;
    if (this.__height !== prevNode.__height) img.height = this.__height || 0;
    return false;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: (_node: Node) => ({
        conversion: convertImageElement,
        priority: 0,
      }),
    };
  }

  decorate(_editor: LexicalEditor, _config: EditorConfig): ReactNode {
    // We'll return a React component for the editor
    return React.createElement('img', {
      src: this.__src,
      alt: this.__altText,
      width: this.__width,
      height: this.__height,
      style: { maxWidth: '100%', height: 'auto' },
      className: 'inline-block',
    });
  }
}

function convertImageElement(node: Node): DOMConversionOutput {
  const img = node as HTMLImageElement;
  const src = img.getAttribute('src') || '';
  const alt = img.getAttribute('alt') || '';
  const width = img.width || undefined;
  const height = img.height || undefined;
  const imageNode = new ImageNode(src, alt, width, height);
  return { node: imageNode };
}

export function $createImageNode(src: string, altText: string, width?: number, height?: number): ImageNode {
  return new ImageNode(src, altText, width, height);
}

export function $isImageNode(node: any): node is ImageNode {
  return node instanceof ImageNode;
}