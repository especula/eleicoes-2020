import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Card, CardDeck, ListGroup, ListGroupItem } from 'react-bootstrap'
import Chart from "chart.js";
import React from 'react';
import ReactDOM from "react-dom";

import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll,
  scrollSpy,
  scroller
} from "react-scroll";

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
    <div className="App">
      <header className="App-header">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav">
                <li>
                  <Link
                    activeClass="active"
                    className="test1"
                    to="test1"
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={50}
                  >
                    Test 1
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    className="test2"
                    to="test2"
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-55}
                  >
                    Test 2
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    className="test3"
                    to="test3"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    Test 3
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    className="test4"
                    to="test4"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    Test 4
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    className="test5"
                    to="test5"
                    spy={true}
                    smooth={true}
                    duration={500}
                    delay={1000}
                  >
                    Test 5 ( delay )
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    className="test6"
                    to="anchor"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    Test 6 (anchor)
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    className="test7"
                    to="test7"
                    spy={true}
                    smooth={true}
                    duration={durationFn}
                  >
                    Test 7 (duration and container)
                  </Link>
                </li>
                <li>
                  {" "}
                  <a onClick={() => animateScroll.scrollTo(100)}>
                    Scroll To 100!
                  </a>
                </li>
                <li>
                  {" "}
                  <a onClick={() => animateScroll.scrollToBottom()}>
                    Scroll To Bottom
                  </a>
                </li>
                <li>
                  {" "}
                  <a onClick={() => animateScroll.scrollMore(500)}>
                    Scroll 500 More!
                  </a>
                </li>
                <li>
                  {" "}
                  <a
                    onClick={() =>
                      animateScroll.scrollMore(1000, { delay: 1500 })
                    }
                  >
                    Scroll 1000 More! ( delay ){" "}
                  </a>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    className="test8"
                    to="same"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    Same target
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    className="test9"
                    to="same"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    Same target
                  </Link>
                </li>
                <li>
                  <a
                    className="test1"
                    to="test1"
                    onClick={() => this.scrollTo()}
                  >
                    Scroll to element
                  </a>
                </li>
                <li>
                  <a
                    className="test1"
                    to="test1"
                    onClick={() => this.scrollTo(-50)}
                  >
                    Scroll to element (offset -50)
                  </a>
                </li>
                <li>
                  <a
                    className="test1"
                    to="test1"
                    onClick={() => this.scrollToWithContainer()}
                  >
                    Scroll to element within container
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="container">
        <div>
          <Element name="test1" className="element">

            <div className="container-box">
              <h1>CANDIDATOS</h1>
            </div>
            <CardDeck>
              {dados.map(cand =>
                <Card>
                  <Card.Img variant="top" src={cand.Imagem} />
                  <Card.Body>
                    <Card.Title>{cand.Nome_Candidato}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{cand.Partido}  ({cand.Sigla_Partido})</Card.Subtitle>
                    <Card.Text>

                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem variant="success">Recursos</ListGroupItem>
                    <ListGroupItem variant="success">{(cand["Recursos Estimáveis"] + cand["Recursos Privados"] + cand["Recursos de FEFC"] + cand["Recursos de Fundo Partidário"]).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</ListGroupItem>
                    <ListGroupItem variant="danger">Gastos</ListGroupItem>
                    <ListGroupItem variant="danger">{(cand["Gastos Eleitorais Estimáveis"] + cand["Gastos Eleitorais Financeiros"]).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</ListGroupItem>

                  </ListGroup>
                  <Card.Footer>
                    <small className="text-muted">Atualizado em {cand.Data}</small>
                  </Card.Footer>
                </Card>
              )}
            </CardDeck>
          </Element>
        </div>
        
        <Element name="test2" className="element no-padding" style={{background: '#fbf6f0'}}>
        <h1>RECURSOS</h1>
        <div className="row">
          <div className="col">
            <Card>
              <Card.Title className="text-center mt-4">Recursos de FEFC</Card.Title>
              <Card.Body>
                <BarChart
                  title={dados.map(cand => cand.Nome)}
                  data={dados.map(cand => cand["Recursos de FEFC"])}
                  color="#70CAD1"
                  legenda={false}
                />
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card>
              <Card.Title className="text-center mt-4">Recursos Privados</Card.Title>
              <Card.Body>
                <BarChart
                  title={dados.map(cand => cand.Nome)}
                  data={dados.map(cand => cand["Recursos Privados"])}
                  color="#70CAD1"
                  legenda={false}
                />
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Card>
              <Card.Title className="text-center mt-4">Recursos Estimáveis</Card.Title>
              <Card.Body>
                <BarChart
                  title={dados.map(cand => cand.Nome)}
                  data={dados.map(cand => cand["Recursos Estimáveis"])}
                  color="#70CAD1"
                  legenda={false}
                />
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card>
              <Card.Title className="text-center mt-4">Recursos de Fundo Partidário</Card.Title>
              <Card.Body>
                <BarChart
                  title={dados.map(cand => cand.Nome)}
                  data={dados.map(cand => cand["Recursos de Fundo Partidário"])}
                  color="#70CAD1"
                  legenda={false}
                />
              </Card.Body>
            </Card>
          </div>
        </div>
        </Element>
        <Element name="test3" className="element">
        <h1>GASTOS</h1>
        <div className="row">
          <div className="col">
            <Card>
              <Card.Title className="text-center mt-4">Gastos Eleitorais Financeiros</Card.Title>
              <Card.Body>
                <BarChart
                  title={dados.map(cand => cand.Nome)}
                  data={dados.map(cand => cand["Gastos Eleitorais Financeiros"])}
                  color="#70CAD1"
                  legenda={false}
                />
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card>
              <Card.Title className="text-center mt-4">Gastos Eleitorais Estimáveis</Card.Title>
              <Card.Body>
                <BarChart
                  title={dados.map(cand => cand.Nome)}
                  data={dados.map(cand => cand["Gastos Eleitorais Estimáveis"])}
                  color="#70CAD1"
                  legenda={false}
                />
              </Card.Body>
            </Card>
          </div>
        </div>
        </Element>
      </div>
      
      <div>


        {/* <a onClick={this.scrollToTop}>To the top!</a> */}
      </div>
    </div>


  );
}

export default App;
