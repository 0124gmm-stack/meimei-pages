
import React from 'react';

interface Props {
  id: string;
  title: string;
  children: React.ReactNode;
}

const ContentSection: React.FC<Props> = ({ id, title, children }) => {
  return (
    <section id={id} className="min-h-screen py-16 md:py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full">
        {/* Compact, upgraded section label */}
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <h2 className="text-sm md:text-base font-black text-black/20 uppercase tracking-[0.5em] whitespace-nowrap">
            {title}
          </h2>
          <div className="h-[1px] w-full bg-black/5"></div>
        </div>
        <div className="relative">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
