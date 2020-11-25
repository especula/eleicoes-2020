import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Card, CardDeck, ListGroup, ListGroupItem, Carousel } from 'react-bootstrap'
import Chart from "chart.js";
import React from 'react';
import ReactDOM from "react-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Image } from 'react-bootstrap';

import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll,
  scrollSpy,
  scroller
} from "react-scroll";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const durationFn = function (deltaTop) {
  return deltaTop;
};


const dados = [
  {
    "Cargo": "Prefeito",
    "Nome_Candidato": "ALCEU HIPOLITO LIESENFELD",
    "Nome": "ALCEU",
    "Num_Candidato": 11,
    "Sigla_Partido": "PP",
    "Partido": "PROGRESSISTAS",
    "UF": "RS",
    "Municipio": "CRISSIUMAL",
    "Recursos de FEFC": 11400,
    "Recursos de Fundo Partidário": 0,
    "Recursos Privados": 23267.61,
    "Recursos Estimáveis": 8050,
    "Gastos Eleitorais Financeiros": 34667.61,
    "Gastos Eleitorais Estimáveis": 8050,
    "Data": "13/11/2020",
    "Imagem": "https://divulgacandcontas.tse.jus.br/candidaturas/oficial/2020/RS/86177/426/candidatos/379345/foto.jpg"
  },
  {
    "Cargo": "Prefeito",
    "Nome_Candidato": "CELSO LUTZ ESPANHOL",
    "Nome": "CELSO",
    "Num_Candidato": 10,
    "Sigla_Partido": "REPUBLICANOS",
    "Partido": "REPUBLICANOS",
    "UF": "RS",
    "Municipio": "CRISSIUMAL",
    "Recursos de FEFC": 13500,
    "Recursos de Fundo Partidário": 0,
    "Recursos Privados": 0,
    "Recursos Estimáveis": 203.31,
    "Gastos Eleitorais Financeiros": 1944.8,
    "Gastos Eleitorais Estimáveis": 203.31,
    "Data": "30/10/2020",
    "Imagem": "https://divulgacandcontas.tse.jus.br/candidaturas/oficial/2020/RS/86177/426/candidatos/546613/foto.jpg"
  },
  {
    "Cargo": "Prefeito",
    "Nome_Candidato": "ELISIO ANTONIO ECKERT",
    "Nome": "ELISIO",
    "Num_Candidato": 40,
    "Sigla_Partido": "PSB",
    "Partido": "Partido Socialista Brasileiro",
    "UF": "RS",
    "Municipio": "CRISSIUMAL",
    "Recursos de FEFC": 30000,
    "Recursos de Fundo Partidário": 0,
    "Recursos Privados": 6790,
    "Recursos Estimáveis": 7305,
    "Gastos Eleitorais Financeiros": 20038.2,
    "Gastos Eleitorais Estimáveis": 7305,
    "Data": "12/11/2020",
    "Imagem": "https://divulgacandcontas.tse.jus.br/candidaturas/oficial/2020/RS/86177/426/candidatos/453619/foto.jpg"
  },
  {
    "Cargo": "Prefeito",
    "Nome_Candidato": "MARCO AURELIO NEDEL",
    "Nome": "MARCO",
    "Num_Candidato": 19,
    "Sigla_Partido": "PODE",
    "Partido": "Podemos",
    "UF": "RS",
    "Municipio": "CRISSIUMAL",
    "Recursos de FEFC": 15000,
    "Recursos de Fundo Partidário": 0,
    "Recursos Privados": 41000,
    "Recursos Estimáveis": 4336,
    "Gastos Eleitorais Financeiros": 42393.34,
    "Gastos Eleitorais Estimáveis": 4336,
    "Data": "04/11/2020",
    "Imagem": "https://divulgacandcontas.tse.jus.br/candidaturas/oficial/2020/RS/86177/426/candidatos/46417/foto_738226831.jpg"
  },
  {
    "Cargo": "Prefeito",
    "Nome_Candidato": "SANDRA REJANE SCHILLING TRENTINI",
    "Nome": "SANDRA",
    "Num_Candidato": 65,
    "Sigla_Partido": "PC do B",
    "Partido": "Partido Comunista do Brasil",
    "UF": "RS",
    "Municipio": "CRISSIUMAL",
    "Recursos de FEFC": 0,
    "Recursos de Fundo Partidário": 0,
    "Recursos Privados": 22712.47,
    "Recursos Estimáveis": 1050,
    "Gastos Eleitorais Financeiros": 10800.54,
    "Gastos Eleitorais Estimáveis": 1050,
    "Data": "13/11/2020",
    "Imagem": "https://divulgacandcontas.tse.jus.br/candidaturas/oficial/2020/RS/86177/426/candidatos/161399/1600369968205.jpg"
  }
]

const detalhes = [
  {
    tipo: "Fundo Especial de Financiamento de Campanha (FEFC)",
    detalhe: "O Fundo Especial de Financiamento de Campanha (FEFC) é um fundo público destinado ao financiamento das campanhas eleitorais dos candidatos, previsto nos artigos 16-C e 16-D da Lei nº 9.504/1997."
  },
  {
    tipo: "Fundo Partidário",
    detalhe: `O Fundo Especial de Assistência Financeira aos Partidos Políticos, denominado Fundo Partidário, é constituído por dotações orçamentárias da União, multas, penalidades, doações e outros recursos financeiros que lhes forem atribuídos por lei.
    Os valores repassados aos partidos políticos, referentes aos duodécimos e multas (discriminados por partido e relativos ao mês de distribuição), são publicados mensalmente no Diário da Justiça Eletrônico. A consulta pode ser realizada por meio do acesso ao sítio eletrônico do TSE na Internet.`
  },
  {
    tipo: `Recursos Privados`,
    detalhe: `Doações realizadas pesssoas físicas`
  },
  {
    tipo: `Doações Estimáveis`,
    detalhe: `Bens ou serviços doados ou cedidos para os partidos`
  },
]
class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.scrollToTop = this.scrollToTop.bind(this);
  }


  scrollToWithContainer() {
    let goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register("end", () => {
        resolve();
        Events.scrollEvent.remove("end");
      });

      scroller.scrollTo("scroll-container", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart"
      });
    });

    goToContainer.then(() =>
      scroller.scrollTo("scroll-container-second-element", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        containerId: "scroll-container",
        offset: 50
      })
    );
  }
  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }
  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(d => d.label);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    this.myChart.update();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'bar',
      options: {
        legend: {
          display: this.props.legenda
        },
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0
              }
            }
          ]
        }
      },
      data: {
        labels: this.props.title,
        datasets: [{
          label: "R$",
          data: this.props.data,
          backgroundColor: ['#4a9ff5', '#66bfbf', '#f7be7f', '#a1dd70', '#d65f5f']


        }]
      }
    });

    Events.scrollEvent.register("begin", function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function () {
      console.log("end", arguments);
    });
  }
  scrollToTop() {
    // scroll.scrollToTop();
  }
  scrollTo(offset) {
    scroller.scrollTo("scroll-to-element", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: offset
    });
  }

  render() {
    return (
      <canvas ref={this.canvasRef} />
    );
  }
}

function App() {
  return (
    <div>
      <div>
        <Navbar expand="lg" fixed='top' className="justify-content-end">
          {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav >
              <Nav.Link>
                <Link activeClass="active" to="sobre" spy={true} smooth={true} duration={500} offset={50}>
                  Sobre
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link activeClass="active" to="candidatos" spy={true} smooth={true} duration={500} offset={50}>
                  Candidatos
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link activeClass="active" to="gastos" spy={true} smooth={true} duration={500} offset={50}>
                  Gastos
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link activeClass="active" to="recursos" spy={true} smooth={true} duration={500} offset={50}>
                  Recursos
                </Link>
              </Nav.Link>



              {/* <Nav.Link>
                <Link activeClass="active" to="contribua" spy={true} smooth={true} duration={500} offset={50}>
                  Contribua
                </Link>
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div>
        <div>
          <Element name="sobre" className="element" style={{ background: "#214252" }}>
            <div className="container">
              <div className="text-element">
                <h1>SOBRE</h1>
                <p>Vivamus commodo augue non enim consectetur, eget egestas nulla hendrerit. Maecenas pulvinar dapibus volutpat. Sed ac mi magna. Nam ac sapien at neque elementum consequat sit amet sit amet neque. Nam malesuada ex ut pharetra pretium. Praesent efficitur vitae ipsum sed congue. Cras dui diam, facilisis in blandit sed, fringilla ut est.</p>
                <p>Proin pharetra tellus eros, at tincidunt lorem mattis quis. Vivamus elementum vulputate erat ut lobortis. Aliquam vulputate volutpat leo et cursus. Nam a tortor cursus, accumsan purus a, venenatis enim. Maecenas rhoncus massa sed luctus tincidunt. Etiam hendrerit placerat massa congue egestas. Aenean dapibus turpis justo, eu egestas erat gravida sit amet. Donec hendrerit est magna, ut fringilla ex accumsan sed.</p>
              </div>
            </div>
          </Element>
          <Element name="candidatos" className="element" style={{ background: "#fbf6f0" }}>
            <div className="container text-center">
              <h1>CANDIDATOS</h1>
              <Carousel hover>
                {dados.map(cand =>
                  <Carousel.Item>
                    <div>
                      <Image src={cand.Imagem} thumbnail />
                    </div>
                    <div>
                      <h2>{cand.Nome_Candidato}</h2>
                      <h4>{cand.Partido}  ({cand.Sigla_Partido})</h4>
                      <h3>Recursos</h3>
                      <h4>{(cand["Recursos Estimáveis"] + cand["Recursos Privados"] + cand["Recursos de FEFC"] + cand["Recursos de Fundo Partidário"]).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4>
                      <h3>Gastos</h3>
                      <h4>{(cand["Gastos Eleitorais Estimáveis"] + cand["Gastos Eleitorais Financeiros"]).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h4>

                    </div>
                  </Carousel.Item>
                )}

              </Carousel>




            </div>

          </Element>
        </div>

        <Element name="gastos" className="element" style={{ background: '#ce6262' }}>
          <div className="container">
            <h1>GASTOS</h1>
            <h4>Gastos Eleitorais Financeiros</h4>
            <p>
              Sed convallis ipsum in nulla sagittis malesuada. Nullam efficitur mi at lorem congue venenatis. Nam nulla purus, porttitor nec nisi ac, placerat scelerisque odio. Praesent vulputate felis velit, nec vestibulum lorem rutrum vitae. Vestibulum non tincidunt ex. Curabitur sit amet porta erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean non arcu accumsan, convallis velit non, posuere nulla. Proin ut aliquam sapien, in scelerisque lacus. Vestibulum a enim nec lorem dapibus iaculis id nec elit. Sed fermentum a lacus non molestie. Aenean dignissim elit ut mattis pellentesque. Maecenas nec ultrices diam.
          </p>
            <h4>Gastos Eleitorais Estimáveis</h4>
            <p>
              Nunc ac velit non elit rutrum tincidunt. Suspendisse dapibus ex sit amet nulla sollicitudin ornare. Quisque luctus, neque consequat laoreet aliquam, magna massa sollicitudin leo, a faucibus ante felis ac lacus. Vestibulum in ornare neque. Pellentesque auctor, nunc non luctus pulvinar, dui elit posuere nisi, eu efficitur metus dolor eu massa. Cras et tempus dui, sit amet consectetur ligula. Cras lacinia sed justo non dapibus. Fusce sem risus, mollis efficitur pretium ac, varius vitae tellus. Duis mattis lacus id velit placerat viverra.</p>
          </div>

        </Element>
        <Element className="element" style={{ background: '#fbf6f0' }}>

          <div className="container">
            <div className="row text-center">
              <div className="col">
                <h3>Gastos Eleitorais Financeiros</h3>
                <BarChart
                  title={dados.map(cand => cand.Nome)}
                  data={dados.map(cand => cand["Gastos Eleitorais Financeiros"])}
                  color="#70CAD1"
                  legenda={false}
                />
              </div>
              <div className="col">
                <h3>Gastos Eleitorais Estimáveis</h3>
                <BarChart
                  title={dados.map(cand => cand.Nome)}
                  data={dados.map(cand => cand["Gastos Eleitorais Estimáveis"])}
                  color="#70CAD1"
                  legenda={false}
                />
              </div>
            </div>
          </div>

        </Element>
        <Element className="element" name="recursos" style={{ background: "#3c9d9b" }}>
          <div className='container'>
            <div className="text-element">
              <h1>RECURSOS</h1>
              <h4>Recursos de FEFC</h4>
              <p>Vivamus commodo augue non enim consectetur, eget egestas nulla hendrerit. Maecenas pulvinar dapibus volutpat. Sed ac mi magna. Nam ac sapien at neque elementum consequat sit amet sit amet neque. Nam malesuada ex ut pharetra pretium. Praesent efficitur vitae ipsum sed congue. Cras dui diam, facilisis in blandit sed, fringilla ut est.</p>
              <h4>Recursos Privados</h4>
              <p>Proin pharetra tellus eros, at tincidunt lorem mattis quis. Vivamus elementum vulputate erat ut lobortis. Aliquam vulputate volutpat leo et cursus. Nam a tortor cursus, accumsan purus a, venenatis enim. Maecenas rhoncus massa sed luctus tincidunt. Etiam hendrerit placerat massa congue egestas. Aenean dapibus turpis justo</p>
              <h4>Recursos Estimáveis</h4>
              <p>Proin pharetra tellus eros, at tincidunt lorem mattis quis. Vivamus elementum vulputate erat ut lobortis. Aliquam vulputate volutpat leo et cursus. Nam a tortor cursus, accumsan purus a, venenatis enim. Maecenas rhoncus massa sed luctus tincidunt. Etiam hendrerit placerat massa congue egestas. Aenean dapibus turpis justo</p>
              <h4>Recursos de Fundo Partidário</h4>
              <p>Proin pharetra tellus eros, at tincidunt lorem mattis quis. Vivamus elementum vulputate erat ut lobortis. Aliquam vulputate volutpat leo et cursus. Nam a tortor cursus, accumsan purus a, venenatis enim. Maecenas rhoncus massa sed luctus tincidunt. Etiam hendrerit placerat massa congue egestas. Aenean dapibus turpis justo</p>

            </div>
          </div>

        </Element>
        <Element className="element" style={{ background: "#fbf6f0" }}>
          <div className="container">
            <div className="row mb-2">
              <div className="col">
                <h3>Recursos de FEFC</h3>
                <BarChart
                  title={dados.map(cand => cand.Nome)}
                  data={dados.map(cand => cand["Recursos de FEFC"])}
                  color="#70CAD1"
                  legenda={false}
                />

              </div>
              <div className="col">
                <h3>Recursos Privados</h3>
                <BarChart
                  title={dados.map(cand => cand.Nome)}
                  data={dados.map(cand => cand["Recursos Privados"])}
                  color="#70CAD1"
                  legenda={false}
                />

              </div>
            </div>
            <div className="row">
              <div className="col">
                <h3>Recursos Estimáveis</h3>
                <BarChart
                  title={dados.map(cand => cand.Nome)}
                  data={dados.map(cand => cand["Recursos Estimáveis"])}
                  color="#70CAD1"
                  legenda={false}
                />

              </div>
              <div className="col">
                <h3>Recursos de Fundo Partidário</h3>
                <BarChart
                  title={dados.map(cand => cand.Nome)}
                  data={dados.map(cand => cand["Recursos de Fundo Partidário"])}
                  color="#70CAD1"
                  legenda={false}
                />

              </div>
            </div>

          </div>
        </Element>
        <Element className="element last" style={{ background: "#214252" }}>
          <div className="container text-element">
            <h1>Contribua</h1>
            <FontAwesomeIcon icon={["fab", "fa-github"]} />
            

            <p>
              Quer contribuir? Nos chame para um <FontAwesomeIcon icon={faCoffee} />
            </p>
          </div>
        </Element>

      </div>
    </div>


  );
}

export default App;
