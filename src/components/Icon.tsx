import React from 'react';
import styled from 'styled-components';

type IconWrapperProps = {
  width?: string;
  height?: string;
  badge?: string;
  disabled?: boolean;
};

const IconWrapper = styled.span<IconWrapperProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  user-select: none;

  cursor: ${(props) => props.onClick && 'pointer'};

  svg {
    display: inline-block;
    margin: auto;
    color: ${(props) => props.disabled && '#dcdcdc'};

    width: ${(props) => props.width ?? '100%'};
    height: ${(props) => props.height ?? '100%'};
  }
`;

const IconBadge = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: max-content;
  padding: 0 5px;
  border-radius: 38%;
  font-weight: bold;

  position: absolute;
  top: 0;
  background-color: #ffc107;
  right: 0;
  transform: translate(30%, -40%);
`;

type Props = React.ComponentProps<'span'> &
  IconWrapperProps & {
    icon: React.ReactNode;
  };

const Icon: React.FC<Props> = ({ height, width, badge, icon, disabled, ...props }) => {
  return (
    <IconWrapper
      {...props}
      height={height}
      width={width}
      disabled={disabled}
      onClick={disabled ? undefined : props.onClick}
    >
      {badge && <IconBadge>{badge}</IconBadge>}
      {icon}
    </IconWrapper>
  );
};

export default Icon;
