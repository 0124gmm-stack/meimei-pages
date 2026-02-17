import React from 'react';

interface Props {
  id: string;
  title: string;
  isDark?: boolean;
  children: React.ReactNode;
}

const ContentSection: React.FC<Props> = ({ id, title, isDark = false, children }) => {
  return (
    <section id={id} className={`py-12 md:py-20 px-6 md:px-12 lg:px-24 flex flex-col justify-center ${isDark ? 'bg-[#0a2540] text-white' : ''}`}>
      <div className="max-w-6xl mx-auto w-full">
        {/* Compact Title Header */}
        <div className="mb-8 flex items-center gap-3 md:gap-4">
          <div className={`h-6 md:h-8 w-1.5 md:w-2 rounded-full ${isDark ? 'bg-indigo-500' : 'bg-indigo-600'}`}></div>
          <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0a2540]'}`}>
            {title}
          </h2>
        </div>
        <div className="relative">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;