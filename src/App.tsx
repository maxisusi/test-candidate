import { NavLink, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Directory } from './Directory';
import { Statistique } from './Statistique';

export const App = () => (
  <Layout>
    <NavBar>
      <Inner>
        <AppTitle>Annuaire RH</AppTitle>
        <TabList>
          <TabLink to="/" end>Annuaire</TabLink>
          <TabLink to="/stats">Statistiques</TabLink>
        </TabList>
      </Inner>
    </NavBar>
    <Main>
      <Inner>
        <Routes>
          <Route path="/" element={<Directory />} />
          <Route path="/stats" element={<Statistique />} />
        </Routes>
      </Inner>
    </Main>
  </Layout>
);

const Layout = styled.div`
  min-height: 100vh;
  background-color: #f1f5f9;
  color: #1e293b;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const NavBar = styled.header`
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
`;

const Inner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const AppTitle = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin-right: 2rem;
`;

const TabList = styled.div`
  display: inline-flex;
  gap: 0.25rem;
`;

const TabLink = styled(NavLink)`
  display: inline-block;
  padding: 1rem 1.25rem;
  text-decoration: none;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;

  &:hover {
    color: #1e293b;
  }

  &.active {
    color: #2563eb;
    border-bottom-color: #2563eb;
    font-weight: 600;
  }
`;

const Main = styled.main`
  padding: 2rem 0;
`;


