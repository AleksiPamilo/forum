import { Editor as EditorComponent } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = ({ maxLength, placeholder, editorState, setEditorState }) => {
    return (
        <div className="bg-zinc-600 p-4 rounded-md shadow-xl">
            <EditorComponent
                placeholder={placeholder}
                editorClassName="bg-zinc-700 rounded-t-md border-t border-x border-white px-2"
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
            <div className="w-full bg-zinc-700 text-right px-2 pb-1  rounded-b-md border-x border-b border-white">
                {editorState.getCurrentContent().getPlainText().length}/{maxLength ?? 5000}
                <span className="text-gray-400"> characters</span>
            </div>
        </div>
    )
}

export default Editor;
