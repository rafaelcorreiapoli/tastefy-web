import Restaurantes from '@collections/restaurantes'
import Promocoes from '@collections/promocoes'
import Produtos from '@collections/produtos'
import Questionarios from '@collections/questionarios'
import Perguntas from '@collections/perguntas'


const db = {
  restaurantes: [
    {
      _id: 'subway',
      nome: 'Subway',
      categoria: 'Lanches',
      lat: 20,
      lng: 10,
      logoUrl: 'https://logodownload.org/wp-content/uploads/2014/07/Subway-logo.png',
      backgroundUrl: 'http://cdn.foodbeast.com.s3.amazonaws.com/content/wp-content/uploads/2011/08/subway-turkey-breast_black-forest-ham.jpg',
    },
    {
      _id: 'mc-donalds',
      nome: 'MC Donalds',
      categoria: 'Hamburguer',
      lat: 23,
      lng: 11,
      logoUrl: 'http://vignette2.wikia.nocookie.net/logopedia/images/b/ba/Mcdonalds_logo.png/revision/latest?cb=20130603185417',
      backgroundUrl: 'http://www.mccourtesy.com/i/1452543845202/h407-w1100/uploads/Home_OnaOut.jpg',
    },
    {
      _id: 'dominos',
      nome: 'Dominos',
      categoria: 'Pizzaria',
      lat: 22,
      lng: 10,
      logoUrl: 'http://vignette4.wikia.nocookie.net/logopedia/images/0/0d/200px-Dominos_pizza_logo_svg.png/revision/20121210134153',
      backgroundUrl: 'https://discounts.nusextra.co.uk/MediaLibrary/FeaturedImages/Dominos/dominos_main_image.jpg',
    },
  ],
  promocoes: [
    {
      restauranteId: 'dominos',
      questionarioId: 'questionario-dominos-1',
      nome: 'Pizza calabresa',
      validoAte: new Date(),
      descricao: 'Responda o questionário e ganhe uma pizza calabresa',
      imagemUrl: 'http://blogstuff.luciliadiniz.com/wp-content/uploads/2015/12/perigo-da-pizza.jpg',
      ativa: true,
      produtosId: ['pizza-calabresa'],
    },
    {
      restauranteId: 'mc-donalds',
      questionarioId: 'questionario-mc-donalds-1',
      nome: 'Uma casquinha deliciosa',
      validoAte: new Date(),
      descricao: 'Responda o questionário e ganhe uma casquinha de um sabor',
      imagemUrl: 'http://www.guiadasemana.com.br/contentFiles/system/pictures/2016/4/156885/original/casquinha-certa.jpg',
      ativa: true,
      produtosId: ['casquinha'],
    },
    {
      restauranteId: 'subway',
      questionarioId: 'questionario-subway-1',
      nome: 'Coca-cola ou cookie',
      validoAte: new Date(),
      descricao: 'Responda o questionário e escolha entre uma coca-cola 2L ou cookie',
      imagemUrl: 'http://cookieconnection.juliausher.com/fileSendAction/fcType/0/fcOid/392408597136133223/filePointer/392408597136330976/fodoid/392408597136330971/imageType/LARGE/inlineImage/true/Vintage%20vs%20Modern%20Day%20Coca%20Cola%20-%20Emmas%20Sweets%20-%201.jpg',
      ativa: true,
      produtosId: ['pizza-calabresa'],
    },
  ],
  questionarios: [
    {
      _id: 'questionario-subway-1',
      nome: 'Questionário do subway',
      restauranteId: 'subway',
      responderam: [],
      tempoMedio: 10,
      ativo: true,
    },
    {
      _id: 'questionario-mc-donalds-1',
      nome: 'Questionário do Mc Donalds',
      restauranteId: 'mc-donalds',
      responderam: [],
      tempoMedio: 15,
      ativo: true,
    },
    {
      _id: 'questionario-dominos-1',
      nome: 'Questionário do Dominos',
      restauranteId: 'dominos',
      responderam: [],
      tempoMedio: 20,
      ativo: true,
    },
  ],
  perguntas: [
    {
      questionarioId: 'questionario-subway-1',
      ordem: 0,
      titulo: 'Quais acompanhamentos você escolheu?',
      tipo: 'array',
      widget: 'checkbox',
      config: {
        options: [
          {
            value: 'alface',
            label: 'Alface',
          },
          {
            value: 'azeitona',
            label: 'Azeitona',
          },
          {
            value: 'pepino',
            label: 'Pepino',
          },
        ],
      },
    },
    {
      questionarioId: 'questionario-mc-donalds-1',
      ordem: 0,
      titulo: 'Dê uma nota à sua visita',
      tipo: 'number',
      widget: 'rating',
      config: {
        icon: 'happy',
        color: 'green',
      },
    },
    {
      questionarioId: 'questionario-dominos-1',
      ordem: 0,
      titulo: 'Escolha o que mais te agrada no dominos',
      tipo: 'text',
      widget: 'select',
      config: {
        options: [
          {
            value: 'massa',
            label: 'Massa',
          },
          {
            value: 'molho',
            label: 'Molho',
          },
          {
            value: 'queijo',
            label: 'Queijo',
          },
        ],
      },
    },
  ],
  produtos: [
    {
      _id: 'pizza-calabresa',
      restauranteId: 'dominos',
      nome: 'Pizza calabresa',
      imagemUrl: 'https://i.ytimg.com/vi/1DUddHSEy9E/hqdefault.jpg',
      desconto: 20,
      observacao: 'Com cebola',
    },
    {
      _id: 'casquinha',
      restauranteId: 'mc-donalds',
      nome: 'Casquinha',
      imagemUrl: 'http://d10laxprh05hge.cloudfront.net/secciones/cardapio/include/sobremesas/internas/img/cono.jpg?v=10000001851',
      desconto: 100,
      observacao: '3 sabores',
    },
    {
      _id: 'coca-cola',
      restauranteId: 'subway',
      nome: 'Coca-cola 2L',
      imagemUrl: 'http://tendaatacado.vteximg.com.br/arquivos/ids/178797-380-380/37451_2.jpg',
      desconto: 100,
      observacao: 'Apenas normal',
    },
    {
      _id: 'cookie',
      restauranteId: 'subway',
      nome: 'Cookie',
      imagemUrl: 'http://kalanga.com.br/blog/wp-content/uploads/2013/05/20091212wc-subway.jpg',
      desconto: 50,
      observacao: 'Chocolate ou baunilha',
    },
  ],
}

export default () => {
  if (!Restaurantes.findOne()) {
    db.restaurantes.forEach(restaurante => Restaurantes.insert(restaurante))
  }
  if (!Produtos.findOne()) {
    db.produtos.forEach(produto => Produtos.insert(produto))
  }
  if (!Promocoes.findOne()) {
    db.promocoes.forEach(promocao => Promocoes.insert(promocao))
  }
  if (!Questionarios.findOne()) {
    db.questionarios.forEach(questionario => Questionarios.insert(questionario))
  }

  if (!Perguntas.findOne()) {
    db.perguntas.forEach(pergunta => Perguntas.insert(pergunta))
  }
}
