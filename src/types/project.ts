export interface ProjectDemo {
  label: string;
  src: string;
  poster: string;
  description: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  preview: string;
  previewAlt: string;
  previewDemo: number;
  demos: ProjectDemo[];
}
