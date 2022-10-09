import { Editor as EditorComponent } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = ({ maxLength, placeholder, editorState, setEditorState }) => {
    return (
        <EditorComponent
            placeholder={placeholder}
            wrapperClassName="bg-zinc-600 p-4 rounded-md border border-white"
            editorClassName="bg-zinc-700 rounded-md border border-white shadow-xl px-2"
            toolbarStyle={{
                background: "#3f3f46",
                color: "black",
                borderRadius: "0.375rem"
            }}

            editorState={editorState}
            onEditorStateChange={(newState) => {
                const contentState = newState?.getCurrentContent();
                const oldContent = editorState?.getCurrentContent();
                if (contentState === oldContent || contentState?.getPlainText().length <= (maxLength ?? 5000)) {
                    setEditorState(newState);
                }
            }}

            handleBeforeInput={chars => {
                const totalLength = editorState.getCurrentContent().getPlainText().length + chars.length;
                return totalLength > maxLength;
            }}
        />
    )
}

export default Editor;
