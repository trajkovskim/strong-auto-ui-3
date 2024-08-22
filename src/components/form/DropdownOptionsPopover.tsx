import { css } from '@emotion/css';
import { fontSize, getCalcInputHeightCss } from 'components/form/Input.styled';
import { Size } from 'components/form/types';
import Transition, { TransitionHandle } from 'components/Transition';
import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

type StyledOptionProps = {
  size?: Size;
};

const StyledOptionsWrapper = styled.div`
  z-index: 9999;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  border-top: none;
  position: absolute;
  width: 100%;
  border-bottom-left-radius: 4x;
  border-bottom-right-radius: 4px;
  border: 1px solid rgb(238, 238, 238);
  background-color: #fff;
  user-select: none;
  bottom: 0;
  transform: translateY(calc(100% + 1px));

  /* > * + * {
    border-top: 1px solid #dcdcdc;
  } */
`;

const StyledOption = styled.option<StyledOptionProps & { includeLabelFontSize: boolean }>`
  min-height: ${(props) => props.size && getCalcInputHeightCss(props.size, props.includeLabelFontSize)};
  font-size: ${(props) => props.size && fontSize['sm']};
  padding: 7px;
  padding-left: 12px;
  color: black;
  display: flex;
  align-items: center;
  width: 100%;

  &:hover,
  &:active {
    /* background-color: #dcdcdc7d; */
    color: #075ebb;
  }
`;

type Props<T> = {
  // onClickOutside: () => void;
  options: T[];
  filterFunction?: (option: T) => boolean;
  onOptionClick: (option: T) => void;
  size?: Size;
  includeLabelFontSize?: boolean;
  inputRef: React.RefObject<HTMLElement | null>;
  open: boolean;
};

type Option = {
  label?: React.ReactNode;
  value?: string;
};

const DropdownOptionsPopover = <T extends Option>(props: Props<T>) => {
  const portal = document.getElementById('portals') as Element;
  const animationRef = useRef<TransitionHandle>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleClickOutsideEvent = useCallback(
    (event: MouseEvent) => {
      const targetNode = event.target as Node;
      const isClickInside = props.inputRef.current?.contains(targetNode) || popoverRef.current?.contains(targetNode);

      if (!isClickInside) {
        animationRef.current?.gotoInitialState();
        document.removeEventListener('click', handleClickOutsideEvent);
      }
    },
    [props.inputRef]
  );

  const filteredOptions = props.filterFunction ? props.options.filter(props.filterFunction) : props.options;

  // useEffect(() => {
  // }, [handleClickOutsideEvent, props.open]);

  if (props.open) {
    animationRef.current?.gotoFinalState();
    document.addEventListener('click', handleClickOutsideEvent);
  }

  if (!props.open) {
    return null;
  }

  return createPortal(
    <Transition
      ref={animationRef}
      duration="100ms"
      property="all"
      transition={{
        initial: css`
          opacity: 0;
          overflow: hidden;
          max-height: 0;
        `,
        final: css`
          opacity: 1;
          overflow: auto;
          max-height: 230px;
        `,
      }}
    >
      <StyledOptionsWrapper ref={popoverRef}>
        {filteredOptions.map((option, index) => (
          <StyledOption
            key={index}
            size={props.size}
            onClick={() => {
              props.onOptionClick(option);
              animationRef.current?.gotoInitialState();
            }}
            value={option.value}
            includeLabelFontSize={!!props.includeLabelFontSize}
          >
            {option.label ?? option.value}
          </StyledOption>
        ))}
      </StyledOptionsWrapper>
    </Transition>,
    portal
  );
};

export default DropdownOptionsPopover;
