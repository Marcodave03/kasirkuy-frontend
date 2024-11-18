"use client"
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

function AddTransactionBtn() {
  const router = useRouter();

  const handleAddTransaction = () => {
    router.push('/dashboard/addtransaction');
  };

  return (
    <Button variant="default" onClick={handleAddTransaction}>+ Add Transaction </Button>
  )
}

export default AddTransactionBtn
