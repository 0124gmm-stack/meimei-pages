
export type SectionType = 'hero' | 'work' | 'education' | 'contact';

export interface Project {
  id: number;
  title: string;
  description: string;
  color: string;
  image: string;
}

export interface MascotState {
  mood: 'happy' | 'thinking' | 'dancing' | 'curious';
  rotation: number;
  scale: number;
}
