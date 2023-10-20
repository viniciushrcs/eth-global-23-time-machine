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
import { getGifts, openCapsule } from '@/lib/ethers/ethers';
import { Separator } from '../ui/separator';
import GiftsModal from './gifts';

interface CapsuleProps {
  name: string;
  description: string;
  amountGoal: number;
  capsuleId: number;
}

const CapsuleCard: React.FC<CapsuleProps> = ({
  name,
  description,
  amountGoal,
  capsuleId,
}) => {
  const signer = useSigner();
  const [gifts, setGifts] = React.useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenCapsule = async () => {
    if (signer) {
      try {
        await openCapsule(signer, capsuleId);
        const gifts = await getGifts(signer, capsuleId);
        setGifts(gifts);
        setIsModalOpen(true);
      } catch (error) {
        console.error('Error opening capsule:', error);
      }
    } else {
      console.error('No signer available');
    }
  };

  return (
    <>
      <Card className="flex flex-col p-10 w-[300px] h-[250px] gap-y-3">
        <CardTitle>{name.toLocaleUpperCase()}</CardTitle>
        <CardDescription>Description: {description}</CardDescription>
        <CardContent>
          <p>Target Amount: {amountGoal} WEI</p>
          <p>Current Amount: {amountGoal} WEI</p>
        </CardContent>
        <Separator className="border-2" />
        <CardFooter>
          <Button onClick={handleOpenCapsule}>Open Capsule</Button>
        </CardFooter>
      </Card>
      <GiftsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gifts={gifts}
      />
    </>
  );
};

export default CapsuleCard;
