import React from 'react';
import { Wrapper, Content, Text } from './heroimage.styles';

const HeroImage = prop => (         // can use destructuring, so dont have to use "prop." for every property
                                    // HeroImage = { image, title, text } --> image={image}, etc.
    <Wrapper image={prop.image}>
        <Content>
            <Text>
                <h1> {prop.title} </h1>
                <p> {prop.text} </p>
            </Text>
        </Content>

    </Wrapper>
);

export default HeroImage;
