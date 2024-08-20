import Container from 'components/Container';
import Image from 'components/Image';
import Card from 'components/card/Card';
import Text from 'components/typography/Text';
import React from 'react';

type Props = React.ComponentProps<typeof Container> & {
  image?: string;
  title: React.ReactNode;
  description: React.ReactNode;
};

const ServiceCard: React.FC<Props> = (props) => {
  const body = (
    <Container xs={12} gap="1rem" padding={{ top: 'lg' }}>
      <Text fontSize="2xl" bold>
        {props.title}
      </Text>
      <Text fontSize="md">{props.description}</Text>
    </Container>
  );

  const image = <Image src={props.image} objectFit="cover" height="250px" />;

  return <Card body={body} image={image} />;
};

export default ServiceCard;
