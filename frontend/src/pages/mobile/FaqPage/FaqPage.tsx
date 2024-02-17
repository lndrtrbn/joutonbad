import { FAQ } from "../../../utils/faq";
import FaqPageStyle from "./FaqPage.style";
import MText from "../../../components/mobile/MText/MText";

export default function FaqPage() {
  return (
    <div className={FaqPageStyle.base}>
      <MText type="title">FAQ</MText>

      {FAQ.map((faq, i) => (
        <div key={i}>
          <MText type="accent" style="mt-12 mb-6">
            {faq.question}
          </MText>

          {faq.answers.map((answer, i) => (
            <MText
              key={i}
              color="text-m-moonlight60"
              style="mb-4"
              type="small"
            >
              {answer}
            </MText>
          ))}
        </div>
      ))}
    </div>
  );
}
