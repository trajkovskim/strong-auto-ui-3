import { css } from '@emotion/css';
import React, { useCallback, useImperativeHandle, useReducer } from 'react';

type StyledAnimatedProps = {
  transition: { initial?: string; final: string };
  property?: React.CSSProperties['transitionProperty'];
  duration?: React.CSSProperties['transitionDuration'];
  delay?: React.CSSProperties['transitionDelay'];
  timingFunction?: React.CSSProperties['transitionTimingFunction'];
  onTransitionEnd?: (event?: React.TransitionEvent<unknown>) => void;
};

export enum TransitionState {
  RUNNING,
  FINISHED,
}

export enum ComponentState {
  INITIAL,
  FINAL,
}

export type TransitionHandle = {
  state: TransitionState;
  componentState: ComponentState;
  gotoFinalState: () => void;
  gotoInitialState: () => void;
  toggle: () => void;
  reset: () => void;
  isInInitialState: () => boolean;
  isInFinalState: () => boolean;
  isRunning: () => boolean;
  isFinished: () => boolean;
};

type Props = React.PropsWithRef<React.PropsWithChildren<StyledAnimatedProps>>;

type TransitionStateReducer = {
  componentState: ComponentState;
  transitionState: TransitionState;
};

type TransitionAction = {
  type: 'GOTO_FINAL_STATE' | 'GOTO_INITIAL_STATE' | 'TOGGLE' | 'RESET' | 'FINISH';
};

const gotoFinalStateAction = (): TransitionAction => ({
  type: 'GOTO_FINAL_STATE',
});

const gotoInitialStateAction = (): TransitionAction => ({
  type: 'GOTO_INITIAL_STATE',
});

const toggleAction = (): TransitionAction => ({
  type: 'TOGGLE',
});

const resetAction = (): TransitionAction => ({
  type: 'RESET',
});

const finishAction = (): TransitionAction => ({
  type: 'FINISH',
});

const reducer: React.Reducer<TransitionStateReducer, TransitionAction> = (state, action) => {
  const actions: Record<TransitionAction['type'], () => TransitionStateReducer> = {
    GOTO_FINAL_STATE: () => ({
      componentState: ComponentState.FINAL,
      transitionState: TransitionState.RUNNING,
    }),
    GOTO_INITIAL_STATE: () => ({
      componentState: ComponentState.INITIAL,
      transitionState: TransitionState.RUNNING,
    }),
    TOGGLE: () => {
      return reducer(
        state,
        state.componentState === ComponentState.FINAL ? gotoInitialStateAction() : gotoFinalStateAction()
      );
    },
    RESET: () => ({
      componentState: ComponentState.INITIAL,
      transitionState: TransitionState.FINISHED,
    }),
    FINISH: () => ({
      ...state,
      transitionState: TransitionState.FINISHED,
    }),
  };

  if (action.type in actions) {
    return actions[action.type]();
  }

  return state;
};

const initialTransitionReducerState: TransitionStateReducer = {
  componentState: ComponentState.INITIAL,
  transitionState: TransitionState.FINISHED,
};

const Transition = React.forwardRef<TransitionHandle, Props>(
  (
    {
      children,
      delay,
      transition,
      onTransitionEnd,
      duration = '1s',
      timingFunction = 'linear',
      property = 'all',
      ...props
    },
    ref
  ) => {
    const [state, dispatch] = useReducer(reducer, initialTransitionReducerState);

    const isRunning: TransitionHandle['isRunning'] = () => state.transitionState === TransitionState.RUNNING;
    const isFinished: TransitionHandle['isFinished'] = () => state.transitionState === TransitionState.FINISHED;

    const isInInitialState: TransitionHandle['isInInitialState'] = () =>
      state.componentState === ComponentState.INITIAL;
    const isInFinalState: TransitionHandle['isInFinalState'] = () => state.componentState === ComponentState.FINAL;

    const reset: TransitionHandle['reset'] = useCallback(() => dispatch(resetAction()), []);

    const gotoInitialState: TransitionHandle['gotoInitialState'] = useCallback(
      () => dispatch(gotoInitialStateAction()),
      []
    );

    const gotoFinalState: TransitionHandle['gotoFinalState'] = useCallback(() => dispatch(gotoFinalStateAction()), []);

    const toggle: TransitionHandle['toggle'] = useCallback(() => dispatch(toggleAction()), []);

    useImperativeHandle(ref, () => ({
      state: state.transitionState,
      componentState: state.componentState,
      reset,
      toggle,
      gotoFinalState,
      gotoInitialState,
      isInInitialState,
      isInFinalState,
      isRunning,
      isFinished,
    }));

    const transitionCss = css`
      transition-property: ${property};
      transition-duration: ${duration};
      transition-delay: ${delay};
      transition-timing-function: ${timingFunction};
    `;

    return React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        const className = `
          ${(props as any)?.className}
          ${child.props.className ? child.props.className : ''} 
          ${transitionCss}
          ${transition?.initial ? transition?.initial : ''}
          ${isInFinalState() ? transition.final : ''}`;
        // passing all other props to be able to pass parentGap property
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return React.cloneElement<any>(child, {
          ...props,
          ...child.props,
          className,
          onTransitionEnd: (event?: React.TransitionEvent<unknown>) => {
            dispatch(finishAction());
            onTransitionEnd && onTransitionEnd(event);
            child.props.onTransitionEnd && child.props.onTransitionEnd(event);
          },
        });
      }
      return child;
    });
  }
);

Transition.displayName = 'Transition';

export default Transition;
