//MODO ESCURO 

// Seleciona o botão responsável por alternar o tema do site no DOM
const botaoTema = document.querySelector("#theme-toggle");

// Seleciona a tag raiz <body> para receber ou remover a classe de estilização escura
const corpoDaPagina = document.body;

// Consulta o armazenamento local do navegador para verificar se o usuário já salvou uma preferência anterior
const temaSalvo = localStorage.getItem("mare-tema");

// Condicional para aplicar o tema escuro na inicialização caso a preferência prévia estivesse ativa
if (temaSalvo === "escuro") {
  corpoDaPagina.classList.add("dark-theme");
}

// Função auxiliar para manter o texto e o estado acessível (aria-pressed) do botão sincronizados
function atualizarBotaoTema() {
  const estaEscuro = corpoDaPagina.classList.contains("dark-theme");
  botaoTema.textContent = estaEscuro ? "Ativar modo claro" : "Ativar modo escuro";
  botaoTema.setAttribute("aria-pressed", String(estaEscuro));
}

// Adiciona um ouvinte de eventos ('click') para alternar o tema dinamicamente
if (botaoTema) {
  atualizarBotaoTema();

  botaoTema.addEventListener("click", () => {
    // O método .toggle() adiciona a classe se ela não existir, ou a remove caso já esteja presente
    corpoDaPagina.classList.toggle("dark-theme");

    // Verifica se o corpo da página atualmente possui a classe de modo escuro
    const estaNoModoEscuro = corpoDaPagina.classList.contains("dark-theme");

    // Condicional para salvar o estado escolhido no armazenamento local do navegador
    if (estaNoModoEscuro) {
      localStorage.setItem("mare-tema", "escuro");
    } else {
      localStorage.setItem("mare-tema", "claro");
    }

    atualizarBotaoTema();
  });
}








//FORMULÁRIO E CTA 

// Seleciona o formulário de inscrição no Clube do Oceano
const formularioMissao = document.querySelector("#mission-form");

// Seleciona o campo de entrada de texto para o nome completo
const inputNomeMissao = document.querySelector("#mission-name");

// Seleciona o campo de entrada de texto para o e-mail
const inputEmailMissao = document.querySelector("#mission-email");

// Seleciona a caixa de texto destinada a exibir mensagens de feedback ou erro para o usuário
const statusFormularioMissao = document.querySelector("#mission-status");

// Evento de submissão do formulário com validação de dados e prevenção do envio padrão
if (formularioMissao) {
  formularioMissao.addEventListener("submit", (eventoDeSubmissao) => {
    // Impede o envio padrão e o recarregamento da página
    eventoDeSubmissao.preventDefault();

    // Captura os valores digitados nos inputs removendo espaços em branco nas pontas
    const nomeInformado = inputNomeMissao.value.trim();
    const emailInformado = inputEmailMissao.value.trim();

    // Validação lógica para checar se os campos obrigatórios estão preenchidos
    if (nomeInformado !== "" && emailInformado !== "") {
      statusFormularioMissao.textContent =
        "Obrigado pelo apoio, " + nomeInformado + "! Sua inscrição no Clube do Oceano foi registrada para " + emailInformado + ".";

      // Limpa os campos do formulário após a confirmação
      formularioMissao.reset();

      // Utiliza setTimeout para limpar a mensagem de feedback após 6 segundos (6000 milissegundos)
      setTimeout(() => {
        statusFormularioMissao.textContent = "";
      }, 6000);
    } else {
      statusFormularioMissao.textContent =
        "Por favor, preencha seu nome completo e e-mail para concluir a inscrição.";
    }
  });
}







// ALERTA DINÂMICO 

// Seleciona a seção principal de destaque (Hero) onde o alerta será injetado dinamicamente
const secaoDestaqueHero = document.querySelector(".hero");

// Função declarada para instanciar e injetar um aviso institucional no topo da página
function dispararAlertaDoOceano() {
  // Verifica preventivamente se o alerta já existe para evitar duplicações na árvore DOM
  if (!secaoDestaqueHero || document.querySelector(".ocean-alert")) {
    return;
  }

  // Cria um elemento <aside> inteiramente na memória do navegador
  const bannerAlerta = document.createElement("aside");
  bannerAlerta.classList.add("ocean-alert");
  bannerAlerta.setAttribute("role", "status");

  // Cria um elemento de parágrafo <p> para acomodar a mensagem textual de forma segura
  const textoAlerta = document.createElement("p");
  const destaqueAlerta = document.createElement("strong");
  destaqueAlerta.textContent = "Alerta do oceano: ";
  textoAlerta.append(
    destaqueAlerta,
    document.createTextNode("conheça as iniciativas oficiais de conservação na página Como apoiar.")
  );

  // Cria um botão interativo para permitir que o usuário feche o aviso
  const botaoFecharAlerta = document.createElement("button");
  botaoFecharAlerta.type = "button";
  botaoFecharAlerta.textContent = "×";
  botaoFecharAlerta.classList.add("alert-close");
  botaoFecharAlerta.setAttribute("aria-label", "Fechar aviso");

  // Adiciona evento de clique no botão de fechar para remover o banner do DOM
  botaoFecharAlerta.addEventListener("click", () => {
    bannerAlerta.remove(); // Remove completamente o elemento da página
  });

  // Encaixa os elementos filhos (texto e botão) dentro do container pai (bannerAlerta)
  bannerAlerta.appendChild(textoAlerta);
  bannerAlerta.appendChild(botaoFecharAlerta);

  // Insere o banner pronto bem no topo da seção hero, antes dos demais conteúdos existentes
  secaoDestaqueHero.prepend(bannerAlerta);
}

// Dispara a criação do alerta dinâmico após um atraso assíncrono de 2 segundos (2000ms) na página inicial
if (document.querySelector("#task-form")) {
  setTimeout(() => {
    dispararAlertaDoOceano();
  }, 2000);
}






//FILTRO INTERATIVO 

// Dicionário unificado com créditos e licenças obtidos da Wikimedia Commons
const IMAGE_CREDITS = {
  "Blue whale": {
    image: "imagens/blue-whale.jpg",
    source: "https://wikimedia.org",
    article: "https://wikipedia.org",
    author: "NOAA Photo Library",
    license: "Public domain",
    licenseUrl: null,
    originalFile: "Anim1754_-_Flickr_-_NOAA_Photo_Library.jpg"
  },
  "Humpback whale": {
    image: "imagens/humpback-whale.jpg",
    source: "https://wikimedia.org",
    article: "https://wikipedia.org",
    author: "Juan Cruzado Cortés",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org",
    originalFile: "Humpback_whale_breaching_off_Cabo_San_Lucas.jpg"
  },
  "Killer whale": {
    image: "imagens/killer-whale.jpg",
    source: "https://wikimedia.org",
    article: "https://wikipedia.org",
    author: "Robert Pittman",
    license: "Public domain",
    licenseUrl: null,
    originalFile: "Killerwhales_jumping.jpg"
  },
  "Common bottlenose dolphin": {
    image: "imagens/common-bottlenose-dolphin.jpg",
    source: "https://wikimedia.org",
    article: "https://wikipedia.org",
    author: "NASA",
    license: "Public domain",
    licenseUrl: null,
    originalFile: "Tursiops_truncatus_01-cropped.jpg"
  },
  "Sperm whale": {
    image: "imagens/sperm-whale.jpg",
    source: "https://wikimedia.org",
    article: "https://wikipedia.org",
    author: "Gabriel Barathieu",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org",
    originalFile: "Mother_and_baby_sperm_whale.jpg"
  },
  "Beluga whale": {
    image: "imagens/beluga-whale.jpg",
    source: "https://wikimedia.org",
    article: "https://wikipedia.org",
    author: "Javier Yaya Tur / CIUDAD DE LAS ARTES Y LAS CIENCIAS from Valencia, España",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org",
    originalFile: "Oceanogràfic_29102004.jpg"
  },
  "Narwhal": {
    image: "imagens/narwhal.jpg",
    source: "https://wikimedia.org",
    article: "https://wikipedia.org",
    author: "пресс-служба ПАО \"Газпром нефть\"",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org",
    originalFile: "Нарвал_в_российской_Арктике.jpg"
  },
  "West Indian manatee": {

    image: "imagens/west-indian-manatee.jpg",
    source: "wikimedia.orgcolour_corrected.jpg",
    article: "wikipedia.org",
    author: "Galen Rathbun",
    license: "Public domain",
    licenseUrl: null,
    originalFile: "Manatee_with_calf.PD-colour_corrected.jpg"
  },
  "Dugong": {
    image: "imagens/dugong.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "Gejuni",
    license: "CC BY-SA 3.0 de",
    licenseUrl: "creativecommons.org",
    originalFile: "Dugong.JPG"
  },
  "Sea otter": {
    image: "imagens/sea-otter.jpg",
    source: "wikimedia.org(Enhydra_lutris)(25169790524)crop.jpg",
    article: "wikipedia.org",
    author: "Marshal Hedin from San Diego",
    license: "CC BY-SA 2.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Sea_Otter(Enhydra_lutris)(25169790524)_crop.jpg"
  },
  "California sea lion": {
    image: "imagens/california-sea-lion.jpg",
    source: "wikimedia.org,United_States_imported_from_iNaturalist_photo_203598492.jpg",
    article: "wikipedia.org",
    author: "(c) Jonathan Eisen, some rights reserved (CC BY)",
    license: "CC BY 4.0",
    licenseUrl: "creativecommons.org",
    originalFile: "California_Sea_Lion,Monterey,California,United_States_imported_from_iNaturalist_photo_203598492.jpg"
  },
  "Great white shark": {
    image: "imagens/great-white-shark.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "Pterantula (Terry Goss) at en.wikipedia",
    license: "CC BY 2.5",
    licenseUrl: "creativecommons.org",
    originalFile: "White_shark.jpg"
  },
  "Whale shark": {
    image: "imagens/whale-shark.jpg",
    source: "wikimedia.org-great_whale_shark.jpg",
    article: "wikipedia.org",
    author: "Abe Khao Lak",
    license: "CC BY-SA 4.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Similan_Dive_Center-great_whale_shark.jpg"
  },
  "Hammerhead shark": {
    image: "imagens/hammerhead-shark.jpeg",
    source: "wikimedia.org(226845659).jpeg",
    article: "wikipedia.org",
    author: "Kris Mikael Krister",
    license: "CC BY 3.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Scalloped_Hammerhead_Shark_Sphyrna_Lewini(226845659).jpeg"
  },
  "Giant oceanic manta ray": {
    image: "imagens/giant-oceanic-manta-ray.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "jon hanson from london, UK",
    license: "CC BY-SA 2.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Manta_birostris-Thailand4.jpg"
  },
  "Seahorse": {
    image: "imagens/seahorse.jpg",
    source: "wikimedia.org(on_Ascophyllum_nodosum).jpg",
    article: "wikipedia.org",
    author: "Hans Hillewaert",
    license: "CC BY-SA 4.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Hippocampus_hippocampus(on_Ascophyllum_nodosum).jpg"
  },
  "Ocellaris clownfish": {
    image: "imagens/ocellaris-clownfish.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "Ritiks",
    license: "CC BY-SA 3.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Clown_fish_in_the_Andaman_Coral_Reef.jpg"
  },
  "Red lionfish": {
    image: "imagens/red-lionfish.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "Photo by Jens Petersen , Edited by User:Olegiwit (cloned in part of fins) and Fir0002 (removed spots and noise)",
    license: "CC BY 2.5",
    licenseUrl: "creativecommons.org",
    originalFile: "Pterois_volitans_Manado-e_edit.jpg"
  },
  "Atlantic bluefin tuna": {
    image: "imagens/atlantic-bluefin-tuna.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "Unknown author Unknown author",
    license: "Public domain",
    licenseUrl: null,
    originalFile: "Bluefin-big.jpg"
  },
  "Swordfish": {
    image: "imagens/swordfish.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "Naturalis Biodiversity Center",
    license: "CC0",
    licenseUrl: "creativecommons.org",
    originalFile: "Xiphias_gladius_Linnaeus,1758_2599925021.jpg"
  },
  "Ocean sunfish": {
    image: "imagens/ocean-sunfish.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "U.S. National Oceanic and Atmospheric Administration",
    license: "Public domain",
    licenseUrl: null,
    originalFile: "Mola_mola.jpg"
  },
  "Pufferfish": {
    image: "imagens/pufferfish.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "National Oceanic and Atmospheric Administration",
    license: "Public domain",
    licenseUrl: null,
    originalFile: "Tetraodon-hispidus.jpg"
  },
  "Moray eel": {
    image: "imagens/moray-eel.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "Mstroeck at en.wikipedia",
    license: "CC BY-SA 3.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Moray_eel.jpg"
  },
  "Regal tang": {
    image: "imagens/regal-tang.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "DerHans04",
    license: "CC BY-SA 3.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Paletten-Doktorfisch_Münster.JPG"
  },
  "Parrotfish": {
    image: "imagens/parrotfish.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "Adona9 at English Wikipedia",
    license: "CC BY-SA 3.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Stoplight-parrotfish.jpg"
  },
  "Green sea turtle": {
    image: "imagens/green-sea-turtle.jpg",
    source: "wikimedia.org(Chelonia_mydas)Moorea.jpg",
    article: "wikipedia.org",
    author: "Charles J. Sharp",
    license: "CC BY-SA 4.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Green_sea_turtle(Chelonia_mydas)_Moorea.jpg"
  },
  "Leatherback sea turtle": {
    image: "imagens/leatherback-sea-turtle.jpg",
    source: "wikimedia.org,USVI(5839996547).jpg",
    article: "wikipedia.org",
    author: "U.S. Fish and Wildlife Service Southeast Region",
    license: "Public domain",
    licenseUrl: null,
    originalFile: "Leatherback_sea_turtle_Tinglar,USVI(5839996547).jpg"
  },
  "Loggerhead sea turtle": {
    image: "imagens/loggerhead-sea-turtle.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "ukanda",
    license: "CC BY 2.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Loggerhead_sea_turtle.jpg"
  },
  "Hawksbill sea turtle": {
    image: "imagens/hawksbill-sea-turtle.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "Thierry Caro",
    license: "CC BY-SA 3.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Eretmochelys-imbricata-Kélonia-2.JPG"
  },
  "Olive ridley sea turtle": {
    image: "imagens/olive-ridley-sea-turtle.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "Thierry Caro",
    license: "CC BY-SA 3.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Lepidochelys-olivacea-Kélonia-1.JPG"
  },
  "Common octopus": {
    image: "imagens/common-octopus.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "albert kok",
    license: "CC BY-SA 3.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Octopus2.jpg"
  },
  "Giant squid": {
    image: "imagens/giant-squid.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "NTNU Vitenskapsmuseet",
    license: "CC BY 2.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Giant_squid_Ranheim.jpg"
  },
  "Common cuttlefish": {
    image: "imagens/common-cuttlefish.jpg",
    source: "wikimedia.org,Parque_natural_de_la_Arr%C3%A1bida,Portugal,2020-07-21,DD_62.jpg",
    article: "wikipedia.org",
    author: "Diego Delso",
    license: "CC BY-SA 4.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Sepia_común(Sepia_officinalis),Parque_natural_de_la_Arrábida,Portugal,2020-07-21,DD_62.jpg"
  },
  "Moon jellyfish": {
    image: "imagens/moon-jellyfish.jpg",
    source: "wikimedia.org(Cnidaria)Luc_Viatour.jpg",
    article: "wikipedia.org",
    author: "Luc Viatour",
    license: "CC BY-SA 3.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Aurelia_aurita(Cnidaria)Luc_Viatour.jpg"
  },
  "Portuguese man o war": {
    image: "imagens/portuguese-man-o-war.jpg",
    source: "wikimedia.org(Physalia_physalis).jpg",
    article: "wikipedia.org",
    author: "Image courtesy of Islands in the Sea 2002, NOAA/OER.",
    license: "Public domain",
    licenseUrl: null,
    originalFile: "Portuguese_Man-O-War(Physalia_physalis).jpg"
  },
  "Starfish": {
    image: "imagens/starfish.png",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "Top left: Klaus Rassinger (Museum Wiesbaden) Top right: Katie Ahlfeld Bottom right: Jon Zander (Digon3) Bottom left: Espen Rekdal",
    license: "CC BY-SA 4.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Starfish_montage.png"
  },
  "Sea urchin": {
    image: "imagens/sea-urchin.jpg",
    source: "wikimedia.org(West_Indian_Sea_Egg-top)and_Echinometra_viridis(Reef_Urchin-bottom).jpg",
    article: "wikipedia.org",
    author: "Nhobgood ( talk ) Nick Hobgood",
    license: "CC BY-SA 3.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Tripneustes_ventricosus(West_Indian_Sea_Egg-top)and_Echinometra_viridis(Reef_Urchin-bottom).jpg"
  },
  "Sea cucumber": {
    image: "imagens/sea-cucumber.png",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "Diego Delso / Diego Delso",
    license: "CC BY-SA 4.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Holothuroidea_orders_collage.png"
  },
  "Japanese spider crab": {
    image: "imagens/japanese-spider-crab.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "Lycaon (Hans Hillewaert)",
    license: "CC BY 2.5",
    licenseUrl: "creativecommons.org",
    originalFile: "Macrocheira_kaempferi.jpg"
  },
  "American lobster": {
    image: "imagens/american-lobster.jpg",
    source: "wikimedia.org-Flickr-NOAA_Photo_Library.jpg",
    article: "wikipedia.org",
    author: "OAR/National Undersea Research Program (NURP).",
    license: "Public domain",
    licenseUrl: null,
    originalFile: "Nur01521-Flickr-NOAA_Photo_Library.jpg"
  },
  "Cleaner shrimp": {
    image: "imagens/cleaner-shrimp.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "Brocken Inaglory . Original uploader was Brocken Inaglory",
    license: "CC BY-SA 3.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Lysmata_amboinensis_cleans_mouth_of_a_Moray_eel.jpg"
  },
  "Chambered nautilus": {
    image: "imagens/chambered-nautilus.jpg",
    source: "wikimedia.org(detail).jpg",
    article: "wikipedia.org",
    author: "Hans Hillewaert",
    license: "CC BY-SA 4.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Nautilus_pompilius(detail).jpg"
  },
  "Giant clam": {
    image: "imagens/giant-clam.jpg",
    source: "wikimedia.org(Tridacna_gigas)Michaelmas_Cay.jpg",
    article: "wikipedia.org",
    author: "Charles J. Sharp",
    license: "CC BY-SA 4.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Giant_clam(Tridacna_gigas)Michaelmas_Cay.jpg"
  },
  "Brain coral": {
    image: "imagens/brain-coral.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "NPS - Larry Basch",
    license: "Public domain",
    licenseUrl: null,
    originalFile: "Favites_abdita.jpg"
  },
  "Sea anemone": {
    image: "imagens/sea-anemone.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "Giacomo Merculiano",
    license: "Public domain",
    licenseUrl: null,
    originalFile: "Actiniaria.jpg"
  },
  "Spanish dancer": {
    image: "imagens/spanish-dancer.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "Pritska ( talk ) ( Uploads )",
    license: "Public domain",
    licenseUrl: null,
    originalFile: "Spanish_dancer_Dahab.jpg"
  },
  "Horseshoe crab": {
    image: "imagens/horseshoe-crab.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "Shubham Chatterjee",
    license: "CC BY-SA 3.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Tachypleus_gigas.JPG"
  },
  "Emperor penguin": {
    image: "imagens/emperor-penguin.jpg",
    source: "wikimedia.org-Snow_Hill_Island,Antarctica-adults_and_juvenile-8.jpg",
    article: "wikipedia.org",
    author: "Ian Duffy from UK",
    license: "CC BY 2.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Aptenodytes_forsteri_-Snow_Hill_Island,Antarctica-adults_and_juvenile-8.jpg"
  },
  "Wandering albatross": {
    image: "imagens/wandering-albatross.jpg",
    source: "wikimedia.orgSE_Tasmania.jpg",
    article: "wikipedia.org",
    author: "JJ Harrison ( jjharrison.com.au )",
    license: "CC BY-SA 3.0",
    licenseUrl: "creativecommons.org",
    originalFile: "Diomedea_exulans-_SE_Tasmania.jpg"
  },
  "Blue-footed booby": {
    image: "imagens/blue-footed-booby.jpg",
    source: "wikimedia.org",
    article: "wikipedia.org",
    author: "Benjamint444",
    license: "GFDL 1.2",
    licenseUrl: "gnu.org",
    originalFile: "Blue-footed-booby.jpg"
  }
};

// espécies marinhas

const animais = [
  {
    nome: "Baleia azul", cientifico: "Balaenoptera musculus", grupo: "mamiferos", wikiTitle: "Blue whale",
    descricao: "É o maior animal conhecido do planeta. Apesar do tamanho, alimenta-se principalmente de pequenos crustáceos chamados krill.",
    habitat: "Oceanos de todo o mundo; migra entre áreas de alimentação e reprodução.",
    dieta: "Principalmente krill."
  },
  {
    nome: "Baleia jubarte", cientifico: "Megaptera novaeangliae", grupo: "mamiferos", wikiTitle: "Humpback whale",
    descricao: "Conhecida por seus saltos e cantos, percorre longas distâncias durante suas migrações anuais.",
    habitat: "Mares e oceanos tropicais, temperados e polares.",
    dieta: "Krill e pequenos peixes."
  },
  {
    nome: "Orca", cientifico: "Orcinus orca", grupo: "mamiferos", wikiTitle: "Killer whale",
    descricao: "É um golfinho de grande porte que vive em grupos familiares e se comunica com vocalizações variadas.",
    habitat: "Oceanos de regiões polares a tropicais.",
    dieta: "Peixes, lulas e outros animais, conforme a população."
  },
  {
    nome: "Golfinho nariz de garrafa", cientifico: "Tursiops truncatus", grupo: "mamiferos", wikiTitle: "Common bottlenose dolphin",
    descricao: "Golfinho sociável e inteligente, capaz de aprender comportamentos e cooperar durante a busca por alimento.",
    habitat: "Águas costeiras e oceânicas de regiões tropicais e temperadas.",
    dieta: "Peixes e lulas."
  },
  {
    nome: "Cachalote", cientifico: "Physeter macrocephalus", grupo: "mamiferos", wikiTitle: "Sperm whale",
    descricao: "Mergulha a grandes profundidades para procurar presas e tem a maior cabeça entre os animais atuais.",
    habitat: "Oceanos profundos em várias regiões do planeta.",
    dieta: "Lulas e peixes de águas profundas."
  },
  {
    nome: "Beluga", cientifico: "Delphinapterus leucas", grupo: "mamiferos", wikiTitle: "Beluga whale",
    descricao: "A coloração clara e a testa arredondada tornam essa baleia do Ártico fácil de reconhecer.",
    habitat: "Águas frias do Ártico e regiões subárticas.",
    dieta: "Peixes, crustáceos e outros invertebrados."
  },
  {
    nome: "Narval", cientifico: "Monodon monoceros", grupo: "mamiferos", wikiTitle: "Narwhal",
    descricao: "O longo dente em espiral, presente sobretudo nos machos, é na verdade um canino alongado.",
    habitat: "Mares frios do Ártico.",
    dieta: "Peixes, lulas e crustáceos."
  },
  {
    nome: "Peixe boi marinho", cientifico: "Trichechus manatus", grupo: "mamiferos", wikiTitle: "West Indian manatee",
    descricao: "Mamífero herbívoro de movimentos tranquilos, que precisa subir à superfície para respirar.",
    habitat: "Águas costeiras rasas, estuários e rios próximos ao mar.",
    dieta: "Plantas aquáticas."
  },
  {
    nome: "Dugongo", cientifico: "Dugong dugon", grupo: "mamiferos", wikiTitle: "Dugong",
    descricao: "Parente do peixe-boi, passa boa parte do tempo pastando em pradarias marinhas.",
    habitat: "Águas costeiras rasas do Indo-Pacífico.",
    dieta: "Ervas marinhas."
  },
  {
    nome: "Lontra marinha", cientifico: "Enhydra lutris", grupo: "mamiferos", wikiTitle: "Sea otter",
    descricao: "Usa ferramentas, como pedras, para abrir algumas presas e ajuda a manter florestas de algas saudáveis.",
    habitat: "Costas frias do Pacífico Norte.",
    dieta: "Moluscos, ouriços-do-mar e crustáceos."
  },
  {
    nome: "Leão marinho da Califórnia", cientifico: "Zalophus californianus", grupo: "mamiferos", wikiTitle: "California sea lion",
    descricao: "Animal social e ágil na água, que costuma descansar em praias e rochedos.",
    habitat: "Costa do Pacífico Norte e ilhas próximas.",
    dieta: "Peixes e lulas."
  },
  {
    nome: "Tubarão branco", cientifico: "Carcharodon carcharias", grupo: "peixes", wikiTitle: "Great white shark",
    descricao: "Grande predador migratório, importante para o equilíbrio das cadeias alimentares marinhas.",
    habitat: "Mares costeiros e oceânicos temperados.",
    dieta: "Peixes e outros animais marinhos."
  },
  {
    nome: "Tubarão baleia", cientifico: "Rhincodon typus", grupo: "peixes", wikiTitle: "Whale shark",
    descricao: "É o maior peixe do mundo, mas se alimenta filtrando pequenos organismos da água.",
    habitat: "Águas tropicais e subtropicais, geralmente próximas à superfície.",
    dieta: "Plâncton, pequenos peixes e crustáceos."
  },
  {
    nome: "Tubarão martelo", cientifico: "Família Sphyrnidae", grupo: "peixes", wikiTitle: "Hammerhead shark",
    descricao: "O formato largo da cabeça é uma característica marcante desse grupo de tubarões.",
    habitat: "Mares tropicais e temperados, perto da costa e em mar aberto.",
    dieta: "Peixes, lulas e crustáceos."
  },
  {
    nome: "Manta gigante", cientifico: "Mobula birostris", grupo: "peixes", wikiTitle: "Giant oceanic manta ray",
    descricao: "A maior raia conhecida nada com movimentos parecidos com o voo e não possui ferrão na cauda.",
    habitat: "Oceanos tropicais e subtropicais.",
    dieta: "Plâncton e pequenos organismos filtrados da água."
  },
  {
    nome: "Cavalo marinho", cientifico: "Gênero Hippocampus", grupo: "peixes", wikiTitle: "Seahorse",
    descricao: "Nada em posição vertical e se prende a plantas marinhas com a cauda preênsil.",
    habitat: "Pradarias marinhas, manguezais e recifes rasos.",
    dieta: "Pequenos crustáceos."
  },
  {
    nome: "Peixe palhaço", cientifico: "Amphiprion ocellaris", grupo: "peixes", wikiTitle: "Ocellaris clownfish",
    descricao: "Vive em associação com anêmonas, cuja proteção ajuda a afastar alguns predadores.",
    habitat: "Recifes de coral do Indo-Pacífico.",
    dieta: "Pequenos invertebrados e algas."
  },
  {
    nome: "Peixe leão", cientifico: "Pterois volitans", grupo: "peixes", wikiTitle: "Red lionfish",
    descricao: "Tem nadadeiras vistosas com espinhos venenosos e é um predador de emboscada.",
    habitat: "Recifes e áreas rochosas do Indo-Pacífico; também invasor em outras regiões.",
    dieta: "Peixes pequenos e crustáceos."
  },
  {
    nome: "Atum rabilho do Atlântico", cientifico: "Thunnus thynnus", grupo: "peixes", wikiTitle: "Atlantic bluefin tuna",
    descricao: "Peixe veloz e migratório, capaz de manter a temperatura corporal acima da água ao redor.",
    habitat: "Oceano Atlântico e mares adjacentes.",
    dieta: "Peixes, lulas e crustáceos."
  },
  {
    nome: "Peixe espada", cientifico: "Xiphias gladius", grupo: "peixes", wikiTitle: "Swordfish",
    descricao: "Seu longo bico achatado ajuda a identificar esse peixe de águas abertas.",
    habitat: "Oceanos tropicais e temperados.",
    dieta: "Peixes e lulas."
  },
  {
    nome: "Peixe lua", cientifico: "Mola mola", grupo: "peixes", wikiTitle: "Ocean sunfish",
    descricao: "Tem corpo alto e achatado e costuma ser visto próximo à superfície tomando sol.",
    habitat: "Oceanos temperados e tropicais.",
    dieta: "Águas-vivas e outros animais gelatinosos."
  },
  {
    nome: "Peixe balão", cientifico: "Família Tetraodontidae", grupo: "peixes", wikiTitle: "Pufferfish",
    descricao: "Algumas espécies inflam o corpo como defesa. Muitas contêm toxinas e não devem ser tocadas ou consumidas sem preparo especializado.",
    habitat: "Mares tropicais e temperados; algumas espécies vivem em água salobra.",
    dieta: "Moluscos, crustáceos e outros pequenos animais."
  },
  {
    nome: "Moreia", cientifico: "Família Muraenidae", grupo: "peixes", wikiTitle: "Moray eel",
    descricao: "Peixe de corpo alongado que costuma se abrigar em fendas de recifes.",
    habitat: "Recifes, costas rochosas e lagoas tropicais.",
    dieta: "Peixes, crustáceos e polvos."
  },
  {
    nome: "Cirurgião patela", cientifico: "Paracanthurus hepatus", grupo: "peixes", wikiTitle: "Regal tang",
    descricao: "O corpo azul e a cauda amarela tornam esse peixe dos recifes muito reconhecível.",
    habitat: "Recifes de coral do Indo-Pacífico.",
    dieta: "Principalmente algas."
  },
  {
    nome: "Peixe papagaio", cientifico: "Família Scaridae", grupo: "peixes", wikiTitle: "Parrotfish",
    descricao: "Os dentes unidos lembram um bico; ao raspar algas, algumas espécies também contribuem para a formação de areia.",
    habitat: "Recifes tropicais.",
    dieta: "Algas e organismos que vivem sobre o recife."
  },
  {
    nome: "Tartaruga verde", cientifico: "Chelonia mydas", grupo: "repteis", wikiTitle: "Green sea turtle",
    descricao: "Quando adulta, alimenta-se principalmente de plantas marinhas e algas.",
    habitat: "Mares tropicais e subtropicais; desova em praias arenosas.",
    dieta: "Ervas marinhas e algas, sobretudo na fase adulta."
  },
  {
    nome: "Tartaruga de couro", cientifico: "Dermochelys coriacea", grupo: "repteis", wikiTitle: "Leatherback sea turtle",
    descricao: "É a maior tartaruga marinha e seu casco tem uma textura flexível, sem placas rígidas como o de outras espécies.",
    habitat: "Oceanos tropicais e temperados, em longas migrações.",
    dieta: "Principalmente águas-vivas e outros animais gelatinosos."
  },
  {
    nome: "Tartaruga cabeçuda", cientifico: "Caretta caretta", grupo: "repteis", wikiTitle: "Loggerhead sea turtle",
    descricao: "Sua cabeça grande e mandíbulas fortes ajudam a quebrar presas de casca dura.",
    habitat: "Oceanos temperados e subtropicais; usa praias para desovar.",
    dieta: "Crustáceos, moluscos e outros invertebrados."
  },
  {
    nome: "Tartaruga de pente", cientifico: "Eretmochelys imbricata", grupo: "repteis", wikiTitle: "Hawksbill sea turtle",
    descricao: "O bico estreito permite alcançar alimento em frestas de recifes; é uma espécie ameaçada.",
    habitat: "Recifes tropicais e praias de desova.",
    dieta: "Esponjas e outros invertebrados."
  },
  {
    nome: "Tartaruga oliva", cientifico: "Lepidochelys olivacea", grupo: "repteis", wikiTitle: "Olive ridley sea turtle",
    descricao: "É uma tartaruga marinha de porte menor que pode formar grandes grupos durante a desova.",
    habitat: "Oceanos tropicais e subtropicais.",
    dieta: "Crustáceos, moluscos, peixes e algas."
  },
  {
    nome: "Polvo comum", cientifico: "Octopus vulgaris", grupo: "invertebrados", wikiTitle: "Common octopus",
    descricao: "Tem oito braços, consegue mudar de cor e textura e é conhecido por sua capacidade de resolver problemas.",
    habitat: "Recifes e fundos rochosos de mares temperados e tropicais.",
    dieta: "Crustáceos, moluscos e pequenos peixes."
  },
  {
    nome: "Lula gigante", cientifico: "Architeuthis dux", grupo: "invertebrados", wikiTitle: "Giant squid",
    descricao: "Habitante de águas profundas, tem olhos enormes que ajudam a captar luz em ambientes escuros.",
    habitat: "Águas profundas de vários oceanos.",
    dieta: "Peixes e outras lulas."
  },
  {
    nome: "Siba", cientifico: "Sepia officinalis", grupo: "invertebrados", wikiTitle: "Common cuttlefish",
    descricao: "Parente das lulas e dos polvos, usa mudanças de cor para se camuflar e se comunicar.",
    habitat: "Fundos arenosos e pradarias marinhas costeiras.",
    dieta: "Crustáceos, moluscos e peixes pequenos."
  },
  {
    nome: "Água viva lua", cientifico: "Aurelia aurita", grupo: "invertebrados", wikiTitle: "Moon jellyfish",
    descricao: "É uma água-viva transparente com marcas circulares visíveis no centro do corpo.",
    habitat: "Costas e águas abertas de diversas regiões.",
    dieta: "Plâncton e pequenos organismos."
  },
  {
    nome: "Caravela portuguesa", cientifico: "Physalia physalis", grupo: "invertebrados", wikiTitle: "Portuguese man o war",
    descricao: "Não é uma água-viva: é uma colônia de organismos especializados. Seus tentáculos podem causar queimaduras dolorosas.",
    habitat: "Superfície de mares tropicais e subtropicais.",
    dieta: "Pequenos peixes e plâncton."
  },
  {
    nome: "Estrela do mar", cientifico: "Classe Asteroidea", grupo: "invertebrados", wikiTitle: "Starfish",
    descricao: "É um equinodermo com braços que muitas vezes consegue regenerar partes do corpo.",
    habitat: "Fundos marinhos, de poças costeiras a grandes profundidades.",
    dieta: "Moluscos e outros pequenos animais, conforme a espécie."
  },
  {
    nome: "Ouriço do mar", cientifico: "Classe Echinoidea", grupo: "invertebrados", wikiTitle: "Sea urchin",
    descricao: "Seus espinhos ajudam na defesa e na locomoção pelo fundo do mar.",
    habitat: "Fundos rochosos, recifes e pradarias marinhas.",
    dieta: "Algas e matéria orgânica."
  },
  {
    nome: "Pepino do mar", cientifico: "Classe Holothuroidea", grupo: "invertebrados", wikiTitle: "Sea cucumber",
    descricao: "Ajuda a reciclar nutrientes ao consumir sedimentos e matéria orgânica no fundo marinho.",
    habitat: "Fundos oceânicos de regiões tropicais a polares.",
    dieta: "Partículas orgânicas presentes no sedimento."
  },
  {
    nome: "Caranguejo aranha japonês", cientifico: "Macrocheira kaempferi", grupo: "invertebrados", wikiTitle: "Japanese spider crab",
    descricao: "Tem pernas muito longas e vive em águas profundas próximas ao Japão.",
    habitat: "Fundos marinhos do Pacífico, perto do Japão.",
    dieta: "Animais mortos e pequenos invertebrados."
  },
  {
    nome: "Lagosta americana", cientifico: "Homarus americanus", grupo: "invertebrados", wikiTitle: "American lobster",
    descricao: "Crustáceo de grande porte que usa as pinças para capturar alimento e se defender.",
    habitat: "Fundos rochosos do Atlântico Norte.",
    dieta: "Moluscos, peixes e outros invertebrados."
  },
  {
    nome: "Camarão limpador", cientifico: "Lysmata amboinensis", grupo: "invertebrados", wikiTitle: "Cleaner shrimp",
    descricao: "Remove parasitas e restos de alimento de peixes que visitam seus locais de limpeza.",
    habitat: "Fendas e recifes tropicais do Indo-Pacífico.",
    dieta: "Parasitas, restos e pequenos organismos."
  },
  {
    nome: "Náutilo", cientifico: "Nautilus pompilius", grupo: "invertebrados", wikiTitle: "Chambered nautilus",
    descricao: "Molusco de concha espiral com câmaras que ajudam a controlar sua flutuação.",
    habitat: "Águas profundas de recifes do Indo-Pacífico.",
    dieta: "Pequenos animais e matéria orgânica."
  },
  {
    nome: "Amêijoa gigante", cientifico: "Tridacna gigas", grupo: "invertebrados", wikiTitle: "Giant clam",
    descricao: "Essa grande amêijoa vive em parceria com algas microscópicas que ajudam a produzir alimento.",
    habitat: "Recifes de coral do Indo-Pacífico.",
    dieta: "Nutrientes filtrados da água e produtos de algas simbiontes."
  },
  {
    nome: "Coral cérebro", cientifico: "Família Mussidae", grupo: "invertebrados", wikiTitle: "Brain coral",
    descricao: "Colônia de pequenos animais cujo esqueleto calcário forma padrões que lembram um cérebro.",
    habitat: "Recifes tropicais rasos.",
    dieta: "Plâncton e nutrientes produzidos por algas simbiontes."
  },
  {
    nome: "Anêmona do mar", cientifico: "Ordem Actiniaria", grupo: "invertebrados", wikiTitle: "Sea anemone",
    descricao: "Parente dos corais e das águas-vivas, captura alimento com tentáculos urticantes.",
    habitat: "Costas rochosas e recifes, em diferentes profundidades.",
    dieta: "Pequenos peixes e invertebrados."
  },
  {
    nome: "Dançarina espanhola", cientifico: "Hexabranchus sanguineus", grupo: "invertebrados", wikiTitle: "Spanish dancer",
    descricao: "Nudibrânquio colorido que ondula o corpo ao nadar, parecendo uma dança.",
    habitat: "Recifes tropicais do Indo-Pacífico.",
    dieta: "Esponjas marinhas."
  },
  {
    nome: "Caranguejo ferradura", cientifico: "Família Limulidae", grupo: "invertebrados", wikiTitle: "Horseshoe crab",
    descricao: "Apesar do nome e da aparência, é mais próximo das aranhas do que dos caranguejos verdadeiros.",
    habitat: "Fundos costeiros rasos e praias arenosas.",
    dieta: "Pequenos invertebrados e matéria orgânica do fundo."
  },
  {
    nome: "Pinguim imperador", cientifico: "Aptenodytes forsteri", grupo: "aves", wikiTitle: "Emperor penguin",
    descricao: "A maior espécie de pinguim suporta o frio antártico e mergulha para procurar alimento.",
    habitat: "Gelo e águas costeiras da Antártida.",
    dieta: "Peixes, krill e lulas."
  },
  {
    nome: "Albatroz errante", cientifico: "Diomedea exulans", grupo: "aves", wikiTitle: "Wandering albatross",
    descricao: "Sua enorme envergadura permite planar por longos períodos sobre o oceano.",
    habitat: "Oceanos do Hemisfério Sul; nidifica em ilhas remotas.",
    dieta: "Lulas, peixes e crustáceos."
  },
  {
    nome: "Atobá de pés azuis", cientifico: "Sula nebouxii", grupo: "aves", wikiTitle: "Blue-footed booby",
    descricao: "Ave marinha reconhecida pelos pés azuis, que também participam de sua exibição de corte.",
    habitat: "Ilhas e costas do Pacífico tropical oriental.",
    dieta: "Peixes pequenos e lulas."
  }
];
// Dicionário para traduzir as chaves internas dos grupos em títulos formatados
const nomesDosGrupos = {
  mamiferos: "Mamíferos",
  peixes: "Peixes",
  repteis: "Répteis",
  invertebrados: "Invertebrados",
  aves: "Aves marinhas"
};
// Seleciona a grade onde os cards serão inseridos, o campo de busca e o contador
const grade = document.querySelector("#animal-grid");
const inputCampoBusca = document.querySelector("#search-input");
const contador = document.querySelector("#result-count");
const botoesFiltro = document.querySelectorAll(".filter-button");
const dialogo = document.querySelector("#animal-dialog");
let filtroAtual = "todos";
let animaisVisiveis = [];
// Função utilitária que remove acentos e padroniza o texto em letras minúsculas
function normalizarTexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
// Cria os elementos HTML de cada card no DOM e conecta o evento de clique para abrir a ficha
function criarCartao(animal) {
  const creditos = IMAGE_CREDITS[animal.wikiTitle];
  const cartao = document.createElement("button");
  cartao.type = "button";
  cartao.className = "animal-card";
  cartao.setAttribute("aria-label", "Conheça " + animal.nome);
  const arte = document.createElement("span");
  arte.className = "card-art";
  const imagem = document.createElement("img");
  imagem.className = "animal-photo";
  imagem.src = creditos.image;
  imagem.alt = "Fotografia de " + animal.nome;
  imagem.loading = "lazy";
  imagem.decoding = "async";
  arte.append(imagem);
  const conteudo = document.createElement("span");
  conteudo.className = "card-content";
  const meta = document.createElement("span");
  meta.className = "card-meta";
  const grupo = document.createElement("span");
  grupo.className = "category-label";
  grupo.textContent = nomesDosGrupos[animal.grupo];
  meta.append(grupo);
  const nome = document.createElement("span");
  nome.className = "animal-card-title";
  nome.textContent = animal.nome;
  const resumo = document.createElement("span");
  resumo.className = "animal-card-description";
  resumo.textContent = animal.descricao;
  conteudo.append(meta, nome, resumo);
  cartao.append(arte, conteudo);
  cartao.addEventListener("click", () => abrirFicha(animal));
  return cartao;
}
// Filtra o array de animais conforme a categoria e o termo pesquisado em tempo real
function atualizarCatalogo() {
  if (!grade) {
    return;
  }
  // Converte o texto digitado para letras minúsculas sem acentos e remove espaços excedentes
  const termoPesquisado = normalizarTexto(inputCampoBusca.value.trim());
  animaisVisiveis = animais.filter((animal) => {
    const grupoCombina = filtroAtual === "todos" || animal.grupo === filtroAtual;
    const conteudoTextoAnimal = normalizarTexto(
      animal.nome + " " + animal.cientifico + " " + animal.descricao + " " + animal.habitat + " " + animal.dieta
    );
    return grupoCombina && conteudoTextoAnimal.includes(termoPesquisado);
  });
  // Substitui os cards na grade pelos resultados filtrados
  grade.replaceChildren(...animaisVisiveis.map(criarCartao));
  contador.textContent = animaisVisiveis.length + (animaisVisiveis.length === 1 ? " espécie encontrada" : " espécies encontradas");
  // Gerencia a exibição da mensagem caso nenhum animal seja encontrado na busca
  if (animaisVisiveis.length === 0) {
    const avisoNenhumResultado = document.createElement("p");
    avisoNenhumResultado.className = "empty-state";
    avisoNenhumResultado.textContent = "Nenhuma espécie encontrada. Experimente outro nome ou grupo.";
    grade.append(avisoNenhumResultado);
  }
}
// Preenche a janela modal () com os detalhes da espécie e os créditos da fotografia
function abrirFicha(animal) {
  if (!dialogo) {
    return;
  }
  const creditos = IMAGE_CREDITS[animal.wikiTitle];
  document.querySelector("#dialog-image").src = creditos.image;
  document.querySelector("#dialog-image").alt = "Fotografia de " + animal.nome;
  document.querySelector("#dialog-categoria").textContent = nomesDosGrupos[animal.grupo];
  document.querySelector("#dialog-nome").textContent = animal.nome;
  document.querySelector("#dialog-cientifico").textContent = animal.cientifico;
  document.querySelector("#dialog-descricao").textContent = animal.descricao;
  document.querySelector("#dialog-habitat").textContent = animal.habitat;
  document.querySelector("#dialog-dieta").textContent = animal.dieta;
  const credito = document.querySelector("#dialog-credit");
  credito.replaceChildren();
  const autor = creditos.author || "Autor indicado na página do arquivo";
  const licenca = creditos.license || "Consulte a licença na página do arquivo";
  credito.append(document.createTextNode("Imagem: " + autor + ". Licença: " + licenca + ". "));
  const linkFonte = document.createElement("a");
  linkFonte.href = creditos.source;
  linkFonte.target = "_blank";
  linkFonte.rel = "noopener noreferrer";
  linkFonte.textContent = "Ver arquivo e atribuição";
  credito.append(linkFonte);
  if (creditos.licenseUrl) {
    const linkLicenca = document.createElement("a");
    linkLicenca.href = creditos.licenseUrl;
    linkLicenca.target = "_blank";
    linkLicenca.rel = "noopener noreferrer";
    linkLicenca.textContent = "Consultar licença";
    credito.append(document.createTextNode(" · "), linkLicenca);
  }
  dialogo.showModal();
}
// Inicializa os eventos de filtro, busca por digitação ('input') e sorteio na página Explore
if (grade) {
  atualizarCatalogo();
  // Itera por cada botão de filtro usando .forEach()
  botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
      filtroAtual = botao.dataset.filter;
      botoesFiltro.forEach((outroBotao) => {
        outroBotao.setAttribute("aria-pressed", String(outroBotao === botao));
      });
      atualizarCatalogo();
    });
  });
  // Adiciona o ouvinte de evento 'input', disparado instantaneamente a cada tecla digitada
  inputCampoBusca.addEventListener("input", atualizarCatalogo);
  const botaoSorteio = document.querySelector("#surprise-button");
  if (botaoSorteio) {
    botaoSorteio.addEventListener("click", () => {
      if (animaisVisiveis.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * animaisVisiveis.length);
        abrirFicha(animaisVisiveis[indiceAleatorio]);
      }
    });
  }
}
// Evento para fechar o modal ao clicar no botão de fechar (X) ou no fundo externo
const botaoFecharModal = document.querySelector("#dialog-close");
if (botaoFecharModal && dialogo) {
  botaoFecharModal.addEventListener("click", () => dialogo.close());
  dialogo.addEventListener("click", (evento) => {
    if (evento.target === dialogo) {
      dialogo.close();
    }
  });
}








//GERENCIADOR DE TAREFAS 

// Seleciona o formulário de inclusão de novas atitudes de cuidado com o oceano
const formTarefa = document.querySelector("#task-form");
// Seleciona o input de texto onde o nome da atitude é digitado
const inputTarefa = document.querySelector("#task-input");
// Seleciona a lista não ordenada  onde os itens serão renderizados
const elementoListaTarefas = document.querySelector("#action-list");
// Seleciona a área de status acessível para feedback de leitura e gravação
const statusTarefa = document.querySelector("#task-status");
const chaveTarefas = "mare-tarefas";
// Recupera os compromissos salvos no localStorage convertendo a string JSON em array JavaScript
let listaTarefas = [];
if (elementoListaTarefas) {
  try {
    const tarefasSalvas = JSON.parse(localStorage.getItem(chaveTarefas) || "[]");
    if (Array.isArray(tarefasSalvas)) {
      listaTarefas = tarefasSalvas.filter(
        (tarefa) => tarefa && typeof tarefa.texto === "string" && typeof tarefa.concluida === "boolean"
      );
    } else {
      throw new TypeError("Os dados salvos não são uma lista válida.");
    }
  } catch (erroDeLeitura) {
    console.error("Não foi possível ler os compromissos salvos.", erroDeLeitura);
    statusTarefa.textContent = "Não foi possível ler a lista salva. Você pode criar novos compromissos.";
  }
}
// Função auxiliar para sincronizar dados no localStorage e atualizar a interface gráfica
function persistirAtualizarInterfaceTarefas() {
  let salvouNoNavegador = true;
  try {
    localStorage.setItem(chaveTarefas, JSON.stringify(listaTarefas));
  } catch (erroDeArmazenamento) {
    console.error("Não foi possível salvar os compromissos neste navegador.", erroDeArmazenamento);
    salvouNoNavegador = false;
  }
  renderizarListaDeTarefas();
  return salvouNoNavegador;
}
// Função responsável por desenhar dinamicamente os itens da lista de compromissos no DOM
function renderizarListaDeTarefas() {
  if (!elementoListaTarefas) {
    return;
  }
  // Limpa a lista para evitar duplicações antes de redesenhar
  elementoListaTarefas.replaceChildren();
  // Itera pelo array utilizando o método .forEach() com índice
  listaTarefas.forEach((tarefa, indice) => {
    // Cria um elemento  para cada compromisso na memória
    const itemListaLi = document.createElement("li");
    itemListaLi.classList.add("action-item");
    // Aplica classe condicional se a atitude estiver marcada como concluída
    if (tarefa.concluida) {
      itemListaLi.classList.add("is-done");
    }
    // Cria o checkbox acessível para alternar o status de conclusão (true/false)
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarefa.concluida;
    checkbox.setAttribute("aria-label", "Marcar como concluído: " + tarefa.texto);
    checkbox.addEventListener("change", () => {
      listaTarefas[indice].concluida = checkbox.checked;
      persistirAtualizarInterfaceTarefas();
    });
    // Cria um elemento  para armazenar o texto da atitude
    const textoItem = document.createElement("span");
    textoItem.textContent = tarefa.texto;
    // Cria um botão de exclusão individual para o item
    const botaoRemover = document.createElement("button");
    botaoRemover.type = "button";
    botaoRemover.textContent = "Remover";
    botaoRemover.classList.add("action-remove");
    botaoRemover.setAttribute("aria-label", "Remover compromisso: " + tarefa.texto);
    // Adiciona evento de clique para remover o item específico do array utilizando .splice()
    botaoRemover.addEventListener("click", () => {
      listaTarefas.splice(indice, 1); // Remove 1 elemento a partir do índice informado
      persistirAtualizarInterfaceTarefas();
      statusTarefa.textContent = "Compromisso removido da lista.";
    });
    // Constrói a estrutura do item encaixando checkbox, span e botão dentro da 
    itemListaLi.appendChild(checkbox);
    itemListaLi.appendChild(textoItem);
    itemListaLi.appendChild(botaoRemover);
    // Insere a  completa na lista principal  exibida na página
    elementoListaTarefas.appendChild(itemListaLi);
  });
  if (listaTarefas.length === 0 && statusTarefa && !statusTarefa.textContent) {
    statusTarefa.textContent = "Sua lista está vazia. Que tal começar com uma atitude simples?";
  }
}
// Adiciona o ouvinte de evento para submeter o formulário e adicionar novos compromissos
if (formTarefa && inputTarefa) {
  formTarefa.addEventListener("submit", (evento) => {
    evento.preventDefault(); // Evita recarregamento da página
    const textoTarefa = inputTarefa.value.trim();
    // Valida se o texto não está vazio antes de inserir no array
    if (textoTarefa !== "") {
      // Adiciona um novo objeto ao array usando o método .push()
      listaTarefas.push({
        texto: textoTarefa,
        concluida: false
      });
      inputTarefa.value = ""; // Limpa o campo input após o envio
      const foiSalva = persistirAtualizarInterfaceTarefas(); // Atualiza armazenamento e tela
      statusTarefa.textContent = foiSalva
        ? "Atitude adicionada e salva neste navegador."
        : "Atitude adicionada nesta sessão, mas não foi possível salvar no navegador.";
    } else {
      statusTarefa.textContent = "Escreva uma atitude antes de adicionar à lista.";
      inputTarefa.focus();
    }
  });
}
// Executa a renderização inicial assim que o script é carregado pelo navegador
renderizarListaDeTarefas();










//SIMULADOR DE IA

// Seleciona o botão que aciona o Oráculo do Oceano
const botaoGerarRecomendacaoIA = document.querySelector("#btn-gerar-ia");
// Seleciona o container em bloco responsável por mostrar o resultado gerado
const containerResultadoIA = document.querySelector("#resultado-ia-box");
// Seleciona o parágrafo onde a dica sorteada será injetada
const textoSaidaGeradoIA = document.querySelector("#texto-saida-ia");
// Array estático contendo dicas práticas de preservação marinha em português
const bancoDeDicasEmPortugues = [
  "Prefira uma garrafa reutilizável e evite plásticos descartáveis sempre que puder.",
  "Na praia, leve seu lixo com você e descarte-o em uma lixeira adequada.",
  "Observe animais marinhos de longe: não toque, persiga ou alimente a vida silvestre.",
  "Ao visitar um recife, não toque nem pise nos corais.",
  "Economize água em casa e não descarte óleo ou produtos químicos no ralo.",
  "Compartilhe informações confiáveis sobre a conservação dos oceanos."
];
// Adiciona o ouvinte de eventos de clique utilizando a palavra-chave async
if (botaoGerarRecomendacaoIA && containerResultadoIA && textoSaidaGeradoIA) {
  botaoGerarRecomendacaoIA.addEventListener("click", async () => {
    const textoOriginalDoBotao = botaoGerarRecomendacaoIA.textContent;
    // Desativa temporariamente o botão e altera o texto para indicar processamento
    botaoGerarRecomendacaoIA.disabled = true;
    botaoGerarRecomendacaoIA.textContent = "O oráculo está pensando...";
    containerResultadoIA.hidden = false; // Torna a caixa de resultado visível
    textoSaidaGeradoIA.textContent = "Aguarde uma dica para cuidar do mar...";
    try {
      // Utiliza await junto com setTimeout envolvido em Promise para simular tempo de resposta
      await new Promise((resolverPromessa) => setTimeout(resolverPromessa, 1500));
      // Sorteia aleatoriamente um índice numérico baseado no tamanho total do array
      const indiceAleatorioSorteado = Math.floor(Math.random() * bancoDeDicasEmPortugues.length);
      // Injeta a dica sorteada no parágrafo de saída da interface
      textoSaidaGeradoIA.textContent = bancoDeDicasEmPortugues[indiceAleatorioSorteado];
    } catch (erroDeExecucao) {
      // Bloco de captura de exceções em caso de falhas imprevistas na operação assíncrona
      console.error("Não foi possível gerar uma dica.", erroDeExecucao);
      textoSaidaGeradoIA.textContent = "Não foi possível gerar uma dica agora. Tente novamente.";
    } finally {
      // O bloco finally é executado independentemente de sucesso ou erro, restaurando o botão
      botaoGerarRecomendacaoIA.disabled = false;
      botaoGerarRecomendacaoIA.textContent = textoOriginalDoBotao;
    }
  });
}