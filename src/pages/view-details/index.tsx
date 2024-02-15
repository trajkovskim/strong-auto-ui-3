import Button from 'components/Button';
import Carousel from 'components/Carousel';
import Container from 'components/Container';
import Image from 'components/Image';
import Text from 'components/typography/Text';
import Title from 'components/typography/Title';
import { products } from 'pages/constants';
import React, { useCallback, useEffect, useState } from 'react';
import { MdArrowBackIosNew, MdEmail } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import BMWDriftSoilImage from 'assets/bwm-drift-soil.jpg';
import Icon from 'components/Icon';
import Line from 'components/Line';
import List from 'components/List';
import ProductCard from 'components/ProductCard';
import HorizontalList from 'pages/home/HorizontalList';
import { BiCalendar, BiCheckCircle, BiColorFill, BiPhoneCall } from 'react-icons/bi';
import { BsFuelPump } from 'react-icons/bs';
import { FaCar } from 'react-icons/fa';
import { GiSteeringWheel } from 'react-icons/gi';
import { SlSpeedometer } from 'react-icons/sl';
import { TbDoor, TbEngine, TbManualGearbox } from 'react-icons/tb';
import { Routes } from 'routes';
import { call, formatNumber, mailTo } from 'utils';

const StyledContainer = styled(Container)`
  position: sticky;
  top: 0;
`;

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

  useEffect(() => {
    const foundProduct = products.find((product) => product?.id.toString() === id);
    setProduct(foundProduct);
  }, [id]);

  const goBack = useCallback(() => navigate(-1), [navigate]);

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

        featuresMap.get(featureTitleKey)!.push(featureValueKey);
      } else {
        featuresWithoutClass.push(feature[0]);
      }
    });

  return (
    <Container padding={{ left: 'md', right: 'md', bottom: 'md', top: 'md' }}>
      <Container>
        <Button maxContent themeType="link" size="lg" icon={<MdArrowBackIosNew />} onClick={goBack}>
          Back
        </Button>
      </Container>
      <Container sm="1400px" centered gap="1rem" relative>
        <Container>
          <Text fontSize="md">Home / Shop / {product.title}</Text>
          <Title
            title={product.title}
            description={product.sumarry}
            fontSize={{ title: 'xl', description: 'md' }}
            bold={{ title: true }}
          />
        </Container>
        <Container gap="2rem">
          <Container relative sm={8} gap="1rem">
            <Container direction="row" gap="1rem">
              <Button maxContent size="md">
                Year: {product.year}
              </Button>
              <Button maxContent size="md">
                Transmission: {product.transmission}
              </Button>
              <Button maxContent size="md">
                Fuel: {product.fuelType}
              </Button>
              <Button maxContent size="md">
                km: {formatNumber(product.km)}
              </Button>
            </Container>
          </Container>

          <Container direction="row" wrap gap="3rem" alignItems="flex-start" justifyContent="space-between">
            <Container sm={8.5} gap="1rem">
              <CarouselWrapper>
                <Carousel minHeight="500px" maxHeight="500px">
                  <Image src={product?.imageSrc} height={'500px'} objectFit="cover" />
                  <Image src={BMWDriftSoilImage} height={'500px'} objectFit="cover" />
                </Carousel>
              </CarouselWrapper>
              <Text fontSize="2xl">Description</Text>
              <Text fontSize="md">{product.description}</Text>
              <Text fontSize="2xl">Car overview</Text>
              <Container direction="row" gap="1rem" wrap>
                <Container sm={6}>
                  <table>
                    <tr>
                      <td>
                        <FaCar /> Body
                      </td>
                      <td>{product.bodyType}</td>
                    </tr>
                    <tr>
                      <td>
                        <SlSpeedometer /> Mileage
                      </td>
                      <td>{formatNumber(product.km)}km</td>
                    </tr>
                    <tr>
                      <td>
                        <BsFuelPump /> Fuel type
                      </td>
                      <td>{product.fuelType}</td>
                    </tr>
                    <tr>
                      <td>
                        <BiCalendar /> Year
                      </td>
                      <td>{product.year}</td>
                    </tr>
                    <tr>
                      <td>
                        <TbManualGearbox /> Transmission
                      </td>
                      <td>{product.year}</td>
                    </tr>
                    <tr>
                      <td>
                        <GiSteeringWheel /> Drive type
                      </td>
                      <td>{product.driveType}</td>
                    </tr>
                  </table>
                </Container>
                <Container sm={6}>
                  <table>
                    <tr>
                      <td>
                        <FaCar /> Condition
                      </td>
                      <td>{product.condition}</td>
                    </tr>
                    <tr>
                      <td>
                        <TbEngine /> Engine size
                      </td>
                      <td>{formatNumber(product.km)}km</td>
                    </tr>
                    <tr>
                      <td>
                        <TbDoor /> Door
                      </td>
                      <td>{product.fuelType}</td>
                    </tr>
                    <tr>
                      <td>
                        <BiColorFill /> Color
                      </td>
                      <td>{product.color}</td>
                    </tr>
                  </table>
                </Container>
              </Container>
              <Line />
              <Container gap="1rem">
                <Text fontSize="2xl">Features</Text>
                <List gap="1rem" justifyContent="space-between">
                  {Array.from(featuresMap).map(([featureTitleKey, featureValueKeys]) => (
                    <Container key={featureTitleKey} gap="0.5rem">
                      <Text fontSize="xl">{featureTitleKey}</Text>
                      {featureValueKeys.map((valueKey) => (
                        <Text key={valueKey} fontSize="md">
                          <Icon icon={<BiCheckCircle />} width="15px" /> {valueKey}
                        </Text>
                      ))}
                    </Container>
                  ))}
                </List>
              </Container>
            </Container>
            <Container sm={3.5} gap="1rem">
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
        <Title fontSize="md" title="Featured products" />
        <HorizontalList>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              price={product.price}
              title={product.title}
              imageSrc={product.imageSrc}
              description={product.sumarry}
              onView={() => navigate(Routes.SHOP_VIEW_DETAILS.replace(':id', product.id.toString()))}
            />
          ))}
        </HorizontalList>
      </Container>
    </Container>
  );
};

export default ViewDetails;
