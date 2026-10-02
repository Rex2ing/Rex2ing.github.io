'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { PlayIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { ProjectDemo, ResearchProject } from '@/types/project';

export default function ResearchProjectCard({ project }: { project: ResearchProject }) {
  const [activeDemo, setActiveDemo] = useState<ProjectDemo | null>(null);
  const previewDemo = project.demos[project.previewDemo];

  return (
    <>
      <article
        id={project.id}
        aria-labelledby={`${project.id}-title`}
        className="scroll-mt-24 bg-neutral-50 dark:bg-neutral-800 p-4 sm:p-5 rounded-lg shadow-sm border border-neutral-200 dark:border-[rgba(148,163,184,0.24)] hover:shadow-md transition-shadow duration-200"
      >
        <button
          type="button"
          onClick={() => setActiveDemo(previewDemo)}
          aria-label={`Play ${previewDemo.label}`}
          className="group relative block w-full mb-5 rounded-lg overflow-hidden bg-neutral-900 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Image
            src={project.preview}
            alt={project.previewAlt}
            width={1168}
            height={720}
            className="w-full h-auto"
            sizes="(max-width: 1024px) 100vw, 640px"
          />
          <span className="absolute inset-x-0 bottom-0 flex items-end gap-2 bg-gradient-to-t from-black/85 to-transparent px-4 pb-4 pt-12 text-white">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/60 bg-black/20 group-hover:bg-white/20 transition-colors">
              <PlayIcon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="self-center text-xs sm:text-sm font-medium">{previewDemo.label}</span>
          </span>
        </button>

        <h3 id={`${project.id}-title`} className="text-lg font-semibold text-primary mb-3 leading-snug">
          {project.title}
        </h3>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-600 mb-4">
          <span className="font-medium text-primary">{project.role}</span>
          <span aria-hidden="true">·</span>
          <span>{project.period}</span>
        </p>
        <p className="text-sm text-neutral-600 leading-relaxed mb-4">{project.description}</p>
        <ul aria-label="Project topics" className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-neutral-100 dark:bg-neutral-900/50 px-2.5 py-1 text-xs text-neutral-600">
              {tag}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {project.demos.map((demo) => (
            <button
              key={demo.src}
              type="button"
              onClick={() => setActiveDemo(demo)}
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 px-3 py-2 text-xs font-medium text-neutral-600 hover:border-accent hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <PlayIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {demo.label}
            </button>
          ))}
        </div>
      </article>

      <Dialog open={activeDemo !== null} onClose={() => setActiveDemo(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/75" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-3 sm:p-6">
          <DialogPanel className="w-full max-w-4xl max-h-[90dvh] overflow-y-auto rounded-xl bg-background shadow-xl border border-neutral-200">
            {activeDemo && (
              <>
                <div className="flex items-start justify-between gap-4 p-4 sm:p-5">
                  <DialogTitle className="text-base sm:text-lg font-semibold text-primary">{activeDemo.label}</DialogTitle>
                  <button
                    type="button"
                    data-autofocus
                    aria-label="Close video"
                    onClick={() => setActiveDemo(null)}
                    className="-m-2 shrink-0 rounded-md p-2 text-neutral-600 hover:text-primary focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <video
                  key={activeDemo.src}
                  controls
                  autoPlay
                  muted
                  playsInline
                  preload="metadata"
                  poster={activeDemo.poster}
                  aria-label={activeDemo.label}
                  className="block w-full max-h-[60dvh] bg-black"
                >
                  <source src={activeDemo.src} type="video/mp4" />
                  Your browser does not support embedded video. <a href={activeDemo.src}>Open the video</a>.
                </video>
                <Description className="p-4 sm:p-5 text-sm leading-relaxed text-neutral-600">
                  {activeDemo.description}
                </Description>
              </>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
