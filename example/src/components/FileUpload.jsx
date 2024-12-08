import { useState, useEffect } from "react";
import ListImage from "./ListImage";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState(""); // For showing success/failure status
    const [bucketName, setBucketName] = useState(""); // To store the bucket name
    const [rememberBucket, setRememberBucket] = useState(false); // To store the checkbox state

    // Check if a bucket name is stored in localStorage
    useEffect(() => {
        const savedBucketName = localStorage.getItem("bucketName");
        if (savedBucketName) {
            setBucketName(savedBucketName);
            setRememberBucket(true);
        }
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) {
            setStatus("Please select a file to upload.");
            return;
        }

        // Ask for the bucket name if not already set
        if (!bucketName) {
            const userBucketName = prompt("Please enter the bucket name:");
            if (!userBucketName) {
                setStatus("Bucket name is required.");
                return;
            }
            // Replace spaces with hyphens
            const formattedBucketName = userBucketName.replace(/\s+/g, "-");
            setBucketName(formattedBucketName);
        } else {
            // Replace spaces with hyphens if bucket name exists
            setBucketName(bucketName.replace(/\s+/g, "-"));
        }

        // Save bucket name to localStorage if checkbox is checked
        if (rememberBucket) {
            localStorage.setItem("bucketName", bucketName);
        } else {
            localStorage.removeItem("bucketName");
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:3001/", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setStatus("File uploaded successfully!");
            } else {
                setStatus("Failed to upload the file.");
            }
        } catch (e) {
            setStatus("An error occurred while uploading the file." + e);
        }
    };

    const images = [
        "https://images.unsplash.com/photo-1730818203797-897b2838105a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBwJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1730818203797-897b2838105a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBwJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
    ];

    return (
        <div
            className="upload-container"
            style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "5px", maxWidth: "400px" }}
        >
            <h3>Upload a File</h3>
            <input type="file" onChange={handleFileChange} style={{ margin: "1rem 0" }} />
            {file && (
                <div
                    style={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <p>Uploaded File: {file.name}</p>
                    <img
                        src={URL.createObjectURL(file)}
                        alt="uploaded file"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                    <button onClick={() => setFile(null)}>Remove File</button>
                    <button style={{ marginTop: "1rem" }} onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            )}

            <div style={{ marginTop: "1rem", textAlign: "center", color: "green" }}>
                {status && <p>{status}</p>}
            </div>

            {/* Bucket name input and remember checkbox */}
            {bucketName && (
                <div style={{ marginTop: "1rem" }}>
                    <p>Bucket Name: {bucketName}</p>
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberBucket}
                            onChange={() => setRememberBucket(!rememberBucket)}
                        />
                        Remember this bucket name
                    </label>
                </div>
            )}

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                    backgroundColor: "#242424",
                    padding: "20px",
                    boxSizing: "border-box",
                }}
            >
                <h1 style={{ color: "white", fontFamily: "'Roboto', sans-serif" }}>Image Gallery</h1>
                <div
                    style={{
                        border: "2px solid #ccc",
                        borderRadius: "8px",
                        padding: "20px",
                        backgroundColor: "#242424",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        width: "80%",
                        maxWidth: "1000px",
                    }}
                >
                    <ListImage images={images} bucketName={bucketName} />
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
