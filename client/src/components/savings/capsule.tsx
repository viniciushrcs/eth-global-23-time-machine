import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { useSigner } from '@thirdweb-dev/react';
import { openCapsule } from '@/lib/ethers/ethers';

interface CapsuleProps {
  name: string;
  description: string;
  targetAmount: number;
  capsuleId: number;
}

const CapsuleCard: React.FC<CapsuleProps> = ({
  name,
  description,
  targetAmount,
  capsuleId,
}) => {
  const signer = useSigner();

  const handleOpenCapsule = async () => {
    if (signer) {
      try {
        await openCapsule(signer, capsuleId);
      } catch (error) {
        console.error('Error opening capsule:', error);
      }
    } else {
      console.error('No signer available');
    }
  };

  return (
    <Card className="flex flex-col p-10 w-[400px] gap-y-3">
      <CardTitle>Saving: {name}</CardTitle>
      <CardDescription>Description: {description}</CardDescription>
      <CardContent>
        <p>Target Amount: {targetAmount}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleOpenCapsule}>Open Capsule</Button>
      </CardFooter>
    </Card>
  );
};

export default CapsuleCard;
