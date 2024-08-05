import React, { useState } from "react";

const Modal = ({ isVisible, onClose, onSubmit, formData, onChange }) => {
  const [imagePreview, setImagePreview] = useState("");
  const [showLightbox, setShowLightbox] = useState(false);

  if (!isVisible) return null;

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        onChange({ target: { name: "image", value: reader.result } });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle tags change
  const handleTagsChange = (e) => {
    const { value } = e.target;
    const tagsArray = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag); // Trim and filter out empty values
    onChange({ target: { name: "tags", value: tagsArray } });
  };

  // Handle opening the lightbox
  const handleOpenLightbox = () => {
    setShowLightbox(true);
  };

  // Handle closing the lightbox
  const handleCloseLightbox = () => {
    setShowLightbox(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-6/12 lg:w-6/12 xl:w-5/12 h-3/4 max-h-[70vh] overflow-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">New Initiative Form</h2>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="initiativeType"
              value={formData.initiativeType}
              onChange={onChange}
              placeholder="Initiative Type"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="Title"
              className="p-2 border rounded-lg"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              placeholder="Description"
              className="p-2 border rounded-lg"
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="p-2 border rounded-lg"
            />
            {imagePreview && (
              <div className="my-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-auto border rounded-lg cursor-pointer"
                  onClick={handleOpenLightbox}
                />
              </div>
            )}
            <input
              type="text"
              name="tags"
              value={formData.tags.join(", ")}
              onChange={handleTagsChange}
              placeholder="Tags (comma separated)"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={onChange}
              placeholder="Location"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={onChange}
              placeholder="Organization"
              className="p-2 border rounded-lg"
            />
            <select
              name="status"
              value={formData.status}
              onChange={onChange}
              className="p-2 border rounded-lg"
            >
              <option value="">Select Status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Conditionally render the donation link input field */}
            {formData.status == "Ongoing" && (
              <input
                type="text"
                name="donationLink"
                value={formData.donationLink}
                onChange={onChange}
                placeholder="Donation Link (optional)"
                className="p-2 border rounded-lg"
              />
            )}
            <input
              type="text"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={onChange}
              placeholder="Contact Email"
              className="p-2 border rounded-lg"
            />
          </div>
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition duration-200 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
              Submit Initiative
            </button>
          </div>
        </form>
        {/* Lightbox for image preview */}
        {showLightbox && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
            onClick={handleCloseLightbox}
          >
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-full max-h-full object-contain cursor-pointer"
              onClick={(e) => e.stopPropagation()} // Prevent lightbox from closing when clicking on the image
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;