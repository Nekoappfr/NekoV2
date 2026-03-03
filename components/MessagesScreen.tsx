
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Search } from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
  listingTitle: string;
  lastMessage: string;
  date: string;
  avatar: string;
  status: 'pending' | 'confirmed';
  isUnread: boolean;
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: 'Sophie',
    listingTitle: 'Garde de Mochi du 12 au 15 mars',
    lastMessage: 'Bonjour Juliette ! Mochi a l\'air adorable, je suis disponible pour ces dates et je serais ravie de m\'en occuper.',
    date: '12/03',
    avatar: 'https://picsum.photos/seed/sophie/112/112',
    status: 'pending',
    isUnread: true
  },
  {
    id: '2',
    name: 'Marc',
    listingTitle: 'Visite de Yuzu le 20 mars',
    lastMessage: 'C\'est d\'accord pour 14h, à bientôt ! N\'oubliez pas de me laisser les clés.',
    date: 'Hier',
    avatar: 'https://picsum.photos/seed/marc/112/112',
    status: 'confirmed',
    isUnread: false
  },
  {
    id: '3',
    name: 'Léa',
    listingTitle: 'Garde de Mochi du 12 au 15 mars',
    lastMessage: 'Merci pour votre réponse, je vous tiens au courant dès que j\'ai une confirmation pour mon déplacement.',
    date: 'Il y a 2 jours',
    avatar: 'https://picsum.photos/seed/lea/112/112',
    status: 'pending',
    isUnread: true
  },
  {
    id: '4',
    name: 'Thomas',
    listingTitle: 'Home Sitting du 5 au 10 avril',
    lastMessage: 'Est-ce que Yuzu s\'entend bien avec les autres chats ? J\'ai un petit appartement mais beaucoup d\'amour à donner.',
    date: '01/03',
    avatar: 'https://picsum.photos/seed/thomas/112/112',
    status: 'pending',
    isUnread: false
  }
];

const MessagesScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const filteredConversations = MOCK_CONVERSATIONS;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-neko-rose/20 max-w-[390px] mx-auto overflow-x-hidden">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-warm-paper transition-colors"
          >
            <ChevronLeft size={24} className="text-anthracite" />
          </button>
          <h1 className="text-[22px] font-bold text-anthracite tracking-tight">Messages</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Message List */}
      <div className="pb-24 pt-2">
        {filteredConversations.map((conv, index) => (
          <motion.div
            key={conv.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`relative py-6 px-6 flex gap-5 cursor-pointer transition-all duration-500 ease-out ${
              conv.isUnread 
                ? 'bg-white shadow-[0_20px_40px_rgba(194,94,114,0.12)] z-10 mb-4 mx-4 rounded-[24px] border border-neko-rose/10' 
                : 'opacity-40 grayscale-[0.8] hover:opacity-100 hover:grayscale-0 border-b border-warm-border mx-4'
            }`}
          >
            {/* Innovative Unread Indicator: Pulsing Aura */}
            {conv.isUnread && (
              <div className="absolute inset-0 rounded-[24px] bg-neko-rose/5 animate-pulse pointer-events-none" />
            )}

            {/* Avatar with Status Effect */}
            <div className="relative flex-shrink-0">
              <div className={`relative z-10 w-[64px] h-[64px] transition-transform duration-500 ${conv.isUnread ? 'scale-110' : 'scale-100'}`}>
                <img
                  src={conv.avatar}
                  alt={conv.name}
                  className={`w-full h-full rounded-[18px] object-cover bg-warm-paper shadow-sm ${
                    conv.isUnread ? 'ring-2 ring-neko-rose ring-offset-4' : ''
                  }`}
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Modern "NEW" Tag */}
              {conv.isUnread && (
                <div className="absolute -top-2 -right-2 z-20 bg-neko-rose text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-widest shadow-lg border-2 border-white">
                  NEW
                </div>
              )}
            </div>

            {/* Content with Dynamic Typography */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className={`text-[17px] tracking-tight truncate pr-2 ${
                  conv.isUnread ? 'font-black text-anthracite' : 'font-bold text-anthracite'
                }`}>
                  {conv.name}
                </h3>
                <span className={`text-[10px] uppercase tracking-widest font-bold ${
                  conv.isUnread ? 'text-neko-rose' : 'text-neko-olive/60'
                }`}>
                  {conv.date}
                </span>
              </div>
              
              <p className={`text-[12px] mb-1 truncate tracking-tight ${
                conv.isUnread ? 'text-neko-rose font-bold' : 'text-neko-olive font-medium'
              }`}>
                {conv.listingTitle}
              </p>
              
              <p className={`text-[13px] leading-snug truncate ${
                conv.isUnread ? 'text-anthracite font-medium' : 'text-neko-olive/50'
              }`}>
                {conv.lastMessage}
              </p>
            </div>

            {/* Subtle Arrow for read messages */}
            {!conv.isUnread && (
              <div className="flex items-center opacity-20">
                <ChevronLeft size={16} className="rotate-180" />
              </div>
            )}
          </motion.div>
        ))}

        {filteredConversations.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-neko-olive font-medium">Aucun message dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesScreen;
