import { CSSProperties } from 'react';
import styled from 'styled-components';

type ContainerProps = {
  containerWidth: string;
  containerHeight: string;
  divDimensions: string;
  displayColor: string;
};

// Thanks to https://tobiasahlin.com/spinkit/
const Container = styled.div<ContainerProps>`
  width: ${(props) => props.containerWidth};
  height: ${(props) => props.containerHeight};
  margin: 10px auto 0;
  text-align: center;

  div {
    width: ${(props) => props.divDimensions};
    height: ${(props) => props.divDimensions};
    background-color: var(--${(props) => props.displayColor});
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;

    &.bounce1 {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    &.bounce2 {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }
  }

  @-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
`;

type SpinnerProps = {
  color?: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
};

const FlatSpinner = ({
  color = 'dark',
  size,
  className = '',
  style = {},
}: SpinnerProps) => {
  const sizeNum = Number(size);
  const height = size ? `${size}px` : '24px';
  const width = size ? `${sizeNum * (70 / 24)}px` : '70px';
  const divDimensions = size ? `${sizeNum * (18 / 24)}px` : '18px';

  return (
    <Container
      className={className}
      containerWidth={width}
      containerHeight={height}
      divDimensions={divDimensions}
      displayColor={color}
      style={style}
    >
      <div className="bounce1" />
      <div className="bounce2" />
      <div />
    </Container>
  );
};

export default FlatSpinner;
