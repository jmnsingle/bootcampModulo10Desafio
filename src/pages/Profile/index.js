import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { differenceInCalendarYears, parseISO, format } from 'date-fns';
import { ActivityIndicator } from 'react-native';

import {
  Container,
  Contain,
  ContainTitle,
  Title,
  ContainInfo,
  ContainDesc,
  Desc,
  TextDesc,
  DescInfo,
} from './styles';

import { formatPrice } from '~/util/format';
import Button from '~/components/Button';
import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';

export default function Profile() {
  const id = useSelector(state => state.auth.student_id.id);
  const dispacth = useDispatch();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setLoading(true);
    try {
      // eslint-disable-next-line no-inner-declarations
      async function loadInfo() {
        const { data } = await api.get(`/checkins/${id}/profile`);

        setProfile(data);
        setLoading(false);
      }
      loadInfo();
    } catch (err) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logOut() {
    setLoading(true);
    dispacth(signOut());
    setLoading(false);
  }

  return (
    <Container>
      <Contain>
        {loading ? (
          <ActivityIndicator size="large" color="#fc2b6e" />
        ) : (
          <ContainInfo>
            <ContainTitle>
              <Title>ESTUDANTE</Title>
            </ContainTitle>
            <ContainDesc>
              <Desc>
                <TextDesc bold>Nome</TextDesc>
                <TextDesc bold>Email</TextDesc>
                <TextDesc bold>Idade</TextDesc>
                <TextDesc bold>Peso</TextDesc>
                <TextDesc bold>Altura</TextDesc>
              </Desc>

              <DescInfo>
                <TextDesc>{profile.student.name}</TextDesc>
                <TextDesc>{profile.student.email}</TextDesc>
                <TextDesc>
                  {differenceInCalendarYears(
                    new Date(),
                    parseISO(profile.student.birth_date)
                  )}{' '}
                  anos
                </TextDesc>
                <TextDesc>{profile.student.weight}kg</TextDesc>
                <TextDesc>{profile.student.height}m</TextDesc>
              </DescInfo>
            </ContainDesc>
            <ContainTitle>
              <Title>Plano</Title>
            </ContainTitle>
            <ContainDesc>
              <Desc>
                <TextDesc bold>Título</TextDesc>
                <TextDesc bold>Data início</TextDesc>
                <TextDesc bold>Data fim</TextDesc>
                <TextDesc bold>Preço total</TextDesc>
              </Desc>
              <DescInfo>
                <TextDesc>{profile.plan.title}</TextDesc>
                <TextDesc>
                  {format(parseISO(profile.start_date), 'dd/MM/yyyy')}
                </TextDesc>
                <TextDesc>
                  {format(parseISO(profile.end_date), 'dd/MM/yyyy')}
                </TextDesc>
                <TextDesc>{formatPrice(profile.price)}</TextDesc>
              </DescInfo>
            </ContainDesc>
          </ContainInfo>
        )}
      </Contain>
      <Button background="confirm" loading={loading} onPress={logOut}>
        Sair
      </Button>
    </Container>
  );
}
