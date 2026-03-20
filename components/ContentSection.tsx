import React from 'react';

interface Props {
  id: string;
  title: string;
  children: React.ReactNode;
}

const ContentSection: React.FC<Props> = ({ id, title, children }) => {
  return (
    <section id={id} className="py-12 md:py-20 px-6 md:px-12 lg:px-24 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Compact Title Header with Vanta Cyan Accent */}
        <div className="mb-8 flex items-center gap-3 md:gap-4">
          <div className="h-6 md:h-8 w-1.5 md:w-2 rounded-full bg-[#00d1ff] shadow-[0_0_10px_rgba(0,209,255,0.5)]"></div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-md">
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