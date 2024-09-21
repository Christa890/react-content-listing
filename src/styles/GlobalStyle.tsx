import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Import Titillium Web font */
  @import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;700&display=swap');

  /* Apply global font and background */
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Titillium Web', sans-serif;  /* Global Font */
    background-color: #171717;  /* Background Color */
    color: #FFFFFF;  /* Text Color */
  }

  /* Thumbnail Styles */
  .thumbnail {
    width: 100%;
    padding-bottom: 150%; /* 2:3 Aspect Ratio */
    background-size: cover;
    background-position: center;
  }

  /* Scrollbar hidden */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Grid container for content */
  .content-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);  /* Three columns */
    gap: 10px;
    padding: 10px;
  }

  .content-item {
    background-color: #FFFFFF;  /* Optional, if you need separate styles */
    color: #171717;
  }

`;

export default GlobalStyle;
