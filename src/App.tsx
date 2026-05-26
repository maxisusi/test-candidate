import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styled from 'styled-components';
import './App.css';
import Directory from './Directory';
import Statistique from './Statistique';

type Product = {
  id: number;
  name: string;
  price: number;
};

type ApiResponse = {
  message: string;
  version: string;
  timestamp: string;
  products: Product[];
};

const App = () => {
  const {
    data: apiData,
    error,
    isFetching,
    refetch,
  } = useQuery<ApiResponse, Error>({
    queryKey: ['api-hello'],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse>('/api/hello');
      return data;
    },
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src="Octocat.png" className="App-logo" alt="logo" />
        <p>
          GitHub Codespaces <span className="heart">♥️</span> React + Symfony
        </p>

        <div className="api-box">
          <h2>Symfony API Response</h2>
          {isFetching && <p>Loading…</p>}
          {error && <p className="error">Error: {error.message}</p>}
          {apiData && (
            <>
              <ul>
                <li><strong>Message:</strong> {apiData.message}</li>
                <li><strong>Symfony version:</strong> {apiData.version}</li>
                <li><strong>Timestamp:</strong> {apiData.timestamp}</li>
              </ul>
              <h3>Products from DB</h3>
              <DataTable>
                <thead>
                  <tr>
                    <HeaderCell>ID</HeaderCell>
                    <HeaderCell>Name</HeaderCell>
                    <HeaderCellRight>Price</HeaderCellRight>
                  </tr>
                </thead>
                <tbody>
                  {apiData.products.map((p) => (
                    <tr key={p.id}>
                      <Cell>{p.id}</Cell>
                      <Cell>{p.name}</Cell>
                      <CellRight>${p.price}</CellRight>
                    </tr>
                  ))}
                </tbody>
              </DataTable>
            </>
          )}
          <button onClick={() => refetch()} disabled={isFetching}>
            Refresh
          </button>
        </div>
        
        <Directory />
        <Statistique />
      </header>
    </div>
  );
};

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
`;

const HeaderCell = styled.th`
  text-align: left;
  border-bottom: 1px solid #61dafb;
  padding-bottom: 0.3rem;
`;

const HeaderCellRight = styled(HeaderCell)`
  text-align: right;
`;

const Cell = styled.td`
  padding: 0.2rem 0;
`;

const CellRight = styled(Cell)`
  text-align: right;
`;

export default App;
