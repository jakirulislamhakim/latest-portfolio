import type { TAboutParagraph } from '../types';

type TAboutParagraphBlockProps = {
  paragraph: TAboutParagraph;
};

export function AboutParagraphBlock({ paragraph }: TAboutParagraphBlockProps) {
  return (
    <div className="px-2 py-2 md:px-3">
      <p className="text-justify text-base leading-relaxed text-foreground">{paragraph.text}</p>
    </div>
  );
}
