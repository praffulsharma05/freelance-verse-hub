
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const FloatingMessage = () => {
  const handleClick = () => {
    toast.success("Message feature will be available soon!");
  };
  
  return (
    <div className="fixed bottom-5 left-5 z-50">
      <Button
        onClick={handleClick}
        className="rounded-full w-14 h-14 flex items-center justify-center bg-blue-500 hover:bg-blue-600 shadow-lg"
      >
        <MessageCircle size={24} />
      </Button>
    </div>
  );
};

export default FloatingMessage;
