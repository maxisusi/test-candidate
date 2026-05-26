import { NavLink, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Directory } from './pages/Directory';
import { Statistics } from './pages/Statistics';
import { translation } from './translations/translation';

export const App = () => (
  <Layout>
    <NavBar>
      <NavInner>
        <AppTitle>{translation.app.title}</AppTitle>
        <TabList>
          <TabLink to="/" end>{translation.app.tabs.directory}</TabLink>
          <TabLink to="/stats">{translation.app.tabs.statistics}</TabLink>
        </TabList>
        <UserInfo>
          <Avatar>D</Avatar>
          <UserName>David</UserName>
        </UserInfo>
      </NavInner>
    </NavBar>
    <Main>
      <Inner>
        <Routes>
          <Route path="/" element={<Directory />} />
        <Route path="/stats" element={<Statistics />} />
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

const NavInner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Avatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #2563eb;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #1e293b;
`;


