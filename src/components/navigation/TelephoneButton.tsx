import Button from 'components/Button';
import { useTranslation } from 'hooks';
import React from 'react';
import { MdOutlinePhoneIphone } from 'react-icons/md';
import { call } from 'utils';

type Props = {
  label?: boolean;
};

const TelephoneButton: React.FC<Props> = (props) => {
  const t = useTranslation();

  const telephone = t('telephone');
  return (
    <Button maxContent themeType="link" size="lg" icon={<MdOutlinePhoneIphone />} onClick={() => call(telephone)}>
      {props.label && telephone}
    </Button>
  );
};

export default TelephoneButton;
