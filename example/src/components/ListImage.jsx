import PropTypes from "prop-types"; // Import PropTypes

const ListImage = ({ images, bucketName }) => {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" , backgroundColor : "black"}}>
            {images.length > 0 ? (
                <>
                    <p
                        style={{
                            margin: "10px",
                            color: "white",
                            backgroundColor: "#007bff",
                            padding: "10px",
                        }}
                    >
                        {bucketName}
                    </p>
                    {images.map((image, index) => (
                        <div key={index} style={{ margin: "10px" }}>
                            <img
                                src={image}
                                alt={`Uploaded image ${index + 1}`} // Improved alt text
                                style={{ maxWidth: "100px", maxHeight: "100px" }}
                            />
                        </div>
                    ))}
                </>
            ) : (
                <p>No images available</p> // Message when no images are present
            )}
        </div>
    );
};

// Prop types validation
ListImage.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    bucketName: PropTypes.string.isRequired,
};

// Default props
ListImage.defaultProps = {
    images: [],
    bucketName: "Unknown Bucket",
};

export default ListImage;
