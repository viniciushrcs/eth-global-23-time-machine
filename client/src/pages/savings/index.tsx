import { useEffect, useState } from 'react';
import CapsuleCard from '@/components/savings/capsule';
import { getCapsulesByParentAddress } from '@/lib/firestore/queries';
import { useAddress } from '@thirdweb-dev/react';
import { DocumentData } from 'firebase/firestore';

const MySavings = () => {
  const [capsules, setCapsules] = useState<DocumentData[]>([]);
  const address = useAddress();

  useEffect(() => {
    if (address) {
      const fetchCapsules = async () => {
        const allCapsules = await getCapsulesByParentAddress(address);
        console.log(capsules);
        setCapsules(allCapsules);
      };
      fetchCapsules();
    }
  }, [address]);

  return (
    <div className="w-full mt-12 p-4">
      <h1 className="text-4xl font-semibold">My Savings</h1>
      <div className="mt-8">
        {capsules.map((capsule) => (
          <CapsuleCard
            key={capsule.id}
            capsuleId={capsule.blockchainId}
            name={capsule.name}
            description={capsule.description}
            targetAmount={capsule.targetAmount}
          />
        ))}
      </div>
    </div>
  );
};

export default MySavings;
