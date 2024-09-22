import React, { useEffect, useState } from 'react';
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
  const fallBackUrl=`https://test.create.diagnal.com/images/placeholder_for_missing_posters.png`
  const posterUrl=`https://test.create.diagnal.com/images/${posterImage}`
  const [imgSrc,setImgSrc]=useState(posterUrl)

  useEffect(()=>{setImgSrc(posterUrl)},[posterUrl])
  
  const handleError=()=>{
    setImgSrc(fallBackUrl)
  }
  return (
    <div>
      <Thumbnail src={imgSrc} alt={name} onError={handleError}/>
      <ContentTitle>{name}</ContentTitle>
    </div>
  );
};

export default ContentItem;
