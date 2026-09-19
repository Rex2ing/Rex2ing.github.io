'use client';

import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { Github, ArrowUpRight } from 'lucide-react';
import type { SiteConfig } from '@/lib/config';

interface ProfileProps {
    author: SiteConfig['author'];
    social: SiteConfig['social'];
    features: SiteConfig['features'];
    researchInterests?: string[];
}

export default function Profile({ author, social, researchInterests }: ProfileProps) {
    const links = [
        { name: 'Google Scholar', href: social.google_scholar, icon: AcademicCapIcon },
        { name: 'GitHub', href: social.github, icon: Github },
    ].filter((link) => link.href);

    return (
        <aside className="lg:sticky lg:top-28 lg:pr-6">
            <div className="w-12 h-1 bg-accent rounded-full mb-7" aria-hidden="true" />
            <h1 className="text-4xl font-serif font-bold text-primary tracking-tight mb-3">
                {author.name}
            </h1>
            {author.name_zh && (
                <p lang="zh-CN" className="text-xl text-neutral-600 tracking-widest mb-6">{author.name_zh}</p>
            )}
            <p className="text-sm leading-relaxed text-neutral-600 mb-1">{author.title}</p>
            <p className="text-base font-medium text-primary">{author.institution}</p>

            {researchInterests && researchInterests.length > 0 && (
                <div className="border-t border-neutral-200 mt-8 pt-6">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Research Interests</h2>
                    <ul className="space-y-3 text-sm text-neutral-700">
                        {researchInterests.map((interest) => (
                            <li key={interest} className="flex gap-3 items-start">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                                {interest}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="flex flex-col gap-3 mt-8">
                {links.map(({ name, href, icon: Icon }) => (
                    <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-sm text-neutral-600 hover:text-primary transition-colors w-fit rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        {name}
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                ))}
            </div>
        </aside>
    );
}
