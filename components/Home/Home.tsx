import { FC } from 'react';
import { Button, Container, Flex, Text } from '@mantine/core';
import classes from './Home.module.css';
import { LoginModal, RegisterModal } from './Auth';

const Home: FC = () => {
  return (
    <Container>
      <Flex className={classes.header}>
        <Text className={classes.logo}>Trippie</Text>
        <Flex className={classes.auth_holder}>
          <LoginModal />
          <RegisterModal />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Home;
