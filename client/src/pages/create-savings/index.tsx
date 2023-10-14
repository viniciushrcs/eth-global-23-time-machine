import { Dispatch, useEffect, useState } from 'react';
import { useAddress, useSigner } from '@thirdweb-dev/react';
import { createCapsule as createBlockchainCapsule } from '@/lib/ethers/ethers';
import { createCapsule as createFirebaseCapsule } from '@/lib/firestore/queries';
import ConnectWalltetError from '@/components/error/connect-wallet';
import { Icons } from '@/components/ui/icons';
import { useDropzone } from 'react-dropzone';
import { Video } from 'lucide-react';
import { storeVideoOnIpfs } from '@/lib/ipfs/ipfs';

const VideoDropzone = ({
  setUploadedVideo,
}: {
  setUploadedVideo: Dispatch<File | null>;
}) => {
  const maxSize = 10 * 1024 * 1024;

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { 'video/*': ['.mp4'] },
    maxFiles: 1,
    onDrop: (_, fileRejections) => {
      fileRejections.forEach((file) => {
        if (file.file.size > maxSize) {
          console.error('File too large');
        }
      });
    },
  });

  const uploadedVideo = acceptedFiles[0];

  useEffect(() => {
    if (uploadedVideo) {
      setUploadedVideo(uploadedVideo);
    }
  }, [uploadedVideo, setUploadedVideo]);

  return (
    <div
      {...getRootProps({
        className:
          'dropzone flex flex-col justify-center items-center h-36 w-2/3 border-dashed border-gray-700 border-2 md:border-4 rounded-md p-2',
      })}
    >
      <input {...getInputProps()} />

      {uploadedVideo ? (
        <>
          <img
            src={URL.createObjectURL(uploadedVideo)}
            alt="Video preview"
            className="object-cover"
            width={50}
            height={50}
          />
          <p>{uploadedVideo.name}</p>
        </>
      ) : (
        <>
          <Video width={48} height={48} className="text-gray-400" />
          <p className="text-sm text-center font-medium text-gray-300">
            <span className="text-primary text-sm font-medium">
              Send your video
            </span>{' '}
            or drop it here
          </p>
          <p className="text-xs text-gray-400">MP4 de até 10MB</p>
        </>
      )}
    </div>
  );
};

const SavingsPage = () => {
  const address = useAddress();
  const [unlockTime, setUnlockTime] = useState(0);
  const [amountGoal, setAmountGoal] = useState(0);
  const [capsuleName, setCapsuleName] = useState('');
  const [capsuleDescription, setCapsuleDescription] = useState('');
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const signer = useSigner();

  const handleSubmit = async () => {
    if (signer && uploadedVideo) {
      try {
        setIsLoading(true);
        await storeVideoOnIpfs({
          name: capsuleName,
          description: capsuleDescription,
          file: uploadedVideo,
        });
        await createBlockchainCapsule(signer, unlockTime, amountGoal);

        const capsuleData = {
          unlockTime,
          amountGoal,
          creatorAddress: address,
          name: capsuleName,
          description: capsuleDescription,
        };
        await createFirebaseCapsule(capsuleData);
      } catch (e) {
        console.log('Error creating capsule', e);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('No signer');
    }
  };

  if (!address) {
    return <ConnectWalltetError />;
  }

  return (
    <div className="w-full mt-12 p-4">
      <h1 className="text-4xl font-semibold text-center">
        Create a new Saving Capsule
      </h1>
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md mt-8">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="unlockTime"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="capsuleName"
              type="text"
              placeholder="Enter a descriptive name"
              value={capsuleName}
              onChange={(e) => setCapsuleName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="capsuleDescription"
            >
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="capsuleDescription"
              type="text"
              placeholder="Enter capsule description"
              value={capsuleDescription}
              onChange={(e) => setCapsuleDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="unlockTime"
            >
              Unlock Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="unlockTime"
              type="number"
              placeholder="Enter unlock time"
              value={unlockTime}
              onChange={(e) => setUnlockTime(Number(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="amountGoal"
            >
              Amount Goal
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amountGoal"
              type="number"
              placeholder="Enter amount goal"
              value={amountGoal}
              onChange={(e) => setAmountGoal(Number(e.target.value))}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="amountGoal"
            >
              Eternize this gift with a video
            </label>
            <VideoDropzone setUploadedVideo={setUploadedVideo} />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-primary hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              {isLoading ? (
                <div className="flex">
                  <Icons.spinner className="mr-2 animate-spin" />
                  Creating...
                </div>
              ) : (
                'Create New Capsule'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SavingsPage;
