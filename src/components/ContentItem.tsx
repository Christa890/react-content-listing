import React from 'react';
import styled from 'styled-components';

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 5px;
`;

const ContentTitle = styled.div`
  text-align: center;
  font-size: 14px;
  padding: 5px 0;
  color: white;
`;

const ContentItem = ({ item }: { item: any }) => {
  const { name, 'poster-image': posterImage } = item;

  return (
    <div>
      <Thumbnail src={`https://test.create.diagnal.com/images/${posterImage}`} alt={name} />
      <ContentTitle>{name}</ContentTitle>
    </div>
  );
};

export default ContentItem;
