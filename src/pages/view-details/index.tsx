import Button from 'components/Button';
import Carousel, { CarouselHandle } from 'components/Carousel';
import Container from 'components/Container';
import Image from 'components/Image';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import { products } from 'pages/constants';
import React, { useEffect, useRef, useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import BoxAnimation from 'components/BoxAnimation';
import Breadcrumb from 'components/Breadcrumb';
import Icon from 'components/Icon';
import Line from 'components/Line';
import List from 'components/List';
import SimpleTable from 'components/SimpleTable';
import MiniProductCard from 'components/card/MiniProductCard';
import HorizontalList from 'components/horizontalList/HorizontalList';
import { BiCalendar, BiCheckCircle, BiColorFill, BiPhoneCall } from 'react-icons/bi';
import { BsFuelPump } from 'react-icons/bs';
import { FaCar } from 'react-icons/fa';
import { GiSteeringWheel } from 'react-icons/gi';
import { SlSpeedometer } from 'react-icons/sl';
import { TbDoor, TbEngine, TbManualGearbox } from 'react-icons/tb';
import { Routes } from 'routes';
import { call, formatNumber, mailTo } from 'utils';

const StyledButton = styled(Button)`
  border-radius: 5px;
`;

const CarouselWrapper = styled(Container)`
  border-radius: 5px;
  overflow: hidden;
`;

const ViewDetailTitleWrapper = styled(Container)<{ image: string }>`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center center;
  transition: 200ms;
  min-height: 300px;
  position: relative;
  color: #fff;

  &::before {
    content: '';
    background-color: #232323;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    top: 0;
    left: 0;
  }
`;

const ViewDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<(typeof products)[number]>();
  const carouselRef = useRef<CarouselHandle>(null);

  useEffect(() => {
    const foundProduct = products.find((product) => product?.id.toString() === id);
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <div />;
  }

  const featuresMap = new Map<string, string[]>();
  const featuresWithoutClass = [];

  product.features
    .map((feature) => feature.split(':'))
    .forEach((feature) => {
      if (feature.length > 2) {
        return;
      }

      if (feature.length === 2) {
        const featureTitleKey = feature[0];
        const featureValueKey = feature[1];

        if (!featuresMap.has(featureTitleKey)) {
          featuresMap.set(featureTitleKey, []);
        }

        featuresMap.get(featureTitleKey)?.push(featureValueKey);
      } else {
        featuresWithoutClass.push(feature[0]);
      }
    });

  const createTextIcon = (icon: React.ReactNode, text: string) => {
    return (
      <Text fontSize="lg">
        {icon} {text}
      </Text>
    );
  };

  const handleImageClick = (imageIndex: number) => carouselRef.current?.next(imageIndex);

  const imagesHorizontalList = (
    <HorizontalList noAutoScroll gap="10px" chunkGap="1rem" chunkSize={{ xs: '50%' }}>
      {product?.images.map((image, index) => (
        <BoxAnimation key={index}>
          <Image onClick={() => handleImageClick(index)} rounded src={image} height="150px" objectFit="cover" />
        </BoxAnimation>
      ))}
    </HorizontalList>
  );

  return (
    <>
      <ViewDetailTitleWrapper image={product.images[0]}>
        <Container
          xs="1400px"
          styleConfig={{
            centered: true,
            padding: { left: 'md', right: 'md' },
            gap: '2rem',
          }}
          lgStyle={{
            direction: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Container styleConfig={{ gap: '2rem' }}>
            <BoxAnimation>
              <Title
                title={product.title}
                description={product.summary}
                fontSize={{ title: 'xl', description: 'md' }}
                bold={{ title: true }}
              />
            </BoxAnimation>
            <BoxAnimation>
              <Container styleConfig={{ wrap: true, direction: 'row', gap: '1rem' }}>
                <Button maxContent size="md" themeType="link" icon={<BiCalendar />} iconSize="lg">
                  {product.year}
                </Button>
                <Button maxContent size="md" themeType="link" icon={<TbManualGearbox />} iconSize="lg">
                  {product.transmission}
                </Button>
                <Button maxContent size="md" themeType="link" icon={<BsFuelPump />} iconSize="lg">
                  {product.fuelType}
                </Button>
                <Button maxContent size="md" themeType="link" icon={<SlSpeedometer />} iconSize="lg">
                  {formatNumber(product.km)}
                </Button>
              </Container>
            </BoxAnimation>
          </Container>
          <Breadcrumb />
        </Container>
      </ViewDetailTitleWrapper>
      <Container
        xs="1400px"
        styleConfig={{
          centered: true,
          gap: '3rem',
          padding: { left: 'md', right: 'md', bottom: 'xl', top: 'xl' },
          direction: 'row',
          wrap: true,
          relative: true,
          alignItems: 'flex-start',
        }}
        lgStyle={{
          gap: '1rem',
        }}
      >
        <Container xs={12} lg={8} styleConfig={{ gap: '2rem' }}>
          <BoxAnimation>
            <CarouselWrapper>
              <Carousel minHeight="500px" maxHeight="500px" ref={carouselRef}>
                {product?.images.map((image, index) => (
                  <BoxAnimation fullheight key={index}>
                    <Image key={index} src={image} height={'500px'} objectFit="cover" />
                  </BoxAnimation>
                ))}
              </Carousel>
            </CarouselWrapper>
          </BoxAnimation>

          <Container xs={12} lg={0}>
            {imagesHorizontalList}
          </Container>

          <BoxAnimation>
            <Container styleConfig={{ gap: '0.5rem' }}>
              <Text fontSize="2xl">Description</Text>
              <Text fontSize="md">{product.description}</Text>
            </Container>
          </BoxAnimation>

          <BoxAnimation>
            <Container styleConfig={{ gap: '1rem', direction: 'row', wrap: true }}>
              <Container xs={12}>
                <Text fontSize="2xl">Car overview</Text>
              </Container>
              <Container xs={12} lg={6}>
                <BoxAnimation>
                  <SimpleTable
                    rowGap="1rem"
                    gap="0.5rem"
                    cellWidth="50%"
                    data={[
                      [createTextIcon(<FaCar />, 'Body'), product.bodyType],
                      [createTextIcon(<SlSpeedometer />, 'Mileage'), `${formatNumber(product.km)}km`],
                      [createTextIcon(<BsFuelPump />, 'Fuel type'), product.fuelType],
                      [createTextIcon(<BiCalendar />, 'Year'), product.year],
                      [createTextIcon(<TbManualGearbox />, 'Transmission'), product.transmission],
                      [createTextIcon(<GiSteeringWheel />, 'Drive type'), product.driveType],
                    ]}
                  />
                </BoxAnimation>
              </Container>
              <Container xs={12} lg={6}>
                <BoxAnimation>
                  <SimpleTable
                    rowGap="1rem"
                    gap="0.5rem"
                    cellWidth="50%"
                    data={[
                      [createTextIcon(<FaCar />, 'Condition'), product.condition],
                      [createTextIcon(<TbEngine />, 'Engine size'), product.engineSize],
                      [createTextIcon(<TbDoor />, 'Door'), product.doors],
                      [createTextIcon(<BiColorFill />, 'Color'), product.color],
                    ]}
                  />
                </BoxAnimation>
              </Container>
            </Container>
          </BoxAnimation>

          <Line />

          <BoxAnimation>
            <Container styleConfig={{ gap: '1rem' }}>
              <Text fontSize="2xl">Features</Text>
              <List gap="2rem" xs={1} sm={2} justifyContent="space-between">
                {Array.from(featuresMap).map(([featureTitleKey, featureValueKeys]) => (
                  <Container xs={12} key={featureTitleKey} styleConfig={{ gap: '0.5rem', alignItems: 'flex-start' }}>
                    <Container styleConfig={{ gap: '0.3rem' }}>
                      <Text fontSize="xl">{featureTitleKey}</Text>
                      {featureValueKeys.map((valueKey) => (
                        <div key={valueKey}>
                          <Icon icon={<BiCheckCircle />} size="md" />
                          <Text fontSize="md">{valueKey}</Text>
                        </div>
                      ))}
                    </Container>
                  </Container>
                ))}
              </List>
            </Container>
          </BoxAnimation>
        </Container>
        <Container xs={12} lg={4} style={{ position: 'sticky', top: 100 }} styleConfig={{ gap: '2rem' }}>
          <Container xs={0} lg={12}>
            {imagesHorizontalList}
          </Container>

          <BoxAnimation>
            <Container styleConfig={{ rounded: true, padding: 'md', gap: '1rem', bordered: true }}>
              <Container styleConfig={{ gap: '0.3rem' }}>
                <Text fontSize="lg">Our offer:</Text>
                {product.price?.totalPromo && (
                  <div>
                    <Text fontSize="lg" textDecoration="line-through">
                      {formatNumber(product.price.total)}
                    </Text>{' '}
                    <Text fontSize="3xl" bold>
                      {formatNumber(product.price.totalPromo)}
                    </Text>
                  </div>
                )}
                {!product.price?.totalPromo && (
                  <div>
                    <Text fontSize="3xl" bold>
                      {formatNumber(product.price.total)}
                    </Text>
                  </div>
                )}
                {product.price?.saving && (
                  <div>
                    <Text fontSize="lg">Saving: {formatNumber(product.price.saving)}</Text>
                  </div>
                )}
              </Container>
              <StyledButton fullwidth themeType={'ghost'} size="xl">
                Send a message
              </StyledButton>
            </Container>
          </BoxAnimation>

          <BoxAnimation>
            <Container styleConfig={{ rounded: true, gap: '1rem', padding: 'md' }}>
              <Button
                themeType="link"
                maxContent
                icon={<BiPhoneCall />}
                size="lg"
                iconSize="3xl"
                onClick={() => call('+38977648648')}
              >
                +38977648648
              </Button>
              <Button
                themeType="link"
                maxContent
                icon={<MdEmail />}
                size="lg"
                iconSize="3xl"
                onClick={() => mailTo('vane.stamenov@gmail.com')}
              >
                vane.stamenov@gmail.com
              </Button>
            </Container>
          </BoxAnimation>
        </Container>
      </Container>
      <Container xs="1400px" styleConfig={{ centered: true, gap: '1rem' }}>
        <Line />
        <Title fontSize="xl" title="Featured products" />
        <HorizontalList
          gap="2rem"
          chunkGap="1rem"
          chunkSize={{ xs: '100%', md: '50%', lg: '33.33%', xl: '25%' }}
          centered
        >
          {products.map((product) => (
            <MiniProductCard
              key={product.id}
              price={product.price}
              title={product.title}
              images={product.images}
              summary={product.summary}
              onView={() => navigate(Routes.SHOP_VIEW_DETAILS.replace(':id', product.id.toString()))}
            />
          ))}
        </HorizontalList>
      </Container>
    </>
  );
};

export default ViewDetails;
