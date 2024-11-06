import React from 'react';
import { CustomContainer } from '../CustomComponents/CustomContainer';
import { SearchResultSummary } from './SearchResultSummary/SearchResultSummary';
import SearchResultHeader from "./SearchResultHeader/SearchResultHeader";
import SearchDoc from './SearchDoc/SearchDoc';

const ResultPage = () => {
  return (
    <main>
      <CustomContainer>
        <SearchResultHeader />
        <SearchResultSummary />
        <SearchDoc />
      </CustomContainer>
    </main>
  )
}

export { ResultPage }
