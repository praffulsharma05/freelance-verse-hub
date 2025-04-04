
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, X } from 'lucide-react';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', text: 'Hello! I\'m your AI assistant. How can I help you today?' }
  ]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, { type: 'user', text: message }]);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev, 
        { 
          type: 'bot', 
          text: `I'm an AI assistant bot. I can help you navigate Co-Lancer, find projects, or answer questions about freelancing. This is a demo response.` 
        }
      ]);
    }, 1000);
    
    // Clear input field
    setMessage('');
  };
  
  return (
    <>
      {/* Floating chat button */}
      <div className="fixed bottom-5 right-5 z-50">
        <Button
          onClick={toggleChat}
          className={`rounded-full w-14 h-14 flex items-center justify-center shadow-lg ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-colancer-purple hover:bg-colancer-darkpurple'}`}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </Button>
      </div>
      
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 w-80 md:w-96 h-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col z-40 border border-gray-200">
          {/* Header */}
          <div className="bg-colancer-purple text-white p-4 flex items-center justify-between">
            <h3 className="font-medium">Ask AI...</h3>
            <Button variant="ghost" size="sm" onClick={toggleChat} className="text-white hover:bg-colancer-darkpurple">
              <X size={18} />
            </Button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((chat, index) => (
              <div 
                key={index} 
                className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    chat.type === 'user' 
                      ? 'bg-colancer-purple text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {chat.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Input area */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-colancer-purple"
            />
            <Button 
              type="submit"
              className="bg-colancer-purple hover:bg-colancer-darkpurple rounded-l-none"
            >
              <Send size={18} />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatBot;
