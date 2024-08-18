import React from 'react';
import Button from 'components/Button';
import styled from 'styled-components';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

export const StyledBookmarkButton = styled(Button)`
  position: absolute;
  width: max-content;
  align-items: center;
  height: 35px;
  top: 10px;
  right: 20px;
  z-index: 2;
`;

type Props = {
  bookmarked?: boolean;
  onClick?: React.ComponentProps<typeof Button>['onClick'];
};

const BookmarkedButton: React.FC<Props> = (props) => {
  return (
    <StyledBookmarkButton
      themeType="link"
      iconSize="xl"
      icon={props.bookmarked ? <MdFavorite /> : <MdFavoriteBorder />}
      onClick={props.onClick}
    />
  );
};

export default BookmarkedButton;
