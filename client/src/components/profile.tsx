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
  const contractAddress = '0x5F99C695602e475CE060eF9cA3AEB3c44260218B';
  const { contract } = useContract(contractAddress);
  const { mutateAsync, isLoading, error, data } = useContractWrite(
    contract,
    'createCapsule',
  );

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data);
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
            action={() =>
              mutateAsync({ args: [10, 10] }).then((data) => console.log(data))
            }
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
