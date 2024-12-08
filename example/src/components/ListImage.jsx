import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

const ListImage = ({ images  , bucketName}) => {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {images.length > 0 ? (
                <p>Image available in {bucketName}</p>
                images.map((image, index) => (
                    <div key={index} style={{ margin: "10px" }}>
                        <img
                            src={image}
                            alt={`Uploaded image ${index + 1}`} // Improved alt text
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                    </div>
                ))
            ) : (
                <p>No images available</p> // Message when no images are present
            )}
        </div>
    );
};

// Prop types validation
ListImage.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// Default props
ListImage.defaultProps = {
    images: [],
};

export default ListImage;
