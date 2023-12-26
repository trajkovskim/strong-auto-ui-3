import Image from 'components/Image';
import Title from 'components/Title';
import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  box-sizing: border-box;
  box-shadow: 0px 1px 6px 3px rgba(35, 35, 35, 0.08);
  max-width: 314px;
  padding: 1.5rem;
  border-radius: 0.625rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledFooterWrapper = styled.div`
  margin-top: auto;
`;

type Props = {
  title?: React.ReactNode;
  footer?: React.ReactNode;
  imageSrc?: React.ImgHTMLAttributes<HTMLImageElement>['src'];
  body?: React.ReactNode;
};

const Card: React.FC<Props> = (props) => {
  return (
    <StyledCard>
      <Image shadow objectFit="contain" height="150px" src={props.imageSrc} />
      {props.title && <Title title={props.title as string} />}
      {props.body}
      <StyledFooterWrapper>{props.footer}</StyledFooterWrapper>
    </StyledCard>
  );
};

export default Card;
