import Container from 'components/Container';
import Image from 'components/Image';
import Line from 'components/Line';
import Text from 'components/typography/Text';
import React from 'react';
import styled from 'styled-components';

type StyledCardProps = {
  type: 'column' | 'row';
  fullwidth?: boolean;
};

const StyledCard = styled(Container)<StyledCardProps>`
  background: white;
  color: black;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  width: 100%;

  /* max-width: ${(props) => props.type === 'row' && '100%'} !important; */
  max-width: ${(props) => props.fullwidth && '100%'};

  border-radius: 15px;
`;

const StyledContentWrapper = styled(Container)<StyledCardProps>`
  border: 1px solid #eee;
  border-top: ${(props) => props.type === 'column' && 'none'};
  width: ${(props) => props.type === 'row' && '100%'};
  border-left: ${(props) => props.type === 'row' && 'none'};
  overflow: hidden;
`;

const StyledBodyWrapper = styled(Container)<StyledCardProps>`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  transition: all 200ms;
  &:hover {
    transform: scale(1.02);
  }
`;

export type RibbonProps = {
  label: React.ReactNode;
  background: React.CSSProperties['background'];
  color?: React.CSSProperties['color'];
};

type StyledRibbonProps = Omit<RibbonProps, 'label'>;

const Ribbon = styled(Container)<StyledRibbonProps>`
  top: 10px;
  left: 10px;
  position: absolute;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  user-select: none;
`;

const OnImageContainer = styled(Container)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

type Props = StyledCardProps & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  imageSrc?: React.ImgHTMLAttributes<HTMLImageElement>['src'];
  onImageContainer?: React.ReactNode;
  body?: React.ReactNode;
  ribbon?: RibbonProps;
  className?: string;
};

const Card: React.FC<Props> = (props) => {
  const isColumn = props.type === 'column';
  const isRow = props.type === 'row';

  return (
    <StyledCard
      xs={isColumn ? 'calc(100% - 16px)' : 'calc(100% - 16px)'}
      sm={isColumn ? 'calc(100% - 16px)' : 'calc(100% - 16px)'}
      md={isColumn ? 'calc(50% - 16px)' : 'calc(50% - 16px)'}
      lg={isColumn ? 'calc(33.33% - 16px)' : 'calc(50% - 16px)'}
      xl={isColumn ? 'calc(25% - 16px)' : 'calc(40% - 16px)'}
      {...{ '2xl': isColumn ? 'calc(20% - 16px)' : 'calc(40% - 16px)' }}
      direction={props.type}
      preserveWhenXs
      type={props.type}
      fullwidth={props.fullwidth}
      alignItems="stretch"
    >
      <Container relative>
        <StyledImage
          shadow
          objectFit="cover"
          height={isColumn ? '230px' : '100%'}
          width={isRow ? '300px' : undefined}
          src={props.imageSrc}
        />
        {props.ribbon && (
          <Ribbon
            preserveWhenXs
            rounded
            padding={{ left: 'md', right: 'md', top: 'xs', bottom: 'xs' }}
            background={props.ribbon?.background}
            color={props.ribbon?.color}
          >
            <Text bold fontSize="md">
              {props.ribbon?.label}
            </Text>
          </Ribbon>
        )}
        <OnImageContainer>{props.onImageContainer}</OnImageContainer>
      </Container>
      <StyledContentWrapper
        type={props.type}
        direction={props.type}
        padding={{ top: 'md', bottom: 'md', left: 'md', right: 'md' }}
        gap="1rem"
        preserveWhenXs
        wrap
      >
        <StyledBodyWrapper md="max-content" type={props.type}>
          <div>
            <div>{props.title}</div>
            <div>{props.description}</div>
          </div>
          {props.body}
        </StyledBodyWrapper>
        {props.type === 'row' && (
          <Container xs={0} sm={0} md={0} lg="max-content">
            <Line type="vertical" height="100%" style={{ borderColor: '#eee' }} />
          </Container>
        )}
        <Container sm={12}>{props.footer}</Container>
      </StyledContentWrapper>
    </StyledCard>
  );
};

export default Card;
