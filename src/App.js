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
    "Recursos Privados": 23290.16,
    "Recursos Estimáveis": 8050,
    "Gastos Eleitorais Financeiros": 34690.16,
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
    "Recursos Privados": 1104,
    "Recursos Estimáveis": 203.31,
    "Gastos Eleitorais Financeiros": 14604,
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
    "Recursos Privados": 6874.61,
    "Recursos Estimáveis": 7305,
    "Gastos Eleitorais Financeiros": 36874.61,
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
    "Gastos Eleitorais Financeiros": 55920.34,
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
    "Gastos Eleitorais Financeiros": 22648.95,
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
                <h5>Esse projeto tem como objetivo facilitar o acesso à informação.
                Todas as informações aqui contidas estão disponíveis para acesso a todos os cidadãos por meio da plataforma <a href="https://divulgacandcontas.tse.jus.br/">DivulgaCand</a>.</h5>
                <h5> A fiscalização de gastos nas eleições e no cotidiano do setor público é de suma importância visto que o SEU DINHEIRO financia boa parte desses gastos.
                Essa é a primeira parte de uma série de análises que serão feitas. Começando pelo município de Crissiumal, no estado do Rio Grande do Sul. Depois podendo abranger demais municípios do país.
</h5>
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
          <div className="text-element">
            <h1>GASTOS</h1>
            <h4>Gastos Eleitorais Financeiros</h4>
            <p>
              Os gastos eleitorais são as despesas realizadas por candidato e partido, na campanha eleitoral com o objetivo de conseguir voto. (Lei 9.504/1997, art. 26).
          </p>
            <h4>Gastos Eleitorais Estimáveis</h4>
            <p>
              São gastos eleitorais estimáveis os bens e serviços aplicados em campanha por candidatos e partidos políticos, que têm um valor, todavia, obtidos mediante cessão ou doação e que, sob nenhuma hipótese, serão pagos.</p>
                </div>
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
              <p>O Fundo Especial de Financiamento de Campanha (FEFC) é um fundo público destinado ao financiamento das campanhas eleitorais dos candidatos, previsto nos artigos 16-C e 16-D da Lei nº 9.504/1997.
              As diretrizes gerais para a gestão e distribuição dos recursos do FEFC são regulamentadas pela Resolução-TSE nº 23.605/2019.</p>
              <p>Para a eleição geral de 2020 o valor do FEFC é de R$ 2.034.954.824, montante que foi disponibilizado pelo Tesouro Nacional ao TSE em 1º de junho de 2020, nos termos da Lei nº 9.504/1997, art. 16-C, § 2º.</p>
              <p>Os valores das cotas individuais de cada partido foram apurados de acordo com os critérios fixados na Lei nº 9.504/1997, art. 16-D e aprovados pelo Plenário do TSE, no Processo Administrativo nº 0600628-33.2020.6.00.0000.</p>
              <p>O cálculo de distribuição do Fundo Especial de Financiamento de Campanha (FEFC) das Eleições 2020 considera o número de representantes eleitos para a Câmara dos Deputados e para o Senado Federal na última eleição geral, bem como o número de senadores filiados ao partido que, na data do pleito, estavam nos primeiros quatro anos de mandato.</p>

              <h4>Recursos Privados</h4>
              <p>São as doações em dinheiro realizadas por pessoas físicas bem como recursos do próprio candidato.</p>
              <h4>Recursos Estimáveis</h4>
              <p>TO DO</p>
              <h4>Recursos de Fundo Partidário</h4>
              <p>O Fundo Especial de Assistência Financeira aos Partidos Políticos, denominado Fundo Partidário, é constituído por dotações orçamentárias da União, multas, penalidades, doações e outros recursos financeiros que lhes forem atribuídos por lei.</p>

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
