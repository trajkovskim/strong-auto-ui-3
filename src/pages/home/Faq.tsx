import { css } from '@emotion/css';
import Button from 'components/Button';
import Container from 'components/Container';
import Line from 'components/Line';
import Transition, { TransitionHandle } from 'components/Transition';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import { faqQuestions } from 'pages/constants';
import React, { useRef, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  justify-content: space-between;
`;

type FAQAccordionProps = {
  faq: (typeof faqQuestions)[number];
};

const FAQAccordion: React.FC<FAQAccordionProps> = (props) => {
  const transitionRef = useRef<TransitionHandle>(null);
  const [containerRef, setContainerRef] = useState<HTMLSpanElement | null>(null);

  return (
    <Container padding={{ top: 'md', bottom: 'md' }} gap="0.3rem">
      <StyledButton
        themeType="link"
        key={props.faq.id}
        iconRight={<BiPlus />}
        size="xl"
        fullwidth
        onClick={() => transitionRef.current?.toggle()}
      >
        {props.faq.question}
      </StyledButton>
      <Transition
        ref={transitionRef}
        duration="200ms"
        timingFunction="ease-in-out"
        transition={{
          initial: css`
            overflow: hidden;
            max-height: 0;
          `,
          final: css`
            max-height: ${containerRef?.scrollHeight}px;
          `,
        }}
      >
        <Text ref={setContainerRef} fontSize="lg">
          {props.faq.answer}
        </Text>
      </Transition>
    </Container>
  );
};

const FAQ: React.FC = () => {
  return (
    <Container sm="800px" centered gap="1rem" padding={{ left: 'md', right: 'md', top: 'lg', bottom: 'lg' }}>
      <Title title="Frequently asked questions" centered fontSize="2xl" />
      {faqQuestions.map((faq) => (
        <Container key={faq.id}>
          <FAQAccordion faq={faq} />
          <Line />
        </Container>
      ))}
    </Container>
  );
};

export default FAQ;
