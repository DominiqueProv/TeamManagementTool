import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

* {
      font-family: 'Oswald', sans-serif;
      margin: 0;
  padding: 0;
  box-sizing: border-box;
    }

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	
	border: 0;
  font-size: 100%;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
  line-height: 1;
  height: 100%;
	/* overflow-x:hidden; */
}


ol, ul { margin-bottom: 1em; }

a { color: black; }

h1{ font-size: 10px;}

:root{
  --global-font-size: 0.8rem;
  --global-text-color: black;
  --global-primary-title-size: 2rem;
  --global-color-primary: black;
  --global-color-secondary: #AAAAAA;
  --global-color-support: #F2F2F2;
}

`;

export default GlobalStyles;
