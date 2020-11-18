import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardDeck, ListGroup, ListGroupItem } from 'react-bootstrap'
import Chart from "chart.js";
import React from 'react'

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

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
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
  }

  render() {
    return (
      <canvas ref={this.canvasRef} />
    );
  }
}

function App() {
  console.log(dados)
  return (
    <div className="App">
      <header className="App-header">
        <p>
        </p>
      </header>
      <div className="container">

        <h1>CANDIDATOS</h1>
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
                <ListGroupItem>+ Recursos: R$ {cand["Recursos Estimáveis"] + cand["Recursos Privados"] + cand["Recursos de FEFC"] + cand["Recursos de Fundo Partidário"]}</ListGroupItem>
                <ListGroupItem>- Gastos: R$ {cand["Gastos Eleitorais Estimáveis"] + cand["Gastos Eleitorais Financeiros"]}</ListGroupItem>

              </ListGroup>
              <Card.Footer>
                <small className="text-muted">Atualizado em {cand.Data}</small>
              </Card.Footer>
            </Card>
          )}
        </CardDeck>
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
      </div>

    </div>
  );
}

export default App;
