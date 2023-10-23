import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize';
Quill.register('modules/ImageResize', ImageResize);

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'background',
  'color',
  'link',
  'image',
  'video',
  'width',
];

const modules = {
  toolbar: [
    //[{ 'font': [] }],
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
    ['clean'],
  ],
  ImageResize: {
    parchment: Quill.import('parchment'),
  },
};

function EditorBox({ placeholder, value, ...rest }) {
  return (
    <ReactQuill
      {...rest}
      placeholder={placeholder}
      value={value || ''}
      theme='snow'
      modules={modules}
      formats={formats}
    ></ReactQuill>
  );
}

export default EditorBox;
