import React from "react";
import { useDropzone } from "react-dropzone";

type DropzoneProps = {
    multiple?: boolean;
    maxFiles?: number;
    acceptedFiles?: {};
    onChange: (acceptedFiles: File[]) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ multiple, maxFiles, acceptedFiles, onChange }) => {
    const [filenames, setFilenames] = React.useState<string[] | null>(null);
    const { isDragAccept, isDragReject, fileRejections, getRootProps, getInputProps } = useDropzone({
        accept: acceptedFiles,
        maxFiles: maxFiles ?? 500,
        multiple: multiple ?? true,
        onDrop: (acceptedFiles) => {
            onChange(acceptedFiles);
            setFilenames(acceptedFiles.map(x => x.name));
        }
    });

    return (
        <div className={`flex justify-center items-center w-full min-h-[5rem] rounded border-2 border-dashed cursor-pointer
            ${isDragAccept ? "border-green-500" : isDragReject ? "border-red-500" : "border-zinc-500 hover:border-zinc-400"}
        `} {...getRootProps()}>
            <input {...getInputProps()} />
            <p>{filenames?.join(", ") ?? "Click to select files or drag & drop"}</p>
            {fileRejections.length > 0 && <p>{fileRejections[0].errors[0].message}!</p>}
        </div>
    )
}

export default Dropzone;