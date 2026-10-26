# Documento de Escopo — Novo Site do Museu da Música – Itu

**Projeto:** Projeto Integrador 2
**Entidade:** Museu da Música – Itu (mantido pelo Instituto Cultural de Itu)
**Entrega documentada neste escopo:** Tela Home (com menu de navegação integrado), Tela Tour Virtual e preparação para publicação no GitHub Pages
**Stack:** HTML5 + Bootstrap 5 + CSS customizado (responsivo)
**Referência oficial:** https://www.museudamusicaitu.com.br/
**Versão:** 2.1

---

## 1. Identificação do projeto

O Museu da Música – Itu foi criado em 14 de dezembro de 2007 e é mantido pelo Instituto Cultural de Itu, associação cultural sem fins lucrativos fundada em 2 de fevereiro de 1999. É uma instituição de guarda e pesquisa de referenciais sobre a produção e a reprodução da música em Itu, registrada no IBRAM e no Sistema Estadual de Museus. Sua sede funciona na Rua Floriano Peixoto, 480, Itu/SP, em uma casa construída em 1890 pelo comerciante português Manoel Joaquim da Silva, tombada pelo CONDEPHAAT como patrimônio material do Estado de São Paulo e que, desde 1949, abrigou a família do músico italiano Luís de Francisco.

O museu abre aos domingos, das 9h às 13h, com entrada franca, e oferece horários especiais para escolas e universidades mediante agendamento. O contato institucional é feito pelo e-mail museudamusica@itu.com.br.

Este documento especifica **duas telas** a serem construídas nesta etapa do Projeto Integrador 2: a **Home**, porta de entrada do site e concentradora da navegação principal, e a **Tour Virtual**, que apresenta o museu em formato remoto. As demais telas previstas na arquitetura (Exposições, Música, Seja Voluntário, Agendar Visita, Parcerias e Redes Sociais) são citadas apenas como destino dos links do menu e não são detalhadas nem implementadas nesta entrega.

---

## 2. Referência oficial e posicionamento do novo site

O site atual do museu (museudamusicaitu.com.br) é a principal referência de conteúdo e de identidade visual deste projeto. Ele reúne o acervo institucional, a história da música em Itu, as mostras de longa duração, publicações, boletins, artigos e a galeria de imagens, além de uma seção "Para Ouvir" com gravações históricas do acervo musical ituano.

O novo site não substitui esse acervo documental: ele se posiciona como uma **camada de experiência e conversão** sobre o conteúdo existente. Onde o site atual informa, o novo site deve convidar à ação — agendar uma visita, voluntariar-se, percorrer o museu virtualmente e ouvir o acervo. Essa diferença de propósito deve orientar todas as decisões de layout: menos texto corrido na primeira dobra, mais hierarquia visual, chamadas de ação evidentes e caminhos curtos até o agendamento.

Um ponto de atenção importante para a banca: o site oficial **não possui tour virtual em 360°**. Ele oferece mostras virtuais em formato de página e um tour em vídeo de uma das salas, mas não uma navegação imersiva pelos ambientes. O Tour Virtual previsto neste escopo é, portanto, um diferencial do projeto e deve ser apresentado como tal, e não como uma reformulação de algo já existente.

A identidade visual deve dialogar com a do site atual, preservando o reconhecimento da marca, mas com acabamento contemporâneo. As cores e tipografias de referência estão detalhadas na seção 10.

---

## 3. Objetivos

O site deve cumprir quatro objetivos centrais. O primeiro é **atrair mais visitantes**, comunicando de forma clara e visualmente atrativa o que o museu oferece, com destaque para a gratuidade e para a importância histórica do casarão de 1890. O segundo é **facilitar o agendamento de visitas**, tornando o caminho até o formulário curto e evidente em qualquer ponto da navegação, com atenção especial ao público escolar e universitário, que já conta com horários especiais. O terceiro é **abrir canal para o voluntariado**, dando visibilidade a essa possibilidade na página inicial e explicando de forma concreta como participar. O quarto é **democratizar o acesso ao acervo**, oferecendo um tour virtual que permita conhecer os ambientes do museu antes mesmo da visita presencial.

---

## 4. Público-alvo

O site atende quatro públicos com necessidades distintas. O **visitante espontâneo**, morador de Itu e região, que quer saber horário, endereço e o que vai encontrar. O **público escolar e universitário**, representado por professores e coordenadores que precisam agendar visitas em grupo e conhecer previamente o espaço. O **turista e pesquisador**, que chega por busca e precisa de contexto histórico e de acervo. E o **potencial voluntário ou parceiro**, que busca uma forma de se envolver com a instituição.

---

## 5. Escopo desta entrega

Estão dentro do escopo a construção da Home completa e responsiva, a construção da tela de Tour Virtual, o menu de navegação compartilhado entre as duas telas, o rodapé compartilhado, o CSS customizado sobre o Bootstrap, a adaptação para os breakpoints de celular, tablet e desktop e a preparação do site estático para publicação em um repositório GitHub com GitHub Pages.

Estão fora do escopo a implementação das telas internas de Exposições, Música, Seja Voluntário, Agendar Visita e Parcerias, a criação de back-end, banco de dados, autenticação, painel administrativo, sistema real de reservas e integração com meios de pagamento. Os links do menu que apontam para essas telas devem existir e funcionar como navegação, ainda que os destinos sejam páginas provisórias ou âncoras. A publicação não deve depender de servidor próprio, processo de build ou segredo armazenado no repositório.

---

## 6. Arquitetura de informação e menu de navegação

O menu é único e compartilhado pelas duas telas, garantindo consistência e permitindo que o usuário circule pelo site sem perder o contexto. A estrutura segue os itens definidos no esboço do projeto: **Home**, **Tour Virtual**, **Exposições**, **Música**, **Seja Voluntário** e, destacado como botão de ação, **Agendar Visita**. O item **Parcerias e Redes Sociais** fica no rodapé, acompanhado dos ícones das redes sociais, para não sobrecarregar a barra superior — com seis itens mais um botão, a navbar já fica no limite no mobile.

O item **Música** deve abrir um submenu com dois acessos, **Partitura** e **Play**, conforme o esboço. No desktop o submenu abre em dropdown ao passar o mouse ou ao focar com teclado; no mobile ele aparece como lista expansível dentro do menu colapsado.

O termo **Exposições** pode ser mantido por ser mais direto para o visitante, mas o conteúdo da página deve usar a nomenclatura oficial do museu, **Mostras de longa duração**, que é como as cinco salas expositivas são apresentadas institucionalmente.

O menu deve ser uma navbar do Bootstrap fixa no topo (`fixed-top` ou `sticky-top`), com fundo sólido ou levemente translúcido, logo à esquerda, links ao centro ou à direita e o botão de agendamento como último elemento. Em telas menores que o breakpoint `lg`, o menu colapsa em botão hambúrguer com navegação vertical. O item correspondente à tela atual deve receber estado ativo visível.

---

## 7. Tela 1 — Home

A Home é a tela principal e funciona como vitrine do museu, distribuindo as informações em blocos verticais bem separados, todos construídos dentro de containers do Bootstrap.

### 7.1 Barra de navegação

Navbar fixa no topo com o logotipo do museu, os links descritos na seção 6 e o botão "Agendar Visita" em cor de destaque. A navbar deve permanecer legível sobre a imagem do hero, com transição de fundo ao rolar a página, e colapsar em menu hambúrguer no mobile.

### 7.2 Hero (banner principal)

Seção de abertura em largura total, com imagem de fundo do casarão de 1890 ou de uma das salas expositivas, sobreposição escura para garantir contraste do texto e conteúdo centralizado ou alinhado à esquerda. Deve conter o nome **Museu da Música – Itu**, uma frase de chamada curta que sintetize a proposta da instituição — a difusão da música e da memória de Itu —, um parágrafo de apoio com no máximo três linhas mencionando a entrada franca e os dois botões principais: "Agendar Visita" e "Explorar o Tour Virtual". A altura deve ser de aproximadamente 85% da viewport no desktop, ajustada no mobile, sem cortar o conteúdo.

### 7.3 Faixa de informações rápidas

Imediatamente abaixo do hero, uma faixa horizontal com quatro blocos curtos contendo ícone e texto: **domingo, das 9h às 13h**; **Rua Floriano Peixoto, 480 — Itu/SP**; **Entrada franca**; e **museudamusica@itu.com.br**. No desktop os blocos ficam lado a lado; no mobile empilham-se. Essa faixa resolve a dúvida prática do visitante antes de qualquer rolagem longa e deve usar dados reais, não provisórios.

### 7.4 Sobre o museu

Bloco em duas colunas no desktop: à esquerda, imagem ou composição de imagens do casarão e do acervo; à direita, título de seção, dois ou três parágrafos sobre a história e a missão do museu e um link discreto "Conheça nossa história". O texto deve partir do conteúdo institucional real: a criação em 2007 pelo Instituto Cultural de Itu, a missão de pesquisa, preservação e comunicação dos referenciais musicais das diversas comunidades do Médio Tietê, e a casa de 1890 tombada pelo CONDEPHAAT. No mobile, a imagem vem primeiro e o texto abaixo.

### 7.5 Destaques e exposições

Seção com título, subtítulo curto e uma grade de três cards de mostra, cada um com imagem, categoria, título, uma linha de descrição e link "Saiba mais". O conteúdo deve refletir as cinco salas reais do museu, das quais três aparecem em destaque na Home e as demais ficam para a página interna: **Música Popular**, **Música Marcial, de Seresta e de Concerto**, **Música no Espaço Doméstico**, **Música Sacra Ituana** e **O Mestre de Música e o Copista**. A grade deve usar o grid do Bootstrap, com três colunas no desktop, duas no tablet e uma no celular. Ao final da seção, um botão "Ver todas as exposições" apontando para a página interna.

### 7.6 Chamada para o Tour Virtual

Bloco de destaque visual com imagem de prévia do tour, sobreposição e um botão "Iniciar Tour Virtual". O texto deve explicar em uma frase o benefício da experiência remota, como percorrer as salas do museu antes da visita presencial ou rever o que já foi visitado. Este bloco é a ponte entre a Home e a segunda tela deste escopo.

### 7.7 Música do museu

Seção dedicada ao acervo musical, com dois acessos em cards lado a lado no desktop e empilhados no mobile: **Partitura**, para consulta dos manuscritos e partituras digitalizadas, e **Play**, para ouvir as gravações históricas do acervo. O card de Play deve citar exemplos reais do repertório disponível, como "A louca" e "A noite de São João", de Elias Álvares Lobo, o "Hino de Itu", de Roberto Manzo e José Luís de Oliveira, e a "Ladainha a 4 vozes", do Pe. Jesuíno do Monte Carmelo. Cada card deve ter ícone, título, descrição curta e botão de acesso.

### 7.8 Agendamento de visita

Seção de conversão, com fundo em cor institucional, título chamativo, texto curto explicando como funciona o agendamento e um botão "Agendar minha visita". Deve incluir três passos numerados — escolher a data, preencher os dados, receber a confirmação — e uma menção destacada aos **horários especiais para escolas e universidades**, que é uma oferta real da instituição e um dos principais motores de agendamento.

### 7.9 Seja voluntário

Seção com apelo humano, imagem ou ilustração de pessoas e texto convidando o visitante a participar do programa de voluntariado, seguido do botão "Quero ser voluntário". O texto pode se apoiar no fato de que o próprio Instituto Cultural de Itu é formado por especialistas que atuam voluntariamente, o que dá credibilidade concreta ao convite. Deve ter peso visual menor que a seção de agendamento, mas presença clara na página.

### 7.10 Parceiros e redes sociais

Faixa com o logotipo do **Instituto Cultural de Itu** como mantenedor, acompanhado dos logotipos de parceiros institucionais em escala de cinza, que ganham cor ao passar o mouse, e uma área com ícones de redes sociais e chamada para seguir o museu. No mobile, os logotipos quebram em duas ou três linhas.

### 7.11 Rodapé

Rodapé em fundo escuro dividido em quatro colunas no desktop: identidade e descrição curta do museu, mapa do site, contato com endereço, horário e e-mail, e redes sociais. Deve incluir a linha de copyright, a menção ao Instituto Cultural de Itu como mantenedor e a referência ao Projeto Integrador 2. No mobile, as colunas empilham-se.

---

## 8. Tela 2 — Tour Virtual

A tela de Tour Virtual apresenta o museu em formato remoto e deve ser construída com a mesma navbar e o mesmo rodapé da Home, garantindo continuidade visual.

### 8.1 Cabeçalho da página

Faixa de abertura mais baixa que o hero da Home, com imagem de fundo de uma das salas expositivas, sobreposição escura, título "Tour Virtual", um parágrafo explicando que o visitante pode percorrer os ambientes do museu pelo navegador e instruções curtas de uso — arrastar para girar, clicar nas setas para avançar, usar a roda para aproximar.

### 8.2 Player do tour

Área central com o visualizador do tour incorporado. O player deve ocupar a largura do container, manter proporção 16:9 e ser carregado por `iframe` responsivo, com atributos de título, carregamento tardio e permissão de tela cheia. Deve haver um estado de carregamento visível e uma mensagem de fallback com link alternativo caso o navegador ou a conexão não suportem a incorporação.

### 8.3 Seletor de ambientes

Abaixo ou ao lado do player, uma lista de ambientes em cards ou botões com miniatura e nome. Os ambientes devem corresponder às cinco salas reais do museu — Música Popular; Música Marcial, de Seresta e de Concerto; Música no Espaço Doméstico; Música Sacra Ituana; O Mestre de Música e o Copista — acrescidos da fachada e do jardim, totalizando sete pontos de navegação. Ao clicar, o player carrega o ambiente correspondente e o item selecionado fica visualmente ativo. No desktop a lista pode ficar em coluna lateral; no mobile, em faixa horizontal com rolagem.

### 8.4 Descrição do ambiente atual

Painel com o nome do ambiente em exibição e um texto descritivo de três a cinco linhas, funcionando também como alternativa textual para acessibilidade e para leitores de tela. O conteúdo deve ser atualizado junto com a troca de ambiente e pode aproveitar os textos reais das mostras, como a menção aos cururus e às modas de viola na sala de Música Popular, aos três raros instrumentos de música sacra e ao órgão Cavaillé-Coll de 1883, ou à mesa de trabalho do copista Luigi Di Francesco.

### 8.5 Controles e recursos

Botões de tela cheia, ativar ou desativar som ambiente, reiniciar o percurso e abrir o tour em nova aba. Os controles devem ser acessíveis por teclado e ter rótulos claros.

### 8.6 Chamada para a visita presencial

Ao final da página, um bloco com o texto "Gostou do que viu? Visite o museu pessoalmente", o reforço de que a entrada é franca e o botão "Agendar Visita", fechando o ciclo entre a experiência remota e a conversão principal do site.

### 8.7 Observação técnica sobre o tour

O escopo prevê a tela pronta para receber o embed do tour. Como o museu ainda não dispõe de um tour 360° próprio, a implementação deve usar uma imagem estática de prévia com sobreposição e um botão que simule o início do percurso, mantendo o layout e a experiência completos. O endereço do embed deve ficar em uma única constante no JavaScript, facilitando a substituição posterior sem alteração de layout.

---

## 9. Conteúdo real disponível

Os dados abaixo foram levantados no site oficial e devem ser usados como conteúdo definitivo, sem marcação de provisório.

| Informação | Conteúdo |
|---|---|
| Nome | Museu da Música – Itu |
| Criação | 14 de dezembro de 2007 |
| Mantenedora | Instituto Cultural de Itu (1999) |
| Endereço | Rua Floriano Peixoto, 480 — Itu/SP |
| Funcionamento | Domingos, das 9h às 13h |
| Entrada | Franca |
| E-mail | museudamusica@itu.com.br |
| Site atual | museudamusicaitu.com.br |
| Edifício | Casa de 1890, tombada pelo CONDEPHAAT |
| Salas | Cinco mostras de longa duração |

O restante dos textos — descrições longas das mostras, biografias de compositores, conteúdo das redes sociais e logotipos de parceiros — deve ser extraído do site oficial ou fornecido pelo museu. Onde o conteúdo ainda não estiver disponível, usar textos provisórios marcados no código com o comentário `<!-- CONTEÚDO PROVISÓRIO -->`, de modo que a substituição posterior seja rápida e não exija alteração de layout. Nenhum texto do tipo "lorem ipsum" deve permanecer na versão final.

---

## 10. Identidade visual e design system

A paleta deve partir da identidade já usada pelo museu, preservando o reconhecimento da marca. A cor primária é o **verde-azulado #00A4BA**, presente nos elementos de destaque do site atual, com a variação mais clara **#02BDD5** para estados de hover e acentos. Os neutros escuros são **#222222** para títulos e **#414141** e **#727272** para textos secundários, sobre fundos claros em **#FFFFFF** e **#F0F0F0**. Um tom quente de apoio, como um areia ou terracota suave, pode ser usado com moderação para remeter ao casarão histórico e quebrar a frieza do azul.

As cores devem ser declaradas como variáveis CSS no `:root`, com nomes semânticos (`--cor-primaria`, `--cor-primaria-clara`, `--cor-texto`, `--cor-texto-suave`, `--cor-fundo`, `--cor-fundo-alt`), para permitir troca centralizada.

A tipografia de referência do site atual é **Roboto** para texto e **Roboto Condensed** para títulos. A recomendação é manter essa base pela coerência com a marca, elevando a hierarquia com pesos mais fortes nos títulos e maior respiro entre linhas no corpo. Se o grupo preferir mais personalidade, uma serifada pode ser usada apenas nos títulos das seções, mantendo a Roboto no restante. Os tamanhos devem ser definidos com `clamp()` para escalar suavemente entre telas, com no máximo cinco níveis na escala tipográfica.

Os componentes devem manter raio de borda consistente, sombras discretas, espaçamento vertical generoso entre seções — no mínimo 64px no desktop e 40px no mobile — e estados de hover e foco visíveis em todos os elementos interativos.

---

## 11. Requisitos técnicos

O desenvolvimento deve usar HTML5 semântico, com `header`, `nav`, `main`, `section`, `article`, `aside` e `footer` empregados corretamente. O Bootstrap 5 deve ser carregado por CDN, com o CSS antes do CSS customizado e o bundle JavaScript ao final do `body`.

Todo o layout deve ser construído com o sistema de grid e os containers do Bootstrap (`container`, `container-fluid`, `row`, `col-*`), usando as classes de breakpoint `sm`, `md`, `lg` e `xl`. Não é permitido posicionamento absoluto para estruturar o layout principal, nem larguras fixas em pixels para blocos de conteúdo.

O CSS customizado deve ficar em arquivo separado, organizado por blocos comentados, e conter apenas o que o Bootstrap não resolve: variáveis de marca, tipografia, ajustes de componentes, animações de entrada e estados personalizados. Não se deve reescrever componentes do Bootstrap do zero.

A responsividade é obrigatória e deve ser validada em pelo menos quatro larguras: 375px, 768px, 1024px e 1440px. Nenhuma seção pode apresentar rolagem horizontal, texto cortado ou sobreposição de elementos em qualquer uma dessas larguras.

As imagens devem ter atributo `alt` descritivo, `loading="lazy"` fora da primeira dobra e proporção definida para evitar deslocamento de layout. O JavaScript deve ser mínimo e restrito a comportamentos de interface, como navbar com mudança de fundo ao rolar, animações de entrada e troca de ambiente no tour.

---

## 12. Estrutura de arquivos

A entrega deve seguir a organização abaixo, com nomes em minúsculas e sem acentos. O prefixo `hero-` designa as imagens de banner de abertura de cada tela: `hero-home.jpg` é o banner da Home e `hero-tour.jpg` é o banner da tela de Tour Virtual.

```
museu-itu/
├── index.html
├── tour-virtual.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── img/
│   ├── hero-home.jpg
│   ├── hero-tour.jpg
│   ├── sobre-museu.jpg
│   ├── mostra-popular.jpg
│   ├── mostra-sacra.jpg
│   ├── mostra-domestico.jpg
│   ├── tour-preview.jpg
│   ├── ambiente-01.jpg
│   └── logo.svg
└── README.md
```

O conteúdo de `museu-itu/` deve ficar na raiz do repositório GitHub que será publicado, para que o GitHub Pages encontre `index.html` como página inicial. Os caminhos de páginas, estilos, scripts e imagens devem ser relativos, sem referências a caminhos locais da máquina de desenvolvimento. O `README.md` deve identificar o projeto, descrever a estrutura e explicar como visualizar o site localmente e publicá-lo pelo GitHub Pages.

---

## 13. Acessibilidade, desempenho e SEO

A implementação deve atender aos princípios básicos de acessibilidade: contraste mínimo de 4,5:1 para texto, navegação completa por teclado, foco visível, rótulos em todos os botões e links, hierarquia correta de títulos com um único `h1` por página e textos alternativos em todas as imagens. O submenu de Música deve ser operável por teclado, não apenas por mouse.

Para desempenho, as imagens devem ser comprimidas e servidas em formato moderno, as fontes devem usar `display=swap` e os scripts não essenciais devem ser carregados com `defer`.

Cada página deve ter `title` descritivo, `meta description`, `lang="pt-BR"`, `viewport` configurado e tags Open Graph básicas para compartilhamento em redes sociais.

---

## 14. Publicação no GitHub Pages

O projeto deve poder ser publicado como site estático pelo GitHub Pages, usando a branch principal do repositório e a pasta raiz como origem. A publicação deve ser configurável nas definições do repositório, sem necessidade de back-end, dependências de build ou credenciais no código.

O `README.md` deve orientar a pessoa responsável a:

1. Criar um repositório no GitHub e enviar para a raiz dele os arquivos e pastas descritos na seção 12.
2. Abrir **Settings > Pages** no repositório e selecionar a branch principal e a pasta `/ (root)` como origem da publicação.
3. Aguardar a publicação e acessar o endereço informado pelo GitHub Pages.
4. Fazer futuras atualizações enviando os arquivos alterados para a branch publicada.

Antes da publicação, deve ser possível abrir `index.html` localmente e navegar entre as páginas sem erros causados por caminhos absolutos. A documentação deve informar que alterações podem levar alguns minutos para aparecer no endereço publicado.

---

## 15. Critérios de aceite

A entrega será considerada concluída quando a Home e a tela de Tour Virtual estiverem implementadas e navegáveis entre si pelo menu, quando ambas as telas se mantiverem íntegras nas quatro larguras de teste, quando todos os links do menu apontarem para destinos válidos, quando o submenu de Música funcionar no desktop e no mobile, quando nenhuma seção apresentar rolagem horizontal ou sobreposição, quando os dados reais do museu — endereço, horário, entrada franca e e-mail — estiverem corretos, quando todos os elementos interativos tiverem estado de foco visível e quando o código estiver organizado conforme a estrutura de arquivos da seção 12.

Para a publicação, também é necessário que `index.html` esteja na raiz do repositório, que os caminhos para páginas e recursos funcionem em hospedagem estática, que o `README.md` contenha as instruções da seção 14 e que o site possa ser configurado no GitHub Pages usando a branch principal e a pasta raiz.

---

## 16. Prompt para uso no VS Code

O bloco abaixo pode ser copiado diretamente para a IA do VS Code junto com este documento.

> Desenvolva as duas telas descritas neste documento de escopo: a Home (`index.html`) e o Tour Virtual (`tour-virtual.html`) do site do Museu da Música – Itu. Use HTML5 semântico, Bootstrap 5 via CDN e um arquivo `css/style.css` com variáveis de marca no `:root`, usando o verde-azulado #00A4BA como cor primária, #02BDD5 como variação clara e os neutros #222222, #414141 e #727272, com as fontes Roboto e Roboto Condensed. Construa todo o layout com containers, rows e colunas do Bootstrap, sem larguras fixas nem posicionamento absoluto na estrutura. Implemente o menu de navegação compartilhado e o rodapé nas duas telas, com navbar fixa que colapsa em hambúrguer no mobile e submenu de Música com os itens Partitura e Play. Siga a especificação seção por seção da Home e do Tour Virtual, incluindo o player responsivo em 16:9 com fallback, o seletor de ambientes com as cinco salas do museu e o painel de descrição do ambiente. Use os dados reais do museu: Rua Floriano Peixoto, 480, Itu/SP, aberto aos domingos das 9h às 13h, entrada franca, contato museudamusica@itu.com.br. Garanta responsividade validada em 375px, 768px, 1024px e 1440px, acessibilidade com contraste, foco visível, alt em imagens e hierarquia de títulos, e organização de arquivos conforme a seção 12. Prepare o projeto para publicação estática no GitHub Pages, mantendo `index.html` na raiz do repositório e usando caminhos relativos para páginas e recursos. Inclua no `README.md` as instruções para enviar os arquivos ao GitHub, habilitar o Pages pela branch principal e pasta raiz e acessar o endereço publicado. Não inclua back-end, processo de build ou credenciais no repositório. Use imagens provisórias com proporção definida e marque com comentário apenas o texto que ainda não foi fornecido. Ao final, liste os arquivos criados e os pontos que dependem de conteúdo real do museu.
