import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Button } from 'antd';
import useAllFilms from '../hooks/IndexHook';
import FilmContainer from '../components/FilmComponent';
import { FilmsType } from '../types/IndexType';
import { useLanguage } from '../Translations/LanguageContext'; 
import { translations } from '../Translations/translations'; 
import headerImage from '../pictures/starbanner2.jpg';
import footerImage from '../pictures/footer3.png';
import cardImage from '../pictures/boba.jpg'

const { Header, Content, Footer } = Layout;

const Home: React.FC = () => {
  const { data, loading, error } = useAllFilms();
  const { language, switchLanguage } = useLanguage(); 

  const [sortedFilms, setSortedFilms] = useState<FilmsType[]>([]);
  const [activeButton, setActiveButton] = useState<number | null>(null);

  useEffect(() => {
    if (data && data.allFilms) {
      setSortedFilms(data.allFilms.films);
    }
  }, [data]);


  const sortFilms = (buttonIndex: number) => {
    if (activeButton === buttonIndex) return; 
    setActiveButton(buttonIndex); 

    let sortedFilmsCopy = [...sortedFilms]; 

    if (buttonIndex === 0) {
     
      sortedFilmsCopy.sort((a, b) => {
        const directorA = a.director.toLowerCase();
        const directorB = b.director.toLowerCase();
        if (directorA === directorB) {
         
          const yearA = new Date(a.releaseDate).getFullYear();
          const yearB = new Date(b.releaseDate).getFullYear();
          return yearA - yearB; 
        }
        return directorA.localeCompare(directorB);
      });
    }

    if (buttonIndex === 1) {
    
      sortedFilmsCopy.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA === titleB) {
          
          const dateA = new Date(a.releaseDate).getTime();
          const dateB = new Date(b.releaseDate).getTime();
          return dateA - dateB; 
        }
        return titleA.localeCompare(titleB);
      });
    }

    setSortedFilms(sortedFilmsCopy); 
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const { headerButtons, footerButtons } = translations[language]; 

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <Header 
        style={{
          backgroundImage: `url(${headerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '150px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Row gutter={16} justify="center">
          <Col>
            <Button
              type={activeButton === 0 ? 'primary' : 'default'} 
              onClick={() => sortFilms(0)} 
              disabled={activeButton === 0}
              style={{
                background: 'linear-gradient(to right, #0077ff, #00b8ff)', 
                border: 'none',
                color: '#fff',
                boxShadow: '0 0 10px rgba(0, 119, 255, 0.7)',
              }}
            >
              Filter by Director and Release Year
            </Button>
          </Col>
          <Col>
            <Button
              type={activeButton === 1 ? 'primary' : 'default'} 
              onClick={() => sortFilms(1)} 
              disabled={activeButton === 1}
              style={{
                background: 'linear-gradient(to right, #ff4040, #ff6666)', 
                border: 'none',
                color: '#fff',
                boxShadow: '0 0 10px rgba(255, 64, 64, 0.7)',
              }}
            >
              Filter by Title and Release Date
            </Button>
          </Col>
        </Row>
      </Header>

     
      <Content style={{
        color: '#000000',
        textAlign: 'center',
        padding: '10px',
        backgroundImage: `url(${cardImage})`,
        backgroundSize: '1920px auto',  
        backgroundPosition: 'right',  
        backgroundRepeat: 'no-repeat',
        minHeight: '100px',
        minWidth: '300px',
      }}>
        <Row gutter={[16, 16]} justify="center" align="middle">
          {sortedFilms?.map((film: FilmsType) => (
            <Col span={24} key={film.id}>
              <FilmContainer film={film} translation={translations[language].cards} />
            </Col>
          ))}
        </Row>
      </Content>

     
      <Footer style={{
        color: '#ffffff', 
        textAlign: 'center', 
        padding: '10px', 
        backgroundImage: `url(${footerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
         minHeight: '60px',
      }}>
      <Row gutter={16} justify="center">
      {footerButtons.map((buttonLabel, index) => (
      <Col key={index}>
        <Button
          style={{
            background: index === 0
              ? 'linear-gradient(to right, #0077ff, #00b8ff)' 
              : 'linear-gradient(to right, #ff4040, #ff6666)', 
            border: 'none',
            color: '#fff',
            padding: '10px 20px',
            fontSize: '14px',
            boxShadow: index === 0
              ? '0 0 10px rgba(0, 119, 255, 0.7)'  
              : '0 0 10px rgba(255, 64, 64, 0.7)',  
            transition: 'all 0.3s ease',
          }}
          onClick={switchLanguage} 
        >
          {buttonLabel}
        </Button>
      </Col>
    ))}
  </Row>
</Footer>
    </Layout>
  );
};

export default Home;