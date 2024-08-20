import Container from 'components/Container';
import Image from 'components/Image';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import FiatLogo from 'assets/fiat-logo.png';
import AudiLogo from 'assets/audi-logo.png';
import MercedesLogo from 'assets/mercedes-logo.png';

const MakeTile = styled.div`
  /* border-radius: 0.5rem; */
  height: 100px;
  width: 100%;
  max-width: 230px;
  flex: 0 0 auto;
  text-align: center;
  padding: 0.8rem;

  display: flex;

  &:hover {
    background-color: #ccc;
  }
`;

const MakesWrapper = styled(Container)`
  overflow: hidden;
  background-color: #eee;
`;

const Makes: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<boolean>();

  useEffect(() => {
    if (!wrapperRef.current?.hasChildNodes || hovered) {
      return;
    }

    let interval: number | undefined = undefined;

    const timeout = setTimeout(
      () => (interval = setInterval(() => wrapperRef.current?.scrollTo({ left: wrapperRef.current?.scrollLeft + 1 }))),
      2000
    );

    wrapperRef.current?.addEventListener('scroll', () => {
      const firstChild = wrapperRef.current?.firstElementChild;
      const wrapperScrollLeft = wrapperRef.current?.scrollLeft ?? 0;

      if (firstChild && wrapperScrollLeft >= firstChild?.clientWidth) {
        wrapperRef.current?.removeChild(firstChild);
        wrapperRef.current?.appendChild(firstChild);
        wrapperRef.current?.scrollTo({ left: 0 });
      }
    });

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [hovered]);

  return (
    <MakesWrapper
      ref={wrapperRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      direction="row"
    >
      <MakeTile>
        <Image src={FiatLogo} alt="Fiat" objectFit="contain" width={'150px'} centered />
      </MakeTile>
      <MakeTile>
        <Image src={AudiLogo} alt="Audi" objectFit="contain" width={'150px'} centered />
      </MakeTile>
      <MakeTile>
        <Image src={MercedesLogo} alt="Mercedes" objectFit="contain" width={'150px'} centered />
      </MakeTile>
      <MakeTile>
        <Image src={AudiLogo} alt="Audi" objectFit="contain" width={'150px'} centered />
      </MakeTile>
      <MakeTile>
        <Image src={FiatLogo} alt="Fiat" objectFit="contain" width={'150px'} centered />
      </MakeTile>
      <MakeTile>
        <Image src={AudiLogo} alt="Audi" objectFit="contain" width={'150px'} centered />
      </MakeTile>
      <MakeTile>
        <Image src={MercedesLogo} alt="Mercedes" objectFit="contain" width={'150px'} centered />
      </MakeTile>
      <MakeTile>
        <Image src={AudiLogo} alt="Audi" objectFit="contain" width={'150px'} centered />
      </MakeTile>
      <MakeTile>
        <Image src={FiatLogo} alt="Fiat" objectFit="contain" width={'150px'} centered />
      </MakeTile>
      <MakeTile>
        <Image src={AudiLogo} alt="Audi" objectFit="contain" width={'150px'} centered />
      </MakeTile>
      <MakeTile>
        <Image src={MercedesLogo} alt="Mercedes" objectFit="contain" width={'150px'} centered />
      </MakeTile>
      <MakeTile>
        <Image src={AudiLogo} alt="Audi" objectFit="contain" width={'150px'} centered />
      </MakeTile>
    </MakesWrapper>
  );
};

export default Makes;
