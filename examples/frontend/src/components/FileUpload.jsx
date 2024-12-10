import { useState, useEffect } from "react";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState(""); // For showing success/failure status
    const [bucketName, setBucketName] = useState(""); // To store the bucket name
    const [rememberBucket, setRememberBucket] = useState(false); // To store the checkbox state
    const [fetchedImages, setFetchedImages] = useState([]); // To store fetched image URLs
    const [fetchError, setFetchError] = useState(null); // Error for fetching images

    // Load bucket name from localStorage
    useEffect(() => {
        const savedBucketName = localStorage.getItem("bucketName");
        if (savedBucketName) {
            setBucketName(savedBucketName);
            setRememberBucket(true);
        }
    }, []);

    // Fetch all image URLs on component mount
    useEffect(() => {
        getAllTheImageUrl();
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) {
            setStatus("Please select a file to upload.");
            return;
        }

        let formattedBucketName = bucketName;
        if (!bucketName) {
            const userBucketName = prompt("Please enter the bucket name:");
            if (!userBucketName) {
                setStatus("Bucket name is required.");
                return;
            }
            formattedBucketName = userBucketName.replace(/\s+/g, "-");
        } else {
            formattedBucketName = bucketName.replace(/\s+/g, "-");
        }

        setBucketName(formattedBucketName);

        if (rememberBucket) {
            localStorage.setItem("bucketName", formattedBucketName);
        } else {
            localStorage.removeItem("bucketName");
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("bucket", formattedBucketName);

        try {
            const response = await fetch("http://localhost:4000/upload/images", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setStatus("File uploaded successfully!");
                getAllTheImageUrl(); // Refresh images after upload
            } else {
                setStatus("Failed to upload the file.");
            }
        } catch (error) {
            setStatus(`An error occurred while uploading the file: ${error.message}`);
        }
    };

    const getAllTheImageUrl = async () => {
        try {
            const response = await fetch("http://localhost:4000/files/images");
            if (response.ok) {
                const data = await response.json();
                const images = data.files.map((file) => ({
                    name: file.Name,
                    url: file.URL,
                }));
                setFetchedImages(images); // Set the images in state
                setFetchError(null);
            } else {
                setFetchError("Failed to fetch images.");
            }
        } catch (error) {
            setFetchError(`An error occurred while fetching images: ${error.message}`);
        }
    };

    return (
        <div
            className="upload-container"
            style={{
                padding: "1rem",
                border: "1px solid #ccc",
                borderRadius: "5px",
                maxWidth: "400px",
                margin: "auto",
            }}
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

            <div style={{ marginTop: "2rem" }}>
                <h1>Image Gallery</h1>
                {fetchError ? (
                    <p style={{ color: "red" }}>{fetchError}</p>
                ) : fetchedImages.length > 0 ? (
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                            justifyContent: "center",
                        }}
                    >
                        {fetchedImages.map((image, index) => (
                            <div
                                key={index}
                                style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "5px",
                                    padding: "10px",
                                    textAlign: "center",
                                }}
                            >
                                <img
                                    src={image.url}
                                    alt={image.name}
                                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                                />
                                <p style={{ fontSize: "12px", wordBreak: "break-all" }}>{image.name}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No images found.</p>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
