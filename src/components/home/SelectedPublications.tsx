'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { DocumentTextIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';
import FormattedBibTeXText from '@/components/publications/FormattedBibTeXText';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    sectionId?: string;
}

export default function SelectedPublications({ publications, title, sectionId }: SelectedPublicationsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.selectedPublications;

    return (
        <motion.section
            id={sectionId}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="scroll-mt-24"
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{resolvedTitle}</h2>
            <div className="space-y-4">
                {publications.map((pub) => (
                    <article
                        key={pub.id}
                        className="bg-neutral-50 dark:bg-neutral-800 p-4 sm:p-5 rounded-lg shadow-sm border border-neutral-200 dark:border-[rgba(148,163,184,0.24)] hover:shadow-md transition-shadow duration-200"
                    >
                        {pub.preview && (
                            <a href={pub.projectUrl || pub.url} target="_blank" rel="noopener noreferrer"
                                aria-label={`View ${pub.title} project website`}
                                className="block mb-5 rounded-lg overflow-hidden bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                                <Image
                                    src={`/papers/${pub.preview}`}
                                    alt={`${pub.title} — project overview`}
                                    width={2020}
                                    height={1122}
                                    className="w-full h-auto"
                                    sizes="(max-width: 1024px) 100vw, 640px"
                                />
                            </a>
                        )}
                        <h3 className="text-lg font-semibold text-primary mb-3 leading-snug">
                            {pub.url ? (
                                <a href={pub.url} target="_blank" rel="noopener noreferrer"
                                    className="hover:underline underline-offset-4">
                                    <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />
                                </a>
                            ) : <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />}
                        </h3>
                        <p className="text-sm leading-relaxed text-neutral-600 mb-2">
                            {pub.authors.map((author, idx) => (
                                <span key={idx}>
                                    {author.isHighlighted
                                        ? <strong className="font-semibold text-primary">{author.name}</strong>
                                        : <span>{author.name}</span>}
                                    {author.isCoAuthor && <sup>*</sup>}
                                    {author.isCorresponding && <sup>†</sup>}
                                    {idx < pub.authors.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                        <p className="text-xs text-neutral-500 mb-4">
                            {pub.authors.some(author => author.isCoAuthor) && '* Equal contribution'}
                            {pub.authors.some(author => author.isCoAuthor) && pub.authors.some(author => author.isCorresponding) && ' · '}
                            {pub.authors.some(author => author.isCorresponding) && '† Corresponding author'}
                        </p>
                        <p className="text-sm font-medium text-primary mb-3">
                            {pub.journal || pub.conference} {pub.year}
                            {pub.status === 'accepted' && (
                                <span className="inline-block ml-2 rounded-full border border-accent/50 px-2 py-0.5 text-xs font-medium">Accepted</span>
                            )}
                        </p>
                        {pub.description && (
                            <p className="text-sm text-neutral-600 leading-relaxed mb-4">{pub.description}</p>
                        )}
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Paper', href: pub.pdfUrl, icon: DocumentTextIcon },
                                { label: 'arXiv', href: pub.url, icon: ArrowTopRightOnSquareIcon },
                                { label: 'Project Page', href: pub.projectUrl, icon: ArrowTopRightOnSquareIcon },
                            ].filter(link => link.href).map(({ label, href, icon: Icon }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:border-accent hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                                    {label}
                                </a>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </motion.section>
    );
}
