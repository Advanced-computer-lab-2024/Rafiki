import { FaFilePdf, FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const UploadedDocuments = ({
  handleFileChange,
  handleUpload,
  isUploading,
  uploadedDocuments,
  handleDocumentAction,
  show,
  uploadError,
  selectedFile,
}) => {
  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        Uploaded Documents
      </h2>

      {/* File Upload Section */}
      {/* <div className="flex items-center space-x-4 mb-6">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`px-4 py-2 text-white font-medium rounded-lg shadow-md transition ${
            isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          }`}
        >
          {isUploading ? "Uploading..." : "Upload PDF"}
        </button>
      </div> */}

      {/* Upload Error or Success */}
      {uploadError && (
        <p className="text-red-500 font-medium mb-4">{uploadError}</p>
      )}
      {selectedFile && (
        <p className="text-green-600 font-medium mb-4">
          Selected File: {selectedFile.name}
        </p>
      )}

      {/* Uploaded Documents */}
      {uploadedDocuments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {uploadedDocuments.map((document) => (
            <div
              key={document._id}
              className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center text-center"
            >
              {/* PDF Icon */}
              <FaFilePdf className="text-red-500 text-6xl mb-3" />
              {/* Document Name */}
              <p className="text-gray-800 font-semibold mb-3 truncate">
                {document.originalname}
              </p>
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => show(document.filename)}
                  className="flex items-center space-x-1 text-blue-500 hover:text-blue-600"
                >
                  <FaEye />
                  <span>View</span>
                </button>
                <button
                  onClick={() =>
                    handleDocumentAction(document.originalname, "accept")
                  }
                  className="flex items-center space-x-1 text-green-500 hover:text-green-600"
                >
                  <FaCheckCircle />
                  <span>Accept</span>
                </button>
                <button
                  onClick={() =>
                    handleDocumentAction(document.originalname, "reject")
                  }
                  className="flex items-center space-x-1 text-red-500 hover:text-red-600"
                >
                  <FaTimesCircle />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No documents uploaded yet.</p>
      )}
    </div>
  );
};

export default UploadedDocuments;
