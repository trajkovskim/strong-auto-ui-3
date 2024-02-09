import Container from 'components/Container';
import Image from 'components/Image';
import React from 'react';
import styled from 'styled-components';

type StyledCardProps = {
  type: 'column' | 'row';
};

const StyledCard = styled(Container)<StyledCardProps>`
  background: white;
  color: black;
  border: 1px solid #eee;

  gap: 0.3rem;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  width: 100%;
  max-width: ${(props) => (props.type === 'column' ? '320px' : '660px')};
  border-radius: 25px;
`;

const StyledFooterWrapper = styled.div`
  margin-top: auto;
`;

export type RibbonProps = {
  label: React.ReactNode;
  background: React.CSSProperties['background'];
  color?: React.CSSProperties['color'];
};

type Props = StyledCardProps & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  imageSrc?: React.ImgHTMLAttributes<HTMLImageElement>['src'];
  body?: React.ReactNode;
  className?: string;
};

const Card: React.FC<Props> = (props) => {
  return (
    <StyledCard relative gap="0.3rem" direction={props.type} type={props.type}>
      <Image
        shadow
        objectFit="contain"
        height={props.type === 'column' ? '200px' : '100%'}
        width={props.type === 'row' ? '300px' : undefined}
        src={props.imageSrc}
      />
      <Container
        padding={{ top: 'md', bottom: 'md', left: 'lg', right: 'lg' }}
        margin={props.type === 'row' ? { right: 'lg' } : undefined}
        gap="0.5rem"
      >
        <div>
          <div>{props.title}</div>
          <div>{props.description}</div>
        </div>
        {props.body}
        <StyledFooterWrapper>{props.footer}</StyledFooterWrapper>
      </Container>
    </StyledCard>
  );
};

export default Card;
