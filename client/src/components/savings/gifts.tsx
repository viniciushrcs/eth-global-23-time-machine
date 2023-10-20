import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  gifts: { gifter: string; videoIPFSHash: string }[];
}

const GiftsModal: React.FC<ModalProps> = ({ isOpen, onClose, gifts }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 h-3/4 overflow-y-auto">
        <h2 className="text-3xl mb-4">Gifts</h2>
        {gifts.map((gift, index) => (
          <div key={index} className="border-b pb-4 mb-4 mt-4">
            <p>
              <strong>Gifter:</strong> {gift.gifter}
            </p>
            <div className="flex items-center mt-6">
              <video controls width="320" height="240">
                <source
                  src={`https://ipfs.io/ipfs/${gift.videoIPFSHash.replace(
                    /^\/\//,
                    '',
                  )}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        ))}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white p-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GiftsModal;
