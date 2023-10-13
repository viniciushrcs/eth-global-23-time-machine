import React from 'react';
import { Card } from './ui/card';

interface CapsuleProps {
  name: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  childName: string;
}

const CapsuleCard: React.FC<CapsuleProps> = ({
  name,
  description,
  currentAmount,
  targetAmount,
  childName,
}) => {
  return (
    <Card>
      {name}
      {description}
      {currentAmount}
      {targetAmount}
      {childName}
    </Card>
  );
};

export default CapsuleCard;
