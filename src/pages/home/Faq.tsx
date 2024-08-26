import { css } from '@emotion/css';
import { BoxAnimation, Button, Container, Line, Text, Title, Transition, TransitionHandle } from 'components/common';
import { useTranslation } from 'hooks';
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
  const t = useTranslation('home.generalFaq');
  const transitionRef = useRef<TransitionHandle>(null);
  const [containerRef, setContainerRef] = useState<HTMLSpanElement | null>(null);

  return (
    <Container styleConfig={{ padding: { top: 'md', bottom: 'md' }, gap: '0.3rem' }}>
      <StyledButton
        themeType="link"
        key={props.faq.id}
        iconRight={<BiPlus />}
        size="xl"
        fullwidth
        onClick={() => transitionRef.current?.toggle()}
      >
        {t(props.faq.question)}
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
          {t(props.faq.answer)}
        </Text>
      </Transition>
    </Container>
  );
};

const FAQ: React.FC = () => {
  const t = useTranslation('home.generalFaq');

  return (
    <Container
      xs="1400px"
      styleConfig={{
        centered: true,
        gap: '3rem',
        direction: 'row',
        wrap: true,
        padding: { left: 'md', right: 'md' },
      }}
    >
      <Container xs={12} lg={6}>
        <Title
          fontSize={{ title: '2xl', description: 'lg' }}
          title={t('title')}
          description={t('description')}
          gap="2rem"
        />
      </Container>
      <Container xs={12} lg={6}>
        <Container styleConfig={{ gap: '2rem' }}>
          {faqQuestions.map((faq) => (
            <Container key={faq.id}>
              <BoxAnimation>
                <FAQAccordion faq={faq} />
              </BoxAnimation>
              <Line />
            </Container>
          ))}
        </Container>
      </Container>
    </Container>
  );
};

export default FAQ;
