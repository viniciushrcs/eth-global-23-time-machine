import { NFT_STORAGE_API_KEY } from '@/constants/contract';
import { NFTStorage } from 'nft.storage';

export async function storeVideoOnIpfs({
  name,
  description,
  file,
}: {
  file: File;
  name: string;
  description: string;
}) {
  const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });
  const metadata = await client.store({
    name,
    description,
    image: new File([file], 'image.png', { type: 'image/png' }),
  });

  console.log('NFT data stored!');
  console.log('Metadata URI: ', metadata.url);
  return metadata;
}
