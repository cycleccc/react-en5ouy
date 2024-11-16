import React, { useState, useEffect } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
} from '@mui/material';
import '@wangeditor-next/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor-next/editor-for-react';
import {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor-next/editor';
const App = () => {
  const [editor, setEditor] = useState(null); // 存储 editor 实例
  const [html, setHtml] = useState('<p>hello</p>');
  const [open, setOpen] = useState(false);

  // 及时销毁 editor
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    console.log('editor');
    editor.destroy();
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleClickOpen}>添加公告</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>输入标题和正文</DialogTitle>
        <DialogContent>
          <Toolbar
            editor={editor}
            mode="default"
            style={{ borderBottom: '1px solid #ccc' }}
          />
          <Editor
            value={html}
            onCreated={setEditor}
            onChange={(editor) => {
              setHtml(editor.getHtml());
            }}
            mode="default"
            style={{ height: '300px', overflowY: 'hidden' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
