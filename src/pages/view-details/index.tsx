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

import Breadcrumb from 'components/Breadcrumb';
import Icon from 'components/Icon';
import Line from 'components/Line';
import List from 'components/List';
import MiniProductCard from 'components/card/MiniProductCard';
import HorizontalList from 'pages/home/HorizontalList';
import SimpleTable from 'pages/home/SimpleTable';
import { BiCalendar, BiCheckCircle, BiColorFill, BiPhoneCall } from 'react-icons/bi';
import { BsFuelPump } from 'react-icons/bs';
import { FaCar } from 'react-icons/fa';
import { GiSteeringWheel } from 'react-icons/gi';
import { SlSpeedometer } from 'react-icons/sl';
import { TbDoor, TbEngine, TbManualGearbox } from 'react-icons/tb';
import { Routes } from 'routes';
import { call, formatNumber, mailTo } from 'utils';

const StyledContainer = styled(Container)``;

const StyledButton = styled(Button)`
  border-radius: 15px;
`;

const CarouselWrapper = styled(Container)`
  border-radius: 15px;
  overflow: hidden;
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

  return (
    <Container padding={{ left: 'md', right: 'md', bottom: 'xl', top: 'xl' }}>
      <Container sm="1400px" centered gap="2rem" relative>
        <Container sm={12} gap="1rem">
          <Breadcrumb />
          <Title
            title={product.title}
            description={product.summary}
            fontSize={{ title: 'xl', description: 'md' }}
            bold={{ title: true }}
          />
        </Container>
        <Container gap="2rem">
          <Container relative sm={8} gap="1rem">
            <Container preserveWhenXs direction="row" gap="1rem">
              <Button padding="md" maxContent size="md" themeType="ghost" icon={<BiCalendar />} iconSize="lg">
                {product.year}
              </Button>
              <Button padding="md" maxContent size="md" themeType="ghost" icon={<TbManualGearbox />} iconSize="lg">
                {product.transmission}
              </Button>
              <Button padding="md" maxContent size="md" themeType="ghost" icon={<BsFuelPump />} iconSize="lg">
                {product.fuelType}
              </Button>
              <Button padding="md" maxContent size="md" themeType="ghost" icon={<SlSpeedometer />} iconSize="lg">
                {formatNumber(product.km)}
              </Button>
            </Container>
          </Container>

          <Container direction="row" wrap gap="1rem" alignItems="flex-start" justifyContent="space-between">
            <Container sm={12} md={8} gap="1rem">
              <CarouselWrapper>
                <Carousel minHeight="500px" maxHeight="500px" ref={carouselRef}>
                  {product?.images.map((image, index) => (
                    <Image key={index} src={image} height={'500px'} objectFit="cover" />
                  ))}
                </Carousel>
              </CarouselWrapper>
              <Text fontSize="2xl">Description</Text>
              <Text fontSize="md">{product.description}</Text>
              <Text fontSize="2xl">Car overview</Text>
              <Container direction="row" gap="1rem" wrap>
                <Container sm={12} lg={6}>
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
                </Container>
                <Container sm={12} lg={6}>
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
                </Container>
              </Container>
              <Line />
              <Container gap="1rem">
                <Text fontSize="2xl">Features</Text>
                <List gap="2rem" xs={1} sm={2} justifyContent="space-between">
                  {Array.from(featuresMap).map(([featureTitleKey, featureValueKeys]) => (
                    <Container sm={12} preserveWhenXs key={featureTitleKey} alignItems="flex-start" gap="0.5rem">
                      <Container direction="column" gap="0.3rem">
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
            </Container>
            <Container sm={12} md={4} style={{ position: 'sticky', top: 100 }} gap="1rem">
              <HorizontalList chunkGap="10px" chunkSize={{ xs: '50%' }}>
                {product?.images.map((image, index) => (
                  <Image
                    onClick={() => handleImageClick(index)}
                    rounded
                    key={index}
                    src={image}
                    height="150px"
                    objectFit="cover"
                  />
                ))}
              </HorizontalList>

              <StyledContainer rounded padding="md" gap="1rem" bordered>
                <Container gap="0.3rem">
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
              </StyledContainer>
              <StyledContainer rounded gap="1rem" padding="md">
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
              </StyledContainer>
            </Container>
          </Container>
        </Container>
        <Container sm="1400px" centered gap="1rem">
          <Line />
          <Title fontSize="md" title="Featured products" />
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
      </Container>
    </Container>
  );
};

export default ViewDetails;
