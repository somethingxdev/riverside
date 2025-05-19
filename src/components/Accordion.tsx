import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface accordionData {
  question: string;
  answer: string;
}

const AccordionData = ({ data }: { data: accordionData[] }) => {
  const halfLength = Math.ceil(data.length / 2);
  const firstHalf = data.slice(0, halfLength);
  const secondHalf = data.slice(halfLength);

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <Accordion type="multiple" className="w-full">
        {firstHalf.map((item, index) => (
          <AccordionItem key={item.question} value={`item-${index}`} className="bg-lightGray rounded-xl border-none mb-5 last:mb-0">
            <AccordionTrigger className="p-5 md:p-7.5 text-lg md:text-xl gap-7">{item.question}</AccordionTrigger>
            <AccordionContent className="px-5 md:pb-7.5 md:px-7.5 text-secondary">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Accordion type="multiple" className="w-full">
        {secondHalf.map((item, index) => (
          <AccordionItem key={item.question} value={`item-${index + halfLength}`} className="bg-lightGray rounded-xl border-none mb-5 last:mb-0">
            <AccordionTrigger className="p-5 md:p-7.5 text-lg md:text-xl gap-7">{item.question}</AccordionTrigger>
            <AccordionContent className="px-5 md:pb-7.5 md:px-7.5 text-secondary">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AccordionData;
