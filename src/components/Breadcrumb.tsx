import Button from 'components/Button';
import Container from 'components/Container';
import Text from 'components/typography/Text';
import React from 'react';
import { FaHome } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Routes } from 'routes';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const paths: {
    label: string;
    pathname?: string;
    icon?: React.ReactNode;
  }[] = [
    {
      label: 'Home',
      pathname: Routes.INDEX,
      icon: <FaHome />,
    },
  ];

  if (location.pathname.startsWith(Routes.SHOP)) {
    paths.push({ label: 'Listing', pathname: Routes.SHOP });
  }

  if (location.pathname.startsWith(Routes.CONTACT)) {
    paths.push({ label: 'Contact', pathname: Routes.CONTACT });
  }

  if (location.pathname.startsWith(Routes.ABOUT_US)) {
    paths.push({ label: 'About us', pathname: Routes.ABOUT_US });
  }

  if (id) {
    paths.push({ label: id });
  }

  return (
    <Container styleConfig={{ direction: 'row', gap: '0.3rem', alignItems: 'center' }}>
      {paths.map((path, index) => (
        <>
          {index !== paths.length - 1 ? (
            <Button
              key={path.pathname}
              size="md"
              maxContent
              themeType="link"
              icon={path.icon}
              onClick={() => navigate({ pathname: path.pathname })}
            >
              {path.label}
            </Button>
          ) : (
            <Text fontSize="md">{path.label}</Text>
          )}

          {index !== paths.length - 1 && <Text>{'>'}</Text>}
        </>
      ))}
    </Container>
  );
};

export default Breadcrumb;
