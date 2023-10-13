import { Web3Button, useContract, useContractWrite } from '@thirdweb-dev/react';
import CapsuleCard from './capsule';
import {
  CardTitle,
  Card,
  CardDescription,
  CardContent,
  CardHeader,
} from './ui/card';

export default function Profile() {
  const contractAddress = '';
  const { contract } = useContract(contractAddress);
  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    'createCapsule',
  );

  if (error) {
    console.log(error);
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Capsules</CardTitle>
          <CardDescription>
            Here you can see your Saving Capsules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Web3Button
            isDisabled={isLoading}
            contractAddress={contractAddress}
            action={() => mutateAsync({ args: ['My Name'] })}
          >
            Create New Capsule
          </Web3Button>
          <CapsuleCard
            name="name"
            description="description"
            childName="childName"
            currentAmount={0}
            targetAmount={100}
          />
          <CapsuleCard
            name="name"
            description="description"
            childName="childName"
            currentAmount={0}
            targetAmount={100}
          />
        </CardContent>
      </Card>
    </div>
  );
}
