import React from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import Input from '../components/Input';

const Container = styled.div`
`
const SearchInput = styled(Input)`
`

const Search = () => {
  const search = useInput('');
  return (
    <Container>
      <SearchInput {...search} />
    </Container>
  );
}

export default Search;