import { FAQ } from "../../utils/faq";
import FaqPageStyle from "./FaqPage.style";
import Title from "../../components/Title/Title";
import Separator from "../../components/Separator/Separator";

export default function FaqPage() {
  return (
    <div>
      <Title size="3xl">Foire aux questions</Title>
      <Separator />

      <div className={FaqPageStyle.base}>
        {FAQ.map((faq, i) => (
          <section
            key={i}
            className="max-w-full border border-black/10 p-6 rounded-xl sm:max-w-[1000px]"
          >
            <Title size="2xl">{faq.question}</Title>
            {faq.answers.map((answer, i) => (
              <Title key={i} subtitle>
                {answer}
              </Title>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
