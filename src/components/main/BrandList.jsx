import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { ImgBtn, EtcContainer, Wrapper, AddtoWishlistButton, Container } from './styled/mainBrand';

const WishlistButton = ({ children, onClick }) => (
    <AddtoWishlistButton onClick={onClick}>
        <FontAwesomeIcon icon={faHeart} />
        {children}
    </AddtoWishlistButton>
);

function ImageBtn({ imgSrc, brand }) {
    return (
        <Wrapper>
            <ImgBtn>
                <img src={imgSrc} alt={brand} />
            </ImgBtn>
            <EtcContainer>
                <span>{brand}</span>
                <WishlistButton />
            </EtcContainer>
        </Wrapper>
    );
}

function BrandList({ images, brands }) {
    const [containerHeight, setContainerHeight] = useState("350px");
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setContainerHeight("auto");
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    if (!images || !brands || images.length === 0 || brands.length === 0) {
        return <div>데이터 없음</div>;
    }

    return (
        <Container height={containerHeight} ref={containerRef}>
            {images.map((imgSrc, index) => (
                <ImageBtn
                    key={index}
                    imgSrc={imgSrc}
                    brand={brands[index]}
                />
            ))}
        </Container>
    );
}

export default BrandList;
