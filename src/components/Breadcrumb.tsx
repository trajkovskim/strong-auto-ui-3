import Button from 'components/Button';
import Container from 'components/Container';
import Text from 'components/typography/Text';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Routes } from 'routes';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paths: { label: string; pathname?: string }[] = [{ label: 'Home', pathname: Routes.INDEX }];
  const { id } = useParams();

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
    <Container direction="row" gap="0.3rem" alignItems="center">
      {paths.map((path, index) => (
        <>
          {index !== paths.length - 1 ? (
            <Button
              size="md"
              maxContent
              onClick={() => navigate({ pathname: path.pathname })}
              themeType="link-colored"
              key={path.pathname}
            >
              {path.label}
            </Button>
          ) : (
            <Text fontSize="md">{path.label}</Text>
          )}

          {index !== paths.length - 1 && <Text type="sub">{'>'}</Text>}
        </>
      ))}
    </Container>
  );
};

export default Breadcrumb;
