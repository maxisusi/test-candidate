import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0%   { background-position: -800px 0; }
  100% { background-position:  800px 0; }
`;

const SkeletonBar = styled.div<{ width?: string; height?: string }>`
  display: inline-block;
  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height ?? '1rem'};
  border-radius: 4px;
  background: linear-gradient(90deg, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%);
  background-size: 1600px 100%;
  animation: ${shimmer} 1.4s infinite linear;
`;

export default SkeletonBar;
