import { Editor as EditorComponent } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useTheme } from "../../hooks";

const Editor = ({ maxLength, placeholder = "", editorState, setEditorState }) => {
    const { theme: currentTheme } = useTheme();

    const theme = currentTheme === "dark" ? "dark" : (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";

    return (
        <EditorComponent
            placeholder={placeholder}
            editorClassName="bg-zinc-400 dark:bg-zinc-800 rounded-b-md border-b border-x border-white px-2"
            toolbarStyle={{
                background: theme === "dark" ? "#27272a" : "#a1a1aa",
                color: "black",
                margin: 0,
                border: "1px solid white",
                borderWidth: "1px 1px 0.2px 1px",
                borderRadius: "0.375rem 0.375rem 0 0",
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
