import { useState } from "react";

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    return (
        <div
            className="upload-container"
            style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "5px", maxWidth: "400px" }}
        >
            <h3>Upload a File</h3>
            <input type="file" onChange={handleFileChange} style={{ margin: "1rem 0" }} />
            {file && (
                <div style={{ textAlign: "center" , display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <p>Uploaded File: {file.name}</p>
                    <img
                        src={URL.createObjectURL(file)}
                        alt="uploaded file"
                        style={{ maxWidth: "100px", maxHeight: "100px" ,  }}
                    />
                    <button onClick={() => setFile(null)}>Remove File</button>
                    <button style={{marginTop: "1rem"}} onClick={() => setFile(null)}>Upload Another File</button>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
