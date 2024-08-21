import Button from 'components/Button';
import Carousel from 'components/Carousel';
import Container from 'components/Container';
import List from 'components/List';
import Card from 'components/card/Card';
import { PriceWrapper, StyledIcon, StyledImage } from 'components/card/Card.styled';
import Ribbon from 'components/card/Ribbon';
import { ribbons } from 'components/card/constants';
import { Props as ProductCardProps } from 'components/card/types';
import Text from 'components/typography/Text';
import { products } from 'pages/constants';
import React from 'react';
import { BiCalendar, BiShare } from 'react-icons/bi';
import { BsBookmark, BsBookmarkCheckFill, BsFuelPumpFill } from 'react-icons/bs';
import { FaRoad } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { TbManualGearbox } from 'react-icons/tb';
import { formatNumber } from 'utils';

type Props = ProductCardProps & {
  driveType: (typeof products)[number]['driveType'];
  year: (typeof products)[number]['year'];
};

const ListProductCard: React.FC<Props> = (props) => {
  const price = (
    <PriceWrapper styleConfig={{ padding: { left: 'lg', right: 'sm', top: 'sm', bottom: 'sm' } }}>
      {props.price?.totalPromo && (
        <Container styleConfig={{ alignItems: 'flex-end', gap: '0.3rem' }}>
          <Text fontSize="md" textDecoration="line-through">
            ${formatNumber(props.price.total)}
          </Text>{' '}
          <Text fontSize="lg" bold>
            ${formatNumber(props.price.totalPromo)}
          </Text>
        </Container>
      )}
      {!props.price?.totalPromo && (
        <Container styleConfig={{ alignItems: 'flex-end' }}>
          <Text fontSize="lg" bold>
            ${formatNumber(props.price.total)}
          </Text>
        </Container>
      )}
    </PriceWrapper>
  );

  const attributeStyleConfig = { gap: '5px', alignItems: 'flex-start', padding: 'sm', direction: 'row' } as never;
  const productAttributes = (
    <List gap="1rem" sm={2} md={2} lg={2} xl={3} {...{ '2xl': 5 }} justifyContent="flex-start">
      {props.km && (
        <Container styleConfig={attributeStyleConfig} xs="max-content">
          <StyledIcon size="lg" icon={<FaRoad />} />
          <Container>
            <Text type="sub" fontSize="sm">
              Mileage
            </Text>
            <Text fontSize="md">{formatNumber(props.km)}km</Text>
          </Container>
        </Container>
      )}
      {props.fuelType && (
        <Container styleConfig={attributeStyleConfig} xs="max-content">
          <StyledIcon size="lg" icon={<BsFuelPumpFill />} />
          <Container>
            <Text type="sub" fontSize="sm">
              Fuel type
            </Text>
            <Text fontSize="md">{props.fuelType}</Text>
          </Container>
        </Container>
      )}
      {props.transmission && (
        <Container styleConfig={attributeStyleConfig} xs="max-content">
          <StyledIcon size="lg" icon={<TbManualGearbox />} />
          <Container>
            <Text type="sub" fontSize="sm">
              Transmission
            </Text>
            <Text fontSize="md">{props.transmission}</Text>
          </Container>
        </Container>
      )}

      {props.year && (
        <Container styleConfig={attributeStyleConfig} xs="max-content">
          <StyledIcon size="lg" icon={<BiCalendar />} />
          <Container>
            <Text type="sub" fontSize="sm">
              Year
            </Text>
            <Text fontSize="md">{props.year}</Text>
          </Container>
        </Container>
      )}

      {props.driveType && (
        <Container styleConfig={attributeStyleConfig} xs="max-content">
          <StyledIcon size="lg" icon={<FaGear />} />
          <Container>
            <Text type="sub" fontSize="sm">
              Year
            </Text>
            <Text fontSize="md">{props.driveType}</Text>
          </Container>
        </Container>
      )}
    </List>
  );

  const body = (
    <Container styleConfig={{ gap: '0.5rem', justifyContent: 'space-between' }} style={{ flex: '1 0 100%' }}>
      <Container>
        <Container styleConfig={{ direction: 'row', padding: { left: 'md' }, justifyContent: 'space-between' }}>
          <Container styleConfig={{ overflow: 'hidden', alignItems: 'center', padding: { top: 'sm' } }}>
            <Button maxContent themeType="link" onClick={props.onView} size="lg">
              <div>{props.title}</div>
              {props.summary && (
                <Text fontSize="md" title={props.summary}>
                  {props.summary}
                </Text>
              )}
            </Button>
          </Container>
          <Container styleConfig={{ direction: 'row' }}>{price}</Container>
        </Container>
        <Container styleConfig={{ padding: { left: 'md' } }} xs="max-content">
          {props.ribbon && <Ribbon {...ribbons[props.ribbon]} />}
        </Container>
      </Container>
      <Container styleConfig={{ direction: 'row', gap: '1rem', justifyContent: 'space-between' }}>
        <Container styleConfig={{ padding: { left: 'md' } }}>{productAttributes}</Container>
        <Container
          styleConfig={{
            padding: { left: 'md', right: 'md', top: 'sm', bottom: 'sm' },
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            gap: '1rem',
            direction: 'row',
          }}
        >
          <Button
            themeType="white"
            maxContent
            icon={props.bookmarked ? <BsBookmarkCheckFill /> : <BsBookmark />}
            size="sm"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            Add to favorites
          </Button>
          <Button maxContent icon={<BiShare />} size="md" themeType="white">
            Share this
          </Button>
        </Container>
      </Container>
    </Container>
  );

  const image = (
    <Carousel noArrows minHeight="170px">
      {props.images?.map((image, index) => (
        <StyledImage key={index} shadow objectFit="cover" width="320px" height="100%" src={image} />
      ))}
    </Carousel>
  );

  return (
    <Card styleConfig={{ direction: 'row', bordered: true }} fullwidth={props.fullwidth} body={body} image={image} />
  );
};

export default ListProductCard;
