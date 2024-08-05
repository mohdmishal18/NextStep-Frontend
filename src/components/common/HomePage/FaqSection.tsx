import React from 'react';

interface FAQData {
  question: string;
  answer?: string;
}

const faqData: FAQData[] = [
  {
    question: "Is there a free trial available?",
    answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."
  },
  { question: "Can I change my plan later?" },
  { question: "What is your cancellation policy?" },
  { question: "Can other info be added to an invoice?" },
  { question: "How does billing work?" },
  { question: "How do I change my account email?" }
];

const FaqSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center mx-auto max-w-screen-md rounded-none">
      <header className="flex flex-col px-8 w-full text-center max-w-[612px] max-md:px-5 max-md:max-w-full">
        <h1 className="text-4xl font-semibold tracking-tighter leading-none text-blue max-md:max-w-full">
          Frequently asked questions
        </h1>
        <p className="mt-5 text-xl text-sky-50 max-md:max-w-full">
          Everything you need to know about the our platform.
        </p>
      </header>
      <div className="flex flex-col self-stretch mt-20 w-full max-md:mt-10 max-md:max-w-full">
        {faqData.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
      <ContactSection />
    </section>
  );
};

interface FAQItemProps {
  question: string;
  answer?: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  return (
    <div className="flex flex-col w-full max-md:max-w-full">
      <div className="flex w-full bg-sky-50 min-h-[1px] max-md:max-w-full" />
      <div className="flex flex-wrap gap-5 items-start mt-6 w-full max-md:max-w-full">
        <div className="flex-1 shrink text-lg font-medium leading-loose text-blue min-w-[240px] max-md:max-w-full">
          {question}
        </div>
        <div className="flex flex-col pt-0.5 w-6">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9de1be637507340980767a50e7a136c0e882d3353008c21e699ace7dd7999d54?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be" className="object-contain w-6 aspect-square" alt="" />
        </div>
      </div>
      {answer && (
        <div className="mt-2 text-base leading-6 text-sky-50 max-md:max-w-full">
          {answer}
        </div>
      )}
    </div>
  );
};

const ContactSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center pt-8 pb-2 mt-28 w-full text-sky-50 bg-blue rounded-2xl max-w-[631px] min-h-[281px] max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col items-center mt-8 w-full text-center max-md:max-w-full">
        <h2 className="text-xl font-medium max-md:max-w-full">Still have questions?</h2>
        <p className="mt-2 text-lg leading-loose max-md:max-w-full">
          Can't find the answer you're looking for? go to the FAQ's Section. :)
        </p>
      </div>
      <button className="mt-8 max-w-full text-base font-medium whitespace-nowrap w-[146px] overflow-hidden px-5 py-4 rounded-xl shadow-sm bg-zinc-900 min-h-[55px]">
        more
      </button>
    </section>
  );
};

export default FaqSection;
